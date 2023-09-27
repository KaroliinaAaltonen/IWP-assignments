const dataTable = document.getElementById("table");
const tbody = document.getElementById("tableBody")

async function getData(){

    const url = "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
    const url2 = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065"; 
    try{
        let responseArray = await Promise.all([
            fetch(url).then((response)=>response.json()),
            fetch(url2).then((response)=>response.json())
        ]);
    
    jsonbody = responseArray[0];
    jsonbody2 = responseArray[1];
    const municipality = jsonbody.dataset.dimension.Alue.category.index;
    const population = jsonbody.dataset.value;
    var employment = jsonbody2.dataset.value
    
    console.log(employment)
    let PopMap = {};
    let i = 0;
    for(let x in municipality){
        i+=1;
        let index = municipality[x];
        let municipalityName = jsonbody.dataset.dimension.Alue.category.label[x];
        let populationNro = population[index];
        let employmentNro = employment[index]
        let employmentPro = Math.round(employmentNro/populationNro*100)

        PopMap[municipalityName] = {population: populationNro};

        let tr = document.createElement("tr");
        if(i%2==0){
            //create table row tr
            tr.setAttribute("id","even");
        }
        else if(i%2!=0){
            //create table row tr
            tr.setAttribute("id","uneven");
        }

        if (employmentPro>=45){
            tr.setAttribute("id","high-employment");
        }
        else if(employmentPro<=25){
            tr.setAttribute("id", "low-employment");
        }
        
        //create two table data cells td1, td2
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");

        td1.innerText = municipalityName;
        td2.innerText = populationNro;
        td3.innerText = employmentNro;
        td4.innerText = employmentPro;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        tableBody.appendChild(tr);
        dataTable.appendChild(tableBody);

    }
}
catch (error){
    console.log(error);
}
        
    
}
