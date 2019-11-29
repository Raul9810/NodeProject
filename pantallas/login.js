window.onload = init;

function init() {
    document.querySelector('#go').addEventListener('click', login);
}

function login(){
    var mail = document.getElementById("input-mail").value;
    var pass = document.getElementById("input-password").value;
    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
          mail: mail,
          pass: pass
        }
      }).then(res =>{
          console.log(res.data)
        if(res.data.code == 0){
            console.log(res.data.message)
            localStorage.setItem("token", res.data.message)
            window.location.href = "main.html";
        }else alert("Datos incorrectos")
      }).catch(err =>{
          console.log(err)
      });
}
