//Implementar el modo estricto en todos los JS
'use strict';

//Referencia de los campos HTMLs. (Elementos como tal, no su valor)
const comentarios = document.querySelector('#txtComentarios');
const boton_enviar = document.querySelector('#btn-enviar');

//TABLA dinamica ~ Variables
var addComentarios = new Array();
var tabla_reservas = document.querySelector('#tbl-reservaciones tbody');

const obtenerDatos = () => {
    console.log(`Nuevo Comentario: ${comentarios.value}`);
    //Agregar elemento al arreglo:
    let nuevo_item = [comentarios.value];
    addComentarios.push(nuevo_item);
    //Llenar la tabla con los nevos valores
    llenar_tabla();
    eraseText();
};


//TABLA dinamica
const llenar_tabla = () => {
    let reservas = addComentarios;
    tabla_reservas.innerHTML = ''; //Esto permite borrar el contenido del body de la tabla.
    for (let i = 0; i < addComentarios.length; i++) {
        let fila = tabla_reservas.insertRow(); //Inserta una nueva fila en la tabla
        fila.insertCell().innerHTML = addComentarios[i][0]; //Comentarios
    }
};

function eraseText() {
    document.getElementById("txtComentarios").value = "";
}

boton_enviar.addEventListener('click', obtenerDatos);