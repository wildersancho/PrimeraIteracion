//Implementar el modo estricto en todos los JS
'use strict';
var fields = new Array();
var tabla_clientes = document.querySelector('#tbl-clientes tbody');
const boton_enviar = document.querySelector('#btnRegistrarCliente');

const llenar_tabla = () => {
    var keyValuePairs = document.cookie.split(';');
    for (var i = 0; i < keyValuePairs.length; i++) {
        var name = keyValuePairs[i].substring(0, keyValuePairs[i].indexOf('='));
        var value = keyValuePairs[i].substring(keyValuePairs[i].indexOf('=') + 1);
        var fields = value.split(',');
        let fila = tabla_clientes.insertRow();
        fila.insertCell().innerHTML = fields[0];
        fila.insertCell().innerHTML = fields[1];
        fila.insertCell().innerHTML = fields[2];
        fila.insertCell().innerHTML = fields[3];
        fila.insertCell().innerHTML = fields[4];
        fila.insertCell().innerHTML = fields[5];
        fila.insertCell().innerHTML = fields[6];
        fila.insertCell().innerHTML = fields[7];

    }
}

boton_enviar.addEventListener('click', llenar_tabla);