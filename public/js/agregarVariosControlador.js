'use strict';
//Datos de section de cliente

let botonRegistrarVacuna = document.querySelector('#btnRegistrarVacuna');
let botonRegistrarPadecimiento = document.querySelector('#btnRegistrarPadecimiento');
let botonRegistrarOtros = document.querySelector('#btnRegistrarOtros');

botonRegistrarVacuna.addEventListener("click", obtenerDatosVacuna);
botonRegistrarPadecimiento.addEventListener("click", obtenerDatosPadecimiento);
botonRegistrarOtros.addEventListener("click", obtenerDatosOtros);


async function obtenerDatosVacuna() {
    let error = false;
    let campo = document.getElementById('txtNombreVacuna');
    let pinput = document.getElementById('txtNombreVacuna').value;
    error = validarCliente(campo, pinput);
    if (error == true) {
        swal.fire({
            title: 'Registro incorrecto',
            text: 'Campo no puede estar vacio',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal.fire({
            title: 'Registro ingresado',
            icon: 'success',
            confirmButtonText: 'Entendido'
        });
    }
};

async function obtenerDatosPadecimiento() {
    let error = false;
    let campo = document.getElementById('txtNombrePadecimiento');
    let pinput = document.getElementById('txtNombrePadecimiento').value;
    error = validarCliente(campo, pinput);
    if (error == true) {
        swal.fire({
            title: 'Registro incorrecto',
            text: 'Campo no puede estar vacio',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal.fire({
            title: 'Registro ingresado',
            icon: 'success',
            confirmButtonText: 'Entendido'
        });
    }
};

async function obtenerDatosOtros() {
    let error = false;
    let campo = document.getElementById('txtNombreOtros');
    let pinput = document.getElementById('txtNombreOtros').value;
    error = validarCliente(campo, pinput);
    if (error == true) {
        swal.fire({
            title: 'Registro incorrecto',
            text: 'Campo no puede estar vacio',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal.fire({
            title: 'Registro ingresado',
            icon: 'success',
            confirmButtonText: 'Entendido'
        });
    }
};


function validarCliente(pcampo, pinput) {
    let error = false;
    console.log("validando");
    if (pinput == '') {
        error = true;
        pcampo.classList.add('errorInput');
    } else {
        pcampo.classList.remove('errorInput');
    }
    return error;
};