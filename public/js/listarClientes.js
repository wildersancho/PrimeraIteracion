'use strict';

const tabla = document.querySelector("#tbl-comentarios tbody");

const mostrar_clientes = async() => {
    let lista_clientes = await obtener_clientes();
    console.log(lista_clientes);
    tabla.innerHTML = ''; //Limpia el TBody
    lista_clientes.forEach((cliente) => {
        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = cliente.nombreUsuario;
        fila.insertCell().innerHTML = cliente.email;
        fila.insertCell().innerHTML = cliente.identificacionCliente;
        fila.insertCell().innerHTML = cliente.cantidadMascotas;
    });
};

mostrar_clientes();