/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    let campoTexto = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    if( texto == ''){
        return false;
    }
    if (!campoTexto.test(texto)) {
        return false;
    }
    return true;
}

function normalizarTexto(texto) {
    return texto.trim();
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    let campoEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if( email == ''){
        return false;
    }
    if (!campoEmail.test(email)) {
        return false;
    }
    return true;
}

function normalizarEmail(email) {
    return email.trim();
}


/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    let password= /^.{4,12}$/;

    if( password == ''){
        return false;
    }
    if (!password.test(contrasenia)) {
        return false;
    }
    return true;
}

function compararContrasenias(contrasenia_1, contrasenia_2){
    return contrasenia_1 === contrasenia_2 ? true : false;
}



