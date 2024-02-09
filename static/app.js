var plantilla = document.querySelector("template");
var tabla = document.querySelector("tbody");
var editButton = document.querySelector("button#edit");

var bbdd = window.localStorage;

// por defecto, no permito editar los campos
var editable = false;

// Almacena todos los alumnos y debe contener la misma información que la tabla
var alumnos = [];

// Crea un alumno desde el formulario
function getAlumno(){
  return {
    nombre : document.querySelector("input#nombre").value,
    alumno : document.querySelector("input#alumno").value,
    contraseña : document.querySelector("input#contraseña").value
  }
}

// Añade un alumno a la tabla
function addRow(alumno,pos){

  // pos es el indice del elemento dentro del array. Es necesario para borrar elementos.

  let nuevaFila = plantilla.content.cloneNode(true);
  nuevaFila.querySelector(".nombre").textContent = alumno.nombre;
  nuevaFila.querySelector(".alumno").textContent = alumno.alumno;
  nuevaFila.querySelector(".contraseña").textContent = alumno.contraseña;

  nuevaFila.querySelector("button").addEventListener("click",(ev)=>{
    ev.preventDefault();
    deleteRow(pos);
  });

  if(!editable) nuevaFila.querySelector("button").classList.add("d-none");

  tabla.appendChild(nuevaFila);
}

// Borra un alumno de la tabla, del array global y del localStorage
function deleteRow(pos){
    console.log("borrando "+pos);
    alumnos.splice(pos,1);
    saveData();
    refreshTable();
}

// Guarda alumnos en el localStorage
function saveData(){
  console.log(alumnos);
  bbdd.setItem("alumnos", JSON.stringify(alumnos));
}

// Carga alumnos desde el localStorage y los añade a la tabla. Si no existe carga un array vacio.
function loadData(){
  alumnos = JSON.parse( bbdd.getItem("alumnos")??"[]" );
  console.log(alumnos);
}

// Vuelca el contenido de alumnos en la tabla
function refreshTable(){
    tabla.innerHTML="";
    alumnos.forEach( addRow );
}

// Crea un nuevo alumno y lo guarda en el array, en la tabla y en el localStorage.
document.querySelector("form").addEventListener("submit",
  (ev)=>{
    ev.preventDefault();
    let alumno = getAlumno();
    alumnos.push(alumno);
    saveData();
    refreshTable();
  }
)

// muestra u oculta los botones de edición
function toggleEditButtons(show){
    document.querySelectorAll("button.borrar").forEach( (el)=>{
        if(show) el.classList.remove("d-none");
        else el.classList.add("d-none");
    });
}




// Inicio
console.log("Cargando datos...");
loadData();
console.log(alumnos);
refreshTable();

editButton.addEventListener("click",(ev)=>{

    if(editable){
        editButton.textContent = "editar";
    }else{
        editButton.textContent = "bloquear";
    }

    editable = !editable;

    toggleEditButtons(editable);

});
