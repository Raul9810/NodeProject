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

function changeData(){
    modalChange = document.getElementById("changeData");
    bg = document.getElementById("bg");

    bg.classList.toggle("ver-bg");
    modalChange.classList.toggle("ver-modal");
}

function deleteUser(){
    modal_user = document.getElementById("deleteUser");
    bg = document.getElementById("bg");

    bg.classList.toggle("ver-bg");
    modal_user.classList.toggle("ver-alert");
}