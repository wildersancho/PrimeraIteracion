'use strict';
//Datos de section de cliente
let inputnombreUsuario = document.querySelector('#txtNombreUsuario');
let inputfechaCliente = document.querySelector('#FechaServicio');
let input_tel = document.querySelector('#TelContacto');
let inputProvincia = document.querySelector('#id-provincia');
let inputCanton = document.querySelector('#id-canton');
let inputDistrito = document.querySelector('#id-distrito');
let inputObservaciones = document.querySelector('#observaciones');
var inputradios = document.querySelector('#label-tipoServicio');
var selectMascota = document.querySelector('#nombreMascota');
let inputRadioButton = document.querySelectorAll('input[name="rbtServicio"]')
let accion = 'Registrar';
let botonRegistrarCliente = document.querySelector('#btnRegistrarServicio');


botonRegistrarCliente.addEventListener('click', obtenerDatosServicio);

async function obtenerDatosServicio() {
    let Servicio = '';
    let radios = document.getElementsByName('rbtServicio');

    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            Servicio = radios[i].value;
            break;
        }
    }
    let error = false;
    let nombreMascota = selectMascota.value;
    let nombreUsuario = inputnombreUsuario.value;
    let tel = input_tel.value;
    let Provincia = inputProvincia.value;
    let Canton = inputCanton.value;
    let Distrito = inputDistrito.value;
    let Observaciones = inputObservaciones.value;
    let fecha = inputfechaCliente.value;

    error = validarCliente(nombreUsuario, tel, Provincia, Canton, Distrito, fecha, inputRadioButton);

    if (error == true) {
        swal.fire({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar su cuenta, revise los campos en rojo',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        console.log(nombreUsuario);
        console.log(tel);
        console.log(Provincia);
        console.log(Canton);
        console.log(Distrito);
        console.log(Servicio);
        console.log(nombreMascota);
        console.log(Observaciones);
        console.log(fecha);
        registrar_servicio(nombreUsuario, tel, Provincia, Canton, Distrito, Servicio, nombreMascota, Observaciones, fecha);
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
    let expTel = /^[0-9]{8}$/;
    console.log("validando");

    if (pnombreUsuario == '') {
        error = true;
        inputnombreUsuario.classList.add('errorInput');
        console.log("error usuario");
    } else {
        inputnombreUsuario.classList.remove('errorInput');
    }
    if (ptel == '' || expTel.test(ptel) == false) {
        error = true;
        input_tel.classList.add('errorInput');
        console.log("error telefono");
    } else {
        input_tel.classList.remove('errorInput');
    }
    if (pfechaCliente == 'Invalid Date') {
        error = true;
        inputfechaCliente.classList.add('errorInput');
        console.log("error fecha");
    } else {
        inputfechaCliente.classList.remove('errorInput');
    }
    if (pProvincia == 'Provincia') {
        error = true;
        inputProvincia.classList.add('errorInput');
        console.log("error Provincia");
    } else {
        inputProvincia.classList.remove('errorInput');
    }
    if (pCanton == 'Cantón') {
        error = true;
        inputCanton.classList.add('errorInput');
        console.log("error Canton");
    } else {
        inputCanton.classList.remove('errorInput');
    }
    if (pDistrito == 'Distrito') {
        error = true;
        inputDistrito.classList.add('errorInput');
        console.log("error Distrito");
    } else {
        inputDistrito.classList.remove('errorInput');
    }
    for (const rb of pinputRadioButton) {
        if (rb.checked) {
            inputradios.classList.remove('errorInput');
            error = false;
            break;
        } else {
            error = true;
            inputradios.classList.add('errorInput');
            console.log("error Radios");
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


const limpiar = () => {
    inputnombreUsuario.value = '';
    inputfechaCliente.value = '';
    input_tel.value = '';
    inputProvincia.value = 'Provincia';
    inputCanton.value = 'Cantón';
    inputDistrito.value = 'Distrito';
    inputObservaciones.value = '';
}

function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];

    // loop through list of radio buttons
    for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}