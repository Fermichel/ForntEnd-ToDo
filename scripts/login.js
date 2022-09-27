// Evaluamos si ya hay un jwt que ya se registre automaticamente
// const jwt=localStorage.getItem('jwt');

// if(jwt){
//     location.replace('mis-tareas.html');
// }

window.addEventListener("load", function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    //console.log("ok empezamos");
    // const form = document.querySelector('form');
    const form = document.forms[0]; // A mi siempre me convino ver los datos como un array de esta manera
    const inputEmail = document.querySelector("#inputEmail");
    const inputPassword = document.querySelector("#inputPassword");
    const url="https://ctd-fe2-todo-v2.herokuapp.com/v1";
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      //console.log('preparados para la accion');
      const datosUsuario = {
        email: inputEmail.value,
        password: inputPassword.value,
      };
      //console.log(datosUsuario);
      realizarLogin(datosUsuario);
    });
  
    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(datosUsuario) { 
      const config = {
        method: "POST",
        body: JSON.stringify(datosUsuario),
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      fetch(`${url}/users/login`,config) //
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.jwt) {
            //guadamos el token
            localStorage.setItem("jwt", JSON.stringify(data.jwt));
            location.replace("mis-tareas.html");
          }
        })
        .catch((res) => {
          console.error(res);
        });
    }
  });