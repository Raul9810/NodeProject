window.onload = init;

function init() {
    document.querySelector('.btn-secondary').addEventListener('click', function() {
        window.location.href = "login.html";
    });
    document.querySelector('.btn-primary').addEventListener('click', signin);
}

function signin(){
    var mail = document.getElementById("input-mail").value;
    var name = document.getElementById("input-name").value;
    var pass = document.getElementById("input-password").value;

    // Send a POST request
    axios({
        method: 'post',
        url: 'http://localhost:3000/user',
        data: {
            name: name,
            pass: pass,
            mail: mail
        }
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}
