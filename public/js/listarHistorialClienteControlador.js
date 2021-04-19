'use strict';

const tabla = document.querySelector("#tbl-histCliente tbody");
let userName = "wsanchor";
window.localStorage.setItem('user', userName);
const usuario = window.localStorage.getItem('user');

const mostrar_servicios = async() => {
    let usuario = window.localStorage.getItem('user');
    console.log(usuario);
    let lista_servicios = await obtener_servicios(usuario);
    tabla.innerHTML = ''; //Limpia el TBody
    tabla.innerHTML = '<th>NombreServicio</th><th>FechaServicio</th><th>Proveedor</th><th>MascotasAtendidas</th><th>Status</th><th>Eliminar</th>';
    lista_servicios.forEach((servicio) => {
        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = servicio.servicio;
        fila.insertCell().innerHTML = servicio.fecha;
        fila.insertCell().innerHTML = servicio.nombreProveedor;
        fila.insertCell().innerHTML = servicio.nombreMascota;
        fila.insertCell().innerHTML = servicio.status;
        let celda_eliminar = fila.insertCell();
        let boton_eliminar = document.createElement('button');
        boton_eliminar.type = 'button';
        boton_eliminar.classList.add("far")
        boton_eliminar.classList.add("fa-trash-alt")
        celda_eliminar.appendChild(boton_eliminar);
        celda_eliminar.addEventListener('click', async() => {
            eliminar_servicio(servicio._id)
        });
    });
};

mostrar_servicios();