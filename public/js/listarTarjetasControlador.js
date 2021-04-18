'use strict';

const tabla = document.querySelector("#tbl-tarjetas tbody");
let userName = "wsanchor";
window.localStorage.setItem('user', userName);
const usuario = window.localStorage.getItem('user');

const mostrar_tarjetas = async() => {
    let usuario = window.localStorage.getItem('user');
    console.log(usuario);
    let lista_tarjetas = await obtener_tarjetas(usuario);
    tabla.innerHTML = ''; //Limpia el TBody
    tabla.innerHTML = '<th>NúmeroTarjeta</th><th>FechaVencimiento</th><th>Proveedor</th><th>Propietario</th><th>Eliminar</th>';
    lista_tarjetas.forEach((tarjeta) => {
        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = tarjeta.tarjeta;
        fila.insertCell().innerHTML = tarjeta.fechaTarjeta;
        fila.insertCell().innerHTML = tarjeta.tipoTarjeta;
        fila.insertCell().innerHTML = tarjeta.nombreTarjeta;
        let celda_eliminar = fila.insertCell();
        let boton_eliminar = document.createElement('button');
        boton_eliminar.type = 'button';
        boton_eliminar.classList.add("far")
        boton_eliminar.classList.add("fa-trash-alt")
        celda_eliminar.appendChild(boton_eliminar);
        celda_eliminar.addEventListener('click', async() => {
            eliminar_tarjeta(tarjeta._id)
        });
    });
};

mostrar_tarjetas();