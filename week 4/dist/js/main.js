const root_div = document.getElementById("div-series");
const text_input_field = document.getElementById("input-show");
const input_form = document.getElementById("form");
const append_series_button = document.getElementById("submit-data");

append_series_button.addEventListener("click", createQuery);

function createQuery(){
    var name = text_input_field.value;
    var url = "https://api.tvmaze.com/search/shows?q=";
    url = url+name;
    appendSeries(url);
}

async function appendSeries(url){
    let promise = await fetch(url);
    let data = await promise.json();

    data.forEach((series)=>{
        const series_info = document.createElement("div");
        series_info.className = "show-data";

        const series_img = document.createElement("img");
        if (!series.show.image || !series.show.image.medium){
            return;
        }
        series_img.src = series.show.image.medium;
        const series_summary = document.createElement("div");
        series_summary.className ="show-info";
        const series_title = document.createElement("h1");
        series_title.innerText = series.show.name;
        const p = document.createElement("p");
        p.innerHTML = series.show.summary;

        series_summary.appendChild(series_title);
        series_summary.appendChild(p);
        series_info.appendChild(series_img);
        series_info.appendChild(series_summary);
        root_div.appendChild(series_info);
    })
}