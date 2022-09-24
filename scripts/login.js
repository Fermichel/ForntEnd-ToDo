// Evaluamos si ya hay un jwt que ya se registre automaticamente
// const jwt=localStorage.getItem('jwt');

// if(jwt){
//     location.replace('mis-tareas.html');
// }


window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    //console.log("ok empezamos");
    const form = document.querySelector('form');
    const inputEmail= document.querySelector('#inputEmail');
    const inputPassword= document.querySelector('#inputPassword');

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        //console.log('preparados para la accion');
        const datosUsuario = {
            email: inputEmail.value,
            password: inputPassword.value
        }
        //console.log(datosUsuario);
        realizarLogin(datosUsuario)
    });

    
    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(datosUsuario) {
        const url='https://ctd-todo-api.herokuapp.com/v1/users/login';
        const config={
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        }

        fetch(url,config).then( (res => res.json()) )
        .then((data)=>{
            console.log(data);
            if(data.jwt){ //guadamos el token
                localStorage.setItem('jwt',data.jwt);
                location.replace('mis-tareas.html');
            }
        }).catch((res)=>{
            console.error(res);
        })


    }
});