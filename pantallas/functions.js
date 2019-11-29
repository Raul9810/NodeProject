window.onload = init;
var userDeleted;
var n = ["name","last_name","phone_number","email","address"]

function init(){
    if(localStorage.getItem("token")){

    }else{
        window.location.href = "index.html"
    } 
    loadUsers();
}

$(document).ready(function(){
    $("#search").keyup(function(){
        _this = this;
            $.each($("#users #user"), function() {
                if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                    $(this).hide();
                else
                    $(this).show();
            });
        });
});

function openModal(){
    modal = document.getElementById("modals");
    bg = document.getElementById("bg");

    bg.classList.toggle("ver-bg");
    modal.classList.toggle("ver-modal");
}

function closeModal(){
    modal = document.getElementById("modals");
    bg = document.getElementById("bg");
    modal_user = document.getElementById("deleteUser");
    modalChange = document.getElementById("changeData");

    bg.classList.remove("ver-bg");
    modal.classList.remove("ver-modal");
    modal_user.classList.remove("ver-alert");
    modalChange.classList.remove("ver-modal");
}

function changeData(name){
    editUser(name)
    modalChange = document.getElementById("changeData");
    bg = document.getElementById("bg");

    bg.classList.toggle("ver-bg");
    modalChange.classList.toggle("ver-modal");
}

function deleteUser(name){
    userDeleted = name;
    modal_user = document.getElementById("deleteUser");
    bg = document.getElementById("bg");

    bg.classList.toggle("ver-bg");
    modal_user.classList.toggle("ver-alert");
}


function editUser(nombre){
    const  token = localStorage.getItem("token");
    axios.get("http://localhost:3000/employee/"+nombre,{
        headers: {
            'Authorization': "bearer " + token
        },
        }).then(res =>{
            $("#change").empty();
            var edit = document.querySelector("#change");
            var names = ["Nombre(s)","Apellidos","Telefono","Correo electronico","Dimicilio"];
            var data = [res.data[0].name,res.data[0].last_name,res.data[0].phone_number,res.data[0].email,res.data[0].address]
            edit.innerHTML += "<div class='flex-start col-xs-12'>\
            <h2 style='font-size: 1.2em;'>Modificar datos</h2>\
            </div><br>"
            for(var x = 0; x < 5; x++){
                edit.innerHTML += `<div class="flex-vertical col-xs-12">
                    <input type="text" placeholder="${names[x]}" value="${data[x]}" id = "${n[x]}" required>
                </div><br>`;
            }
            edit.innerHTML += `<button class='flex col-xs-6 add' onclick = "editData('${res.data[0].name}')">Modificar datos</button>`
        }).catch(err =>{
            console.log(err)
        })
}

function editData(id){
    var values = [];
    for(var y = 0; y < 5;y++){
        values[y] = $(`#${n[y]}`).val();
    }
    const  token = localStorage.getItem("token");
    axios.put("http://localhost:3000/employee/"+id,{
        headers: {
            'Authorization': "bearer " + token,
        },
        data: {
            "name": values[0],
            "last_name": values[1],
            "phone_number": values[2],
            "email": values[3],
            "address": values[4],
        },
        }).then(res =>{
            location.reload()
    }).catch(err =>{
        console.log(err)
    })
}

function createUser(){
    var values = [];
    for(var y = 0; y < 5;y++){
        values[y] = $(`.${n[y]}`).val();
    }
    const  token = localStorage.getItem("token");
    axios.post("http://localhost:3000/employee/",{
        headers: {
            'Authorization': "bearer " + token,
        },
        // name: values[0],
        // last_name: values[1],
        // phone_number: values[2],
        // email: values[3],
        // address: values[4],
        
        }).then(res =>{
            //location.reload()
    }).catch(err =>{
        console.log(err)
    })
}

function deleteData(){
    closeModal()
    const  token = localStorage.getItem("token");
    axios.delete("http://localhost:3000/employee/"+userDeleted,{
        headers: {
            'Authorization': "bearer " + token,
        },
        }).then(res =>{
            location.reload()
    }).catch(err =>{
        console.log(err)
    })
}

function loadUsers() {
    const  token = localStorage.getItem("token");
    axios.get("http://localhost:3000/employee/",{
        headers: {
            'Authorization': "bearer " + token,
        },     
        }).then(res =>{
            location.reload()
    }).catch(err =>{
        console.log(err)
    })
}


function displayUsers(employee) {
    $("#us").empty();
    var users = document.querySelector("#us");
    users.innerHTML += `<div class="code flex-around col-xs-12 col-sm-5 col-md-5">
                <p>Nombre</p>
                <p>Opciones de usuario</p></div>`
    for (var i = 0; i < employee.data.length; i++) {
        users.innerHTML += `<div class='user flex-between col-xs-12 col-sm-5 col-md-5' id='user'> \
            <div class='col-xs-6 flex-between'> \
                <p>${employee.data[i].name} ${employee.data[i].last_name}</p> \
            </div> \
            <div class='col-xs-6 flex-around'> \
                <p onclick="changeData('${employee.data[i].name}')"><i class='fas fa-pen-square' title='Editar usuario'></i></p> \
                <p onclick="deleteUser('${employee.data[i].name}')"><i class='fas fa-minus-square' title='Eliminar usuario'></i></p> \
            </div> \
        </div>`;
    }
}