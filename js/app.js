const botonNuevo = document.getElementById('btnNuevo');
const botonBuscar = document.getElementById('btnBuscar');
const botonBuscarAccion = document.getElementById('btnBuscarAccion');
const botonLista = document.getElementById('btnLista');
const inputBuscar = document.getElementById('buscar');
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputNota1 = document.getElementById('nota1T');
const inputNota2 = document.getElementById('nota2T');
const inputNota3 = document.getElementById('nota3T');
const botonGuardar = document.getElementById('btnGuarda');
const botonCancelar = document.getElementById('btnCancela');
const formAlum = document.getElementById('formAlum');
const formBuscar = document.getElementById('formBuscar');
const contenedorAlumnos = document.getElementById('contenedorAlumnos');
const contenedorBuscar = document.getElementById('contenedorBuscar');
const tablaFilaAlumnos = document.getElementById('filasAlumnos');
const tabla = document.getElementById('contenedorTabla');
const listaAlumnos = [];

listaAlumnos.push(new Alumno('Mariano','Gomez',9,10,8)); 
listaAlumnos.push(new Alumno('Juan','Perez',5,9,7));
listaAlumnos.push(new Alumno('Natalia','Vezzoni',8,10,10));
listaAlumnos.push(new Alumno('Romina','Fernandez',7,5,3));
localStorage.setItem('listaAlumnos',JSON.stringify(listaAlumnos));
/* carga de informacion para probar */

botonNuevo.addEventListener('click', (evento) => { 
    contenedorAlumnos.classList.remove('d-none');
    contenedorBuscar.classList.add('d-none');
    tabla.classList.add('d-none');
}); /*para hacer interactivos los tres botones, como si fuera un menu */

botonBuscar.addEventListener('click', (evento) => {
    contenedorBuscar.classList.remove('d-none');
    contenedorAlumnos.classList.add('d-none');
    tabla.classList.add('d-none');
}); /*para hacer interactivos los tres botones, como si fuera un menu */

botonLista.addEventListener('click', (evento) => {
    tabla.classList.remove('d-none');
    contenedorBuscar.classList.add('d-none');
    contenedorAlumnos.classList.add('d-none');
    actulizarTabla(listaAlumnos);
}); /*para hacer interactivos los tres botones, como si fuera un menu */

botonGuardar.addEventListener('click', (evento) => {
    evento.preventDefault();
    if(validarAlumno()){
        guardarAlumno();
        formAlum.reset();
        alert('Alumno Guardado');
    } else {
        alert('Por favor registra datos correctos')
    }
}); /*evento del boton guardar dentro de nuevo alumno*/

botonCancelar.addEventListener('click', (evento) => {
    evento.preventDefault();
    formAlum.reset();
}); /* resetea el formulario */

function validarAlumno(){ //valido los datos del formulario que no sean vacios y que las notas esten en el rango de 0 a 10
    return inputNombre.value !== '' && inputApellido.value !== '' && inputNota1.value !== '' && inputNota2.value !== '' && inputNota3.value !== '' && (+inputNota1.value >= 0 && +inputNota1.value < 11) && (+inputNota2.value >= 0 && +inputNota2.value < 11) && (+inputNota3.value >= 0 && +inputNota3.value < 11);
} 

function guardarAlumno(){ /* creo un nuevo elemento alumno con los datos de los imputs */
    const nuevoAlumno = new Alumno(
        inputNombre.value,
        inputApellido.value,
        +inputNota1.value,
        +inputNota2.value,
        +inputNota3.value
    );
    listaAlumnos.push(nuevoAlumno);
    cargarEnTabla(nuevoAlumno);
}

function cargarEnTabla(nuevoAlumno){ /* agregar la nueva fila en la tabla con el alumno creado */
    const row = document.createElement('tr');
    let td = document.createElement('td');
    const posFila = listaAlumnos.indexOf(nuevoAlumno);
    td.classList.add('font-white');
    td.textContent = nuevoAlumno.nombre;
    row.appendChild(td);

    td = document.createElement('td');
    td.classList.add('font-white');
    td.textContent = nuevoAlumno.apellido;
    row.appendChild(td);

    td = document.createElement('td');
    td.classList.add('font-white');
    td.textContent = nuevoAlumno.nota1;
    row.appendChild(td);

    td = document.createElement('td');
    td.classList.add('font-white');
    td.textContent = nuevoAlumno.nota2;
    row.appendChild(td);

    td = document.createElement('td');
    td.classList.add('font-white');
    td.textContent = nuevoAlumno.nota3;
    row.appendChild(td);

    td = document.createElement('td');
    td.classList.add('font-white');
    td.textContent = (nuevoAlumno.promedio).toFixed(1);
    row.appendChild(td);

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-secondary';
    btnEliminar.textContent = 'Eliminar'

    btnEliminar.onclick = () => {
        listaAlumnos.splice(posFila,1);
        actulizarTabla(listaAlumnos);
        localStorage.setItem('listaAlumnos',JSON.stringify(listaAlumnos));
    }

    td = document.createElement('td');
    td.appendChild(btnEliminar);
    row.appendChild(td);
    tablaFilaAlumnos.appendChild(row);
    localStorage.setItem('listaAlumnos',JSON.stringify(listaAlumnos));

}

function actulizarTabla(listaAlumnos){ /* acualiza la tabla y la carga nuevamente en caso de cambios */
    tablaFilaAlumnos.innerHTML = '';
    listaAlumnos.forEach((alumno) => {
        cargarEnTabla(alumno);
    });
}

botonBuscarAccion.addEventListener('click',(evento) => {
    evento.preventDefault();
    let resultado = buscarAlumno();
    if(resultado.length > 0){
        actulizarTabla(resultado);
        tabla.classList.remove('d-none'); /* para mostrar la tabla en caso de que la busqueda arroje resultados */
    } else {
        alert('No se encontraron resultados');
        actulizarTabla(listaAlumnos);
        tabla.classList.add('d-none'); /* en caso de una busqueda sin resultados oculta la tabla */
    }
    formBuscar.reset();
});

function buscarAlumno(){ /* busca coincidencias entre el nombre o el apellido del alumno */
    let busqueda = inputBuscar.value;
    const listaResultado = listaAlumnos.filter((alumno) => {return alumno.nombre.toLowerCase() == busqueda.toLowerCase() || alumno.apellido.toLowerCase() == busqueda.toLowerCase()});
    console.log(listaResultado);
    return listaResultado;
}