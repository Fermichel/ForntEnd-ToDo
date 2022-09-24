// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

const jwt = localStorage.getItem('jwt');
if(!jwt){
  location.replace(index.html)
}
/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = document.querySelector('#closeApp'); 
  const formCrearTarea = document.querySelector('form.nueva-tarea');
  const nombreUsuario = document.querySelector('.user-info p');
  const contTareasPendientes = document.querySelector('.tareas-pendientes');
  const contTareasTerminadas = document.querySelector('.tareas-terminadas')
  const inputTarea = document.querySelector('#nuevaTarea');
  const cantfinalizadas = document.querySelector('#cantidad-finalizadas')

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
  console.log('este boton cierra la sesion');
  const confirmacion= confirm('Desea cerrar Sesion?');
  if(confirmacion){
    localStorage.removeItem('jwt');
    location.replace('index.html')
  }
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
  const url= 'https://ctd-todo-api.herokuapp.com/v1/users/getMe';
  const config = {
    method:'GET',
            headers:{
              authorization: jwt
            }
    }

  fetch(url,config).then (res=> res.json())
  .then((data)=>{
    console.log(data);
    nombreUsuario.textContent = data.firstName
  }).catch((res)=>{
    console.error('verificar el error: '+ res);
})
  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    const url='https://ctd-todo-api.herokuapp.com/v1/tasks';
    const config = {
      method:'GET',
              headers:{
              authorization: jwt
              }
      }
      fetch(url,config).then (res=> res.json())
      .then(data=>{
        console.log(data);
        //para que aparezca ordenado
        data = data.sort( function(a, b){return b.description < a.description})
        renderizarTareas(data);
        //data[0].completed = true;
      }).catch((res)=>{
        console.error('verificar el error: '+ res);
    })
  };



  /* -------------\v1\tasks------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
  event.preventDefault();
  
  //objeto que mandaremos al servidor
  const nuevaTarea ={
    description: inputTarea.value,
    completed: false
  }
  // configuracion de lo que pide el servidor
  const url ='https://ctd-todo-api.herokuapp.com/v1/tasks';
  const config={
    method:'POST',
    headers: {
      authorization: jwt,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevaTarea)
  } 
  if( nuevaTarea.description !==""){ //hacemos un condicional para que no pueda ingresar tareas vacias.
    fetch (url,config).then(res=>res.json())
  .then(data=>{
    console.log('tarea que se postea...');
    console.log(data);
    //cargamos la tarea en nuestra pagina
    consultarTareas();
  }).catch(error=>console.log(error))
  }else{
    alert('no puedes mandar tarea vacia')
  }
  formCrearTarea.reset();

  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  
  function renderizarTareas(listado) {

    contTareasPendientes.innerHTML = '';
    contTareasTerminadas.innerHTML = '';
    let contador = 0;

    listado.forEach(element=>{
      if(element.completed){
        contador++;
      const fecha = parsedDate(element.createdAt);
      const templateTerminada = `
      <li class="tarea" data-aos="fade-up">
        <div class="hecha">
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <div class="descripcion">
          <p class="nombre">${element.description}</p>
          <p class="timestamp" id="${element.createdAt}">Creada el: ${fecha}</p>
          <div class="cambios-estados">
          <button class="change incompleta" id="${element.id}" type="button"><i class="fa-solid fa-rotate-left"></i></button>
            <button class="borrar" id="${element.id}"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </div>
      </li>`;
      contTareasTerminadas.innerHTML += templateTerminada;
      }else{
        const fecha = parsedDate(element.createdAt);
        const templatePendiente = `
      <li class="tarea" data-aos="fade-down">
        <button class="change" id="${element.id}"><i class="fa-regular fa-circle"></i></button>
        <div class="descripcion">
          <p class="nombre">${element.description}</p>
          <p class="timestamp" id="${element.createdAt}">Creada el: ${fecha}</p>
          <button class="borrar" id="${element.id}" type="button"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      </li>`;
      contTareasPendientes.innerHTML += templatePendiente;
      }
    });

    cantfinalizadas.textContent = contador;

    const botonCambioestado = document.querySelectorAll('.change');
    const botonesBorrar = document.querySelectorAll('.borrar');

    botonCambioestado.forEach(boton => {
      boton.addEventListener('click', function(event){
        console.log(event.target);
        botonesCambioEstado(event.target)
      })
    });

    botonesBorrar.forEach(boton => {
      boton.addEventListener('click', function(event){
        botonBorrarTarea(event.target);
      })
    });

  };
/* -------------------------------------------------------------------------- */
/*                  Funcion de crear la fecha                                 */
/* -------------------------------------------------------------------------- */
  function parsedDate(f) {
    const date = new Date(f);
    let day = date.getDate()
    let month = parseInt(date.getMonth()) + 1;
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    return day + "/" + month + "/" + date.getFullYear();
}

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado(elemento) {
    console.log(elemento);
    console.log('esto es una prueba: '+elemento.classList.contains('completa'));
    
    let tarea = {
      completed: !elemento.classList.contains('completa') ? true : false
    }

    const url = `https://ctd-todo-api.herokuapp.com/v1/tasks/${elemento.id} `;
    const config = {
      method: 'PUT',
      headers: {
        authorization: jwt,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarea)
    }
    console.log(url, config);
    fetch(url, config).then(  response => response.json() )
    .then( data => {
      console.log(data);
      // Vuelve a recargar las tareas
      consultarTareas();
    })
  };


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea(element) {

  console.log(element);
  const url = `https://ctd-todo-api.herokuapp.com/v1/tasks/${element.id}`;
  const config=  {
    method: 'DELETE',
    headers: {
      authorization: jwt,
      'accept': 'application/json',
    }
  }
  const confirmacion= confirm('Desea borrar la tarea?');
  if(confirmacion){
    fetch(url, config).then (res=> res.json())
    .then( data => {
      console.log(data);
      console.log(element.id);  
    })
  }    
};
/* -------------------------------------------------------------------------- */
/*                          Llamamos a las funciones                          */
/* -------------------------------------------------------------------------- */
obtenerNombreUsuario();
consultarTareas();
});