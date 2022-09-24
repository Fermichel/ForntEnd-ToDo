window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.querySelector('form');
    const inputNombre = document.querySelector('#inputNombre');
    const inputApellido = document.querySelector('#inputApellido');
    const inputEmail = document.querySelector('#inputEmail');
    const inputPassword = document.querySelector('#inputPassword');
    const inputPassword2 = document.querySelector('#inputPasswordRepetida');

    

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('Vamos a preparar datos del registro');
        //validar que los password sean correctos
        
        const datosRegistro = {
            firstName: inputNombre.value,
            lastName: inputApellido.value,
            email: inputEmail.value,
            password: inputPassword.value
        }
        console.log(datosRegistro);
        realizarRegister(datosRegistro);

        form.reset();//para limpiar el formulario
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(datosRegistro) {
        const url = 'https://ctd-todo-api.herokuapp.com/v1/users'
        const confing = {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosRegistro)
        }
        
        fetch (url, confing).then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            if(data.jwt){ //guadamos el token
                localStorage.setItem('jwt',data.jwt);
                location.replace('index.html');
            }
        }).catch((res)=>{
            console.error('verificar el error: '+ res);
        });
    };


});