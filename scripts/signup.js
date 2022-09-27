window.addEventListener("load", function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    // const form = document.querySelector('form');
    const form = document.forms[0]; // A mi siempre me convino ver los datos como un array de esta manera
    const inputNombre = document.querySelector("#inputNombre");
    const inputApellido = document.querySelector("#inputApellido");
    const inputEmail = document.querySelector("#inputEmail");
    const inputPassword = document.querySelector("#inputPassword");
    const inputPassword2 = document.querySelector("#inputPasswordRepetida");
    const url="https://ctd-fe2-todo-v2.herokuapp.com/v1"; 
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let nombre = normalizarTexto(inputNombre.value);
      let apellido = normalizarTexto(inputApellido.value );
      let email = normalizarEmail(inputEmail.value);
      let password = validarContrasenia(inputPassword.value);
      let password2 = validarContrasenia(inputPassword2.value)

      if (!validarTexto(nombre) || !validarTexto(apellido)){
        Swal.fire("Nombre y Apellido incompleto")
        console.log('nombre o apellido esta en blanco');
      }

      if(!validarEmail(email)){
          Swal.fire("email ya esta registrado")
          console.log('mail esta mal ingresado');// aca me sale que esta registrado y no lo tenemos cargado
      }

      if(!compararContrasenias(password, password2) ){
        console.log('contraseñas invalidas');
        Swal.fire({
          icon: false,
          title: 'Contraseña',
          text: '-Entre 4 a 12 digitos y deben ser iguales',
          background:'#262B33',
          color:'white',
        })
      }

      const datos = {
          firstName: nombre,
          lastName: apellido,
          email: email,
          password: password
      }

      if(datos.firstName && datos.lastName && datos.email && datos.password){ //si todo los datos son true que ingrese a mis tareas
        realizarRegister(datos);
      }else{
        Swal.fire("verificar datos ingresados")
      }
      console.log(datos);
      form.reset();
    });
  
    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(datosRegistro) {
      const confing = {
        method: "POST",
        body: JSON.stringify(datosRegistro),
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      fetch(`${url}/users`, confing)
        .then((res) => {
          console.log("response: ", res);
  
          //res.ok != true && Swal.fire("prueba de Cristian"); // esto valida si los datos estan correctamente cargados
  
          return res.json();
        })
        .then((data) => {
          console.log("promesa: ", data);
          if (data.jwt) {
            //guadamos el token
            //   localStorage.setItem("jwt", data.jwt); // Error aqui, habia que parsearlo al data.jwt antes del envio!
            localStorage.setItem("jwt", JSON.stringify(data.jwt));
            // location.replace("index.html");
            location.replace("mis-tareas.html"); // redirecciono porque es mas intuitivo que te lleve a nuestra appToDo
          }
        })
        .catch((res) => {
          console.error("verificar el error: " + res);
        });
    }
  });