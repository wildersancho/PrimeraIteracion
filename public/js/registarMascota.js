'use strict';
//Datos de section de cliente



let inputnombreMascota = document.querySelector('#txtNombreMascota');

let inputTelContacto = document.querySelector('#telContacto');

let inputRadioButtonMascota = document.querySelectorAll('input[name="rbtMascota"]')

let inputTipoRaza = document.querySelector('#id-raza');

let inputPadecimientos = document.querySelector('#id-padecimientos');

let inputVacunas = document.querySelector('#id-vacunas');

var inputradiosMascotas = document.querySelector('#label-tipoMascota');

let botonRegistrarMascota = document.querySelector('#btnRegistrarMascota');
let imagen = imgPlaceholder;


//Select raza cargarlo desde otro DB
let select_raza = document.getElementById("id-raza");


async function cambiarRaza() {
    let lista_razas = await obtener_razas();


    lista_razas.forEach((raza) => {

        var option = document.createElement('option');
        option.text = raza.raza;
        select_raza.add(option);


    });

    return select_raza;
}

cambiarRaza();


async function obtenerDatosCliente() {

    let error = false;
    let nombreMascota = inputnombreMascota.value;
    let telContacto = inputTelContacto.value;
    let tipoRaza = select_raza.value;
    let padecimientos = inputPadecimientos.value;
    let cargarImg = imagen.scr;

    //Radio Mascota
    let radioGato = document.getElementById('gato');
    let radioPerro = document.getElementById('perro');
    let radiusMascota;

    if (radioGato.checked) {
        radiusMascota = "Gato";
    } else if (radioPerro.checked) {
        radiusMascota = "Perro";
    }

    let vacunas = inputVacunas.value;

    let caracteristicas = document.getElementById('caracteristicas').value;



    error = validarCliente(nombreMascota,
        telContacto, radioGato, radioPerro, tipoRaza, padecimientos, vacunas);

    if (error == true) {
        swal.fire({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar su cuenta, revise los campos en rojo',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    }
    if (error == false) {
        let usuario = window.localStorage.getItem('user');
        registrarMascotas(usuario, radiusMascota, nombreMascota, tipoRaza, padecimientos, vacunas, cargarImg, telContacto, caracteristicas);
    }

};

function validarCliente(pnombreMascota, ptelContacto, pRadioGato, pRadioPerro, ptipoRaza, pPadecimientos, pVacunas) {
    let error = false;
    let expTel = /^[0-9]{8}$/;
    console.log("validando");
    if (pnombreMascota == '') {
        error = true;
        inputnombreMascota.classList.add('errorInput');
    } else {
        inputnombreMascota.classList.remove('errorInput');
    }

    if (ptelContacto == '' || expTel.test(ptelContacto) == false) {
        error = true;
        inputTelContacto.classList.add('errorInput');
    } else {
        inputTelContacto.classList.remove('errorInput');
    }
    if (ptipoRaza == 'Tipo de Raza') {
        error = true;
        inputTipoRaza.classList.add('errorInput');
    } else {
        inputTipoRaza.classList.remove('errorInput');
    }
    if (pPadecimientos == 'Tipo de Padecimientos') {
        error = true;
        inputPadecimientos.classList.add('errorInput');
    } else {
        inputPadecimientos.classList.remove('errorInput');
    }
    if (pVacunas == 'Tipo de vacunas') {
        error = true;
        inputVacunas.classList.add('errorInput');
    } else {
        inputVacunas.classList.remove('errorInput');
    }

    if (pRadioGato.checked || pRadioPerro.checked) {
        inputradiosMascotas.classList.remove('errorInput');

    } else {
        error = true;
        inputradiosMascotas.classList.add('errorInput');
    }
    return error;
};

botonRegistrarMascota.addEventListener('click', obtenerDatosCliente);