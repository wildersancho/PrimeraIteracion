//Implementar el modo estricto en todos los JS
'use strict';

//Referencia de los campos HTMLs. (Elementos como tal, no su valor)
const comentarios = document.querySelector('#comentarios-text');
const boton_enviar = document.querySelector('#comentarios-boton');

//TABLA dinamica ~ Variables
var addComentarios = new Array();
var tabla_reservas = document.querySelector('#tbl-comentarios tbody');


const obtenerDatos = () => {
    console.log(`Nuevo Comentario: ${comentarios.value}`);
    //Agregar elemento al arreglo:
    let nuevo_item = [comentarios.value];
    addComentarios.push(nuevo_item);
    //Llenar la tabla con los nevos valores
    llenar_tabla();
    eraseText();
};

const mostrarPerfilProv = async() => {
    let usuario = 'wsanchor'
    let cargarInfo = await mostrarPerfilP(usuario);
    console.log(cargarInfo);
    cargarInfo.forEach((infoUsers) => {

        document.getElementById('DatosGenerales').innerHTML = `<h3>Nombre</h3>
        <p>${infoUsers.usuario}</p>
        <h3>Correo</h3>
        <p>${infoUsers.correo}</p>
        <h3>Teléfono</h3>
        <p>12345678</p>
        <h3>Rating</h3>
        <p>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
        </p>`

        document.getElementById('info-personal').innerHTML = `<div>
    <h3>Ubicación</h3>
        <p id="Ubicacion">${infoUsers.provincia}</p>
    </div>
    <div>
        <h3>Encargado</h3>
        <p id="Encargado">${infoUsers.nombre}</p>
    </div>
    <div>
        <h3>Estado</h3>
        <p id="Estado">Habilitado</p>
    </div>`

        /* if (fotoPerfil.src != infoUsers.foto_perfil) {
             fotoPerfil.src = 'imgs/profile_default.jpg';
         }*/
    });

    let cargarInfo2 = await mostrarInfoP2(usuario);

}

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
    document.getElementById("comentarios-text").value = "";
}

boton_enviar.addEventListener('click', obtenerDatos);
mostrarPerfilProv();