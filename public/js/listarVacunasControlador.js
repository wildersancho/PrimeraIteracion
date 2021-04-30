'use strict';

const tabla = document.querySelector("#tbl-vacunas tbody");

const mostrar_vacunas = async() => {
    let lista_vacunas = await obtener_vacunas();
    tabla.innerHTML = ''; //Limpia el TBody
    tabla.innerHTML = '<th>Código</th><th>vacuna</th><th>tipoMascota</th><th>Eliminar</th>';
    lista_vacunas.forEach((vacuna) => {
        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = vacuna._id;
        fila.insertCell().innerHTML = vacuna.vacuna;
        fila.insertCell().innerHTML = vacuna.tipoMascota;
        let celda_eliminar = fila.insertCell();
        let boton_eliminar = document.createElement('button');
        boton_eliminar.type = 'button';
        boton_eliminar.classList.add("far")
        boton_eliminar.classList.add("fa-trash-alt")
        celda_eliminar.appendChild(boton_eliminar);
        celda_eliminar.addEventListener('click', async() => {
            eliminar_vacuna(vacuna._id)
        });
    });
};

mostrar_vacunas();