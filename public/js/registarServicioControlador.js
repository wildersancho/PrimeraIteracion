'use strict';
//Datos de section de cliente
let inputnombreUsuario = document.querySelector('#txtNombreUsuario');
let inputfechaCliente = document.querySelector('#FechaServicio');
let input_tel = document.querySelector('#TelContacto');
let inputProvincia = document.querySelector('#id-provincia');
let inputCanton = document.querySelector('#id-canton');
let inputDistrito = document.querySelector('#id-distrito');
var inputradios = document.querySelector('#label-tipoServicio');
let inputRadioButton = document.querySelectorAll('input[name="rbtServicio"]')
let accion = 'Registrar';
let fecha = new Date().toLocaleString();
let botonRegistrarCliente = document.querySelector('#btnRegistrarServicio');

botonRegistrarCliente.addEventListener('click', obtenerDatosServicio);

async function obtenerDatosServicio() {
    let error = false;
    let nombreUsuario = inputnombreUsuario.value;
    let tel = input_tel.value;
    let Provincia = inputProvincia.value;
    let Canton = inputCanton.value;
    let Distrito = inputDistrito.value;
    let fechaSinFormato = new Date(inputfechaCliente.value);
    let fechaClienteSplit = inputfechaCliente.value.split("-");
    let fechaCliente = fechaClienteSplit[2] + '/' + fechaClienteSplit[1] + '/' + fechaClienteSplit[0];

    error = validarCliente(nombreUsuario, tel, Provincia, Canton, Distrito, fechaSinFormato, inputRadioButton);


    if (error == true) {
        swal.fire({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar su cuenta, revise los campos en rojo',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        registrarBitacora(nombreUsuario, tel, Provincia, Canton, Distrito, fechaCliente)
        if (error == false) {
            swal.fire({
                title: 'Registro correcto',
                icon: 'success',
                showConfirmButton: false
            });
        } else {
            swal.fire({
                title: 'Registro incorrecto',
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
        }

    }
};


function validarCliente(pnombreUsuario, ptel, pProvincia, pCanton, pDistrito, pfechaCliente, pinputRadioButton) {
    let error = false;
    let expTel = /[0-9]{8}$/;
    console.log("validando");

    if (pnombreUsuario == '') {
        error = true;
        inputnombreUsuario.classList.add('errorInput');
    } else {
        inputnombreUsuario.classList.remove('errorInput');
    }
    if (ptel == '' || expTel.test(ptel) == false) {
        error = true;
        input_tel.classList.add('errorInput');
    } else {
        input_tel.classList.remove('errorInput');
    }
    if (pfechaCliente == 'Invalid Date') {
        error = true;
        inputfechaCliente.classList.add('errorInput');
    } else {
        inputfechaCliente.classList.remove('errorInput');
    }
    if (pProvincia == 'Provincia') {
        error = true;
        inputProvincia.classList.add('errorInput');
    } else {
        inputProvincia.classList.remove('errorInput');
    }
    if (pCanton == 'Canton') {
        error = true;
        inputCanton.classList.add('errorInput');
    } else {
        inputCanton.classList.remove('errorInput');
    }
    if (pDistrito == 'Distrito') {
        error = true;
        inputDistrito.classList.add('errorInput');
    } else {
        inputDistrito.classList.remove('errorInput');
    }
    for (const rb of pinputRadioButton) {
        if (rb.checked) {
            inputradios.classList.remove('errorInput');
            break;
        } else {
            error = true;
            inputradios.classList.add('errorInput');
        }
    }
    return error;
};

function registrarBitacora(nombreUsuario, tel, Provincia, Canton, Distrito, fechaCliente) {
    var infoTabla = new Array();
    //Agregar elemento al arreglo:
    let nuevo_item = [nombreUsuario, tel, Provincia, Canton, Distrito, fechaCliente, 'Paseo'];
    infoTabla.push(nuevo_item);
    createCookie(nombreUsuario, infoTabla);
};

var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}