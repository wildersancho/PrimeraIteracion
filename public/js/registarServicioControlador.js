'use strict';
//Datos de section de cliente
let inputnombreUsuario = document.querySelector('#txtNombreUsuario');
let inputfechaCliente = document.querySelector('#FechaServicio');
let input_tel = document.querySelector('#TelContacto');
let inputProvincia = document.querySelector('#id-provincia');
let inputCanton = document.querySelector('#id-canton');
let inputDistrito = document.querySelector('#id-distrito');
let inputMascota = document.querySelector('#id-mascota');
let inputObservaciones = document.querySelector('#observaciones');

let inputTipoServicio = document.querySelector('#id-tipoServicio');
let accion = 'Registrar';
let fecha = new Date().toLocaleString();
let botonRegistrarCliente = document.querySelector('#btnRegistrarServicio');



async function obtenerDatosServicio() {
    // let error = false;
    let mascotas = inputMascota.value;
    let observaciones = inputObservaciones.value;
    let nombreUsuario = inputnombreUsuario.value;
    let telefono = input_tel.value;
    let provincia = inputProvincia.value;
    let canton = inputCanton.value;
    let distrito = inputDistrito.value;
    let tipoServicio = inputTipoServicio.value;
    let fechaSinFormato = new Date(inputfechaCliente.value);
    let fechaClienteSplit = inputfechaCliente.value.split("-");
    let fechaServicio = fechaClienteSplit[2] + '/' + fechaClienteSplit[1] + '/' + fechaClienteSplit[0];

    // error = validarCliente(nombreUsuario, tel, Provincia, Canton, Distrito, fechaSinFormato, tipoServicio);



    registrar_solicitud_servicio(tipoServicio, fechaServicio, nombreUsuario, provincia, canton, distrito, mascotas, telefono, observaciones)
};






function validarCliente() {
    let error = false;
    let expTel = /^[0-9]{8}$/;
    console.log("validando");

    let campos_requeridos = document.querySelectorAll(':required');
    campos_requeridos.forEach(campo => {
        //validar vacio
        if (campo.value == '') {
            error = true;
            campo.classList.add('error-input');
        } else {
            campo.classList.remove('error-input');
        }
    });

    if (expTel.test(input_tel.value) == false) {
        error = true;
        input_tel.classList.add('errorInput');
    } else {
        input_tel.classList.remove('errorInput');
    }

    if (inputProvincia.value == 'Provincia') {
        error = true;
        inputProvincia.classList.add('errorInput');
    } else {
        inputProvincia.classList.remove('errorInput');
    }
    if (inputCanton.value == 'Cantón') {
        error = true;
        inputCanton.classList.add('errorInput');
    } else {
        inputCanton.classList.remove('errorInput');
    }
    if (inputDistrito.value == 'Distrito') {
        error = true;
        inputDistrito.classList.add('errorInput');
    } else {
        inputDistrito.classList.remove('errorInput');
    }

    if (error == false) {
        obtenerDatosServicio();
    } else {
        Swal.fire({
            'icon': 'warning', //'success', //'error' //'warning'
            'title': 'No se pudo enviar su mensaje',
            'text': 'Por favor revise los campos resaltados'
        });
    }

};

// function registrarBitacora(nombreUsuario, tel, Provincia, Canton, Distrito, fechaCliente) {
//     var infoTabla = new Array();
//     //Agregar elemento al arreglo:
//     let nuevo_item = [nombreUsuario, tel, Provincia, Canton, Distrito, fechaCliente, 'Paseo'];
//     infoTabla.push(nuevo_item);
//     createCookie(nombreUsuario, infoTabla);
// };

// var createCookie = function(name, value, days) {
//     var expires;
//     if (days) {
//         var date = new Date();
//         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//         expires = "; expires=" + date.toGMTString();
//     } else {
//         expires = "";
//     }
//     document.cookie = name + "=" + value + expires + "; path=/";
// }

const limpiar = () => {
    //.value permite tanto obtener el valor como asignarlo
    inputMascota.value = "";
    inputObservaciones.value = "";
    inputnombreUsuario.value = "";
    input_tel.value = "";
    inputProvincia.value = "";
    inputCanton.value = "";
    inputDistrito.value = "";
    inputTipoServicio.value = "";
    inputfechaCliente.value = "";


}
botonRegistrarCliente.addEventListener('click', validarCliente);