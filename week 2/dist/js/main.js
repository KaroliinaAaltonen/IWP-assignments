var i = 0
var table = document.getElementById("data-table");

function getdata(){
    var username = document.getElementById("input-username").value
    var email = document.getElementById("input-email").value
    var admin = document.getElementById("input-admin").checked
    var image = document.getElementById("input-image").getAttribute("src")
    validateform(username, email, admin, image);
}

function insertdata(username, email, admin, image){
        
        var row = table.insertRow(1);

        var cell0 = row.insertCell(0);
        cell0.innerHTML = username;
        var cell1 = row.insertCell(1);
        cell1.innerHTML = email;
        var cell2 = row.insertCell(2);
        if(admin==true){
            cell2.innerHTML = "x";
        }
        else{
            cell2.innerHTML = "-";
        }

        var cell3 = row.insertCell(3);
        cell3.innerHTML = '<img src="'+image+'" width=64; height=64 />';
        console.log(image);
        document.getElementById("input-form").reset();
        i+=1
}

function checkusername(username){
    for(let j=0;j<table.rows.length;j++){
        if(table.rows[j].cells[0] != null){
            if(table.rows[j].cells[0].innerHTML==username){
                return 1
            }
        }
    }
    return 0
}
function emptytable(){
    var j = i
    for(j;j>0;j--){
        table.deleteRow(j);
    }
    i=0
}

function validateform(username, email, admin, image){
    //check if username is already in table:
    if(checkusername(username)==1){
        alert("The username already exists");
        return false;
    }
    insertdata(username, email, admin, image);
    return true;
}