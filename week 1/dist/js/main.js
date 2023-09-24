const message = "Hello world"


function printstuff(){
    console.log(message)
    let h1 = document.querySelector("h1");
    h1.innerHTML = "Moi maailma!"
}

var i = 1;
var list = document.getElementById("my-list");
var add = document.getElementById("add-data");
var text = document.getElementById("text-field");

add.addEventListener("click", function(){
    var itemsByTagName = document.getElementsByTagName("li");
    list.innerHTML += "<li>"+text.value +"</li>"
});

