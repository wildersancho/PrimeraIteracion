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
    tabla.innerHTML = '<th>NombreServicio</th><th>FechaServicio</th><th>Proveedor</th><th>MascotasAtendidas</th><th>Status</th><th>Banneado</th><th>Eliminar</th><th>Bannear</th><th>Desbannear</th>';
    lista_servicios.forEach((servicio) => {
        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = servicio.servicio;
        fila.insertCell().innerHTML = servicio.fecha;
        fila.insertCell().innerHTML = servicio.nombreProveedor;
        fila.insertCell().innerHTML = servicio.nombreMascota;
        fila.insertCell().innerHTML = servicio.status;
        if (servicio.banned) {
            fila.insertCell().innerHTML = 'Sí';
        } else {
            fila.insertCell().innerHTML = 'No';
        }
        let celda_eliminar = fila.insertCell();
        let boton_eliminar = document.createElement('button');
        boton_eliminar.type = 'button';
        boton_eliminar.classList.add("far")
        boton_eliminar.classList.add("fa-trash-alt")
        celda_eliminar.appendChild(boton_eliminar);
        celda_eliminar.addEventListener('click', async() => {
            eliminar_servicio(servicio._id)
        });
        let celda_bannear = fila.insertCell();
        let boton_bannear = document.createElement('button');
        boton_bannear.type = 'button';
        boton_bannear.classList.add("fas")
        boton_bannear.classList.add("fa-ban")
        celda_bannear.appendChild(boton_bannear);
        celda_bannear.addEventListener('click', async() => {
            bannear_servicio(servicio._id);
        });
        let celda_desbannear = fila.insertCell();
        let boton_desbannear = document.createElement('button');
        boton_desbannear.type = 'button';
        boton_desbannear.classList.add("fas")
        boton_desbannear.classList.add("fa-check-circle")
        celda_desbannear.appendChild(boton_desbannear);
        celda_desbannear.addEventListener('click', async() => {
            desbannear_servicio(servicio._id);
        });
    });
};

mostrar_servicios();