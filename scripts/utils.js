const inputNombre = document.querySelector('#inputNombre');
const inputApellido = document.querySelector('#inputApellido');
const inputEmail = document.querySelector('#inputEmail');
const inputPassword = document.querySelector('#inputPassword');
const inputPassword2 = document.querySelector('#inputPasswordRepetida');
const form = document.querySelector('form');
/* ---------------------------------- texto --------------------------------- */
function validarTexto() {
    
    if(normalizarTexto(inputNombre.value) === " " || normalizarTexto(inputApellido.value)===" "){
        alert("debes completar los datos");
    }
}

function normalizarTexto(texto) {
    let palabra = input.value.trim();
    return palabra;
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    
}

function normalizarEmail(email) {
    
}


/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    if(contrasenia_1==contrasenia_2){
        password= inputPassword.value
    }else{
        alert("las contraseñas son incorrectas")
    }
}



