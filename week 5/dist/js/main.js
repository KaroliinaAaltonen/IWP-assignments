var posMigData=[]
var negMigData=[]
/* Fetch geoJSON data*/
const fetchData = async () => {
    const url = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
    const url1 = "https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f";
    const url2 = "https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e";

    let responseArray = await Promise.all([
        fetch(url).then((response)=>response.json()),
        fetch(url1).then((response)=>response.json()),
        fetch(url2).then((response)=>response.json())
    ])
    const data = responseArray[0]
    posMigData = responseArray[1]
    negMigData = responseArray[2]

    initMap(data, posMigData, negMigData)
};
/* use geoJSON data to create the map view*/
const initMap = (data) => {
    /* Initiating Leaflet map (L.map) that can be found with id "map" and setting the map view
    to coordinates [] with zoom level 14 */
    /*let map = L.map("map").setView([61.05, 28.1], 14)*/

    /* In this case we don't need to set the view*/
    /*1. create map*/
    let map = L.map("map", {
        minZoom: -3
    })

    /* 2. get the data*/
    let geojson = L.geoJSON(data,{
        onEachFeature: getFeature,
        style: getStyle

        /* 3. add the data to map*/
    },).addTo(map);

    /* 4. build tile layer */
    let openstreetmap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "© OpenStreetMap"
    }).addTo(map);

    /* 5. make the data visible */
    map.fitBounds(geojson.getBounds());
}

const getFeature = (feature, layer) => {
    let namn = feature.properties.namn
    let tag = feature.properties.kunta
    let posMig = getPosMig(tag)
    let negMig = getNegMig(tag)
    if (!namn) return;
    let mapID=namn
    
    layer.bindPopup(
        `<p>${mapID}</p>
        <p>Positive Migration: ${posMig}</p>
        <p>Negative Migration: ${negMig}</p>`)

    layer.bindTooltip(mapID)


}

const getStyle = (feature)=>{
    let tag = feature.properties.kunta
    let posMig = getPosMig(tag)
    let negMig = getNegMig(tag)
    let hue = (posMig/negMig)*60
    return{
        color: `hsl(${hue}, 75%, 50%)`
    }

}

const getPosMig = (tag)=>{
    
    let index = posMigData.dataset.dimension.Tuloalue.category.index["KU"+tag]

    let posMig = posMigData.dataset.value[index]
    if(posMig!=null){return posMig}
    
}

const getNegMig = (tag)=>{
    let index = negMigData.dataset.dimension.Lähtöalue.category.index["KU"+tag]
    let negMig = negMigData.dataset.value[index]
    if(negMig!=null){return negMig}
}

fetchData();
