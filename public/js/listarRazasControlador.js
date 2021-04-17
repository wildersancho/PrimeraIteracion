'use strict';

const tabla = document.querySelector("#tbl-razas tbody");

const mostrar_razas = async() => {
    let lista_razas = await obtener_razas();
    tabla.innerHTML = ''; //Limpia el TBody
    tabla.innerHTML = '<th>Código</th><th>Raza</th><th>tipoMascota</th><th>Eliminar</th>';
    lista_razas.forEach((raza) => {
        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = raza._id;
        fila.insertCell().innerHTML = raza.raza;
        fila.insertCell().innerHTML = raza.tipoMascota;
        let celda_eliminar = fila.insertCell();
        let boton_eliminar = document.createElement('button');
        boton_eliminar.type = 'button';
        boton_eliminar.classList.add("far")
        boton_eliminar.classList.add("fa-trash-alt")
        celda_eliminar.appendChild(boton_eliminar);
        celda_eliminar.addEventListener('click', async() => {
            eliminar_raza(raza._id)
        });
    });
};

mostrar_razas();