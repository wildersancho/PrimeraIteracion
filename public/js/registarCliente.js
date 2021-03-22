'use strict';
//Datos de section de cliente
let selecttipoIDCliente = document.querySelector('#txtTipoIDCliente');
let inputidentificacionCliente = document.querySelector('#txtIdentificacionCliente');
let inputemail = document.querySelector('#txtEmail');
let inputnombreUsuario = document.querySelector('#txtNombreUsuario');
let inputnombreCliente = document.querySelector('#txtNombreCliente');
let inputsegundoNombreCliente = document.querySelector('#txtSegundoNombreCliente');

let inputprimerApellidoCliente = document.querySelector('#txtPrimerApellidoCliente');
let inputsegundoApellidoCliente = document.querySelector('#txtSegundoApellidoCliente');

let inputfechaCliente = document.querySelector('#txtFechaCliente');
let inputedadCliente = document.querySelector('#txtEdadCliente');
let inputcantidadMascota = document.querySelector('#txtCantidadMascotas');
let elementoFotoCliente = document.querySelector('#txtFotoCliente');
let divCaptcha = document.querySelector('#captcha');
let accion = 'Registrar';
let fecha = new Date().toLocaleString();
let botonRegistrarCliente = document.querySelector('#btnRegistrarCliente');

botonRegistrarCliente.addEventListener('click', obtenerDatosCliente);

async function obtenerDatosCliente() {
    let error = false;
    let tipoUsuario = 'cliente';
    let tipoIDCliente = selecttipoIDCliente.value;
    let identificacionCliente = inputidentificacionCliente.value;
    let nombreUsuario = inputnombreUsuario.value;
    let nombreCliente = inputnombreCliente.value;
    let segundoNombreCliente = inputsegundoNombreCliente.value;
    let primerApellidoCliente = inputprimerApellidoCliente.value;
    let segundoApellidoCliente = inputsegundoApellidoCliente.value;
    let email = inputemail.value;
    let fechaSinFormato = new Date(inputfechaCliente.value);
    let fechaClienteSplit = inputfechaCliente.value.split("-");
    let fechaCliente = fechaClienteSplit[2] + '/' + fechaClienteSplit[1] + '/' + fechaClienteSplit[0];
    let edadCliente = Number(inputedadCliente.value);
    let cantidadMascotas = Number(inputcantidadMascota.value);
    let captcha = document.querySelector('#g-recaptcha-response').value;
    let fotoCliente = elementoFotoCliente.src;

    error = validarCliente(nombreUsuario, tipoIDCliente, identificacionCliente, nombreCliente, primerApellidoCliente, email, fechaSinFormato, edadCliente, cantidadMascotas, fotoCliente, captcha);


    if (error == true) {
        swal.fire({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar su cuenta, revise los campos en rojo',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        //Validar usuario ya registrado
        let usuarioRepetido = false;
        if (usuarioRepetido) {
            inputnombreUsuario.classList.add('errorInput');
            swal.fire({
                title: 'Nombre de usuario ya registrado',
                text: 'Por favor escoger un nombre de usuario diferente',
                icon: 'warning',
                confirmButtonText: 'Entendido'
            });
        } else {
            inputnombreUsuario.classList.remove('errorInput');
            let emailRepetido = false;
            if (emailRepetido) {} else {
                inputemail.classList.remove('errorInput');
                registrarBitacora(tipoIDCliente, identificacionCliente, email, nombreUsuario, nombreCliente, primerApellidoCliente, fechaCliente, cantidadMascotas)
                if (error == false) {
                    swal.fire({
                        title: 'Registro correcto',
                        icon: 'success',
                        showConfirmButton: false
                    });
                    window.location.replace("http://127.0.0.1:5500/registrar-tarjetas.html")
                } else {
                    swal.fire({
                        title: 'Registro incorrecto',
                        icon: 'error',
                        confirmButtonText: 'Entendido'
                    });
                }

            }
        }
    }
};


function validarCliente(pnombreUsuario, ptipoIDCliente, pidentificacionCliente, pnombreCliente, pprimerApellidoCliente, pemail, pfechaCliente, pedadCliente, pcantidadMascotas, pfotoCliente, pcaptcha) {
    let error = false;
    let expLetras = /^[a-z A-ZáéíóúñÑÁÉÍÓÚüÜ]+$/;
    let regExpNumeros = /^[0-9]+$/;
    /*let regExpAlfanumericos = /^[a-z A-ZáéíóúñÑÁÉÍÓÚüÜ0-9]+$/;*/
    let regExpAlfanumericos = /^[a-z]+$/;
    let expCorreo = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    console.log("validando");

    if (pnombreUsuario == '') {
        error = true;
        inputnombreUsuario.classList.add('errorInput');
    } else {
        inputnombreUsuario.classList.remove('errorInput');
    }

    if (pnombreCliente == '' || expLetras.test(pnombreCliente) == false) {
        error = true;
        inputnombreCliente.classList.add('errorInput');
    } else {
        inputnombreCliente.classList.remove('errorInput');
    }

    if (pidentificacionCliente == '' || regExpNumeros.test(pidentificacionCliente) == false) {
        error = true;
        inputidentificacionCliente.classList.add('errorInput');
    } else {
        if ((ptipoIDCliente == 'Cédula de Identidad' && (pidentificacionCliente.length == 9 || pidentificacionCliente.length == 10) && regExpNumeros.test(pidentificacionCliente) == true)) {
            inputidentificacionCliente.classList.remove('errorInput');
        } else if (ptipoIDCliente != 'Cédula de Identidad' && regExpAlfanumericos.test(pidentificacionCliente) == true) {
            inputidentificacionCliente.classList.remove('errorInput');
        } else {
            inputidentificacionCliente.classList.add('errorInput');
        }
    }

    if (pprimerApellidoCliente == '' || expLetras.test(pprimerApellidoCliente) == false) {
        error = true;
        inputprimerApellidoCliente.classList.add('errorInput');
    } else {
        inputprimerApellidoCliente.classList.remove('errorInput');
    }

    if (pemail == '' || expCorreo.test(pemail) == false) {
        error = true;
        inputemail.classList.add('errorInput');
    } else {
        inputemail.classList.remove('errorInput');
    }

    if (pfechaCliente == 'Invalid Date') {
        error = true;
        inputfechaCliente.classList.add('errorInput');
    } else {
        inputfechaCliente.classList.remove('errorInput');
    }

    if (pedadCliente == '' || pedadCliente < inputedadCliente.min || pedadCliente > inputedadCliente.max || regExpNumeros.test(inputedadCliente.value) == false) {
        error = true;
        inputedadCliente.classList.add('errorInput');
    } else {
        inputedadCliente.classList.remove('errorInput');
    }

    if (pfotoCliente == 'http://127.0.0.1:5500/public/imgs/foto.png') { /*Arreglar*/
        error = true;
        elementoFotoCliente.classList.add('errorInput');
    } else {
        elementoFotoCliente.classList.remove('errorInput');
    }

    if (pcaptcha === undefined || pcaptcha === '' || pcaptcha === null) {
        error = true;
        divCaptcha.classList.add('errorInput');
    } else {
        divCaptcha.classList.remove('errorInput');
    }
    if (pcantidadMascotas < 1) {
        error = true;
        inputcantidadMascota.classList.add('errorInput');
    } else {
        inputcantidadMascota.classList.remove('errorInput');
    }

    return error;
};

function calcularEdad() {
    let fechaActual = new Date(); /**Obtener la fecha actual */
    let fechaIngresada = new Date(inputfechaCliente.value);

    let edad = fechaActual.getFullYear() - fechaIngresada.getFullYear(); /*Obtener la edad*/
    console.log('Haciendo fecha');
    inputedadCliente.value = edad;
}

function registrarBitacora(selecttipoIDCliente, inputidentificacionCliente, inputemail, inputnombreUsuario, inputnombreCliente, inputprimerApellidoCliente, inputfechaCliente, inputcantidadMascota) {
    var infoTabla = new Array();
    //Agregar elemento al arreglo:
    let nuevo_item = [selecttipoIDCliente, inputidentificacionCliente, inputemail, inputnombreUsuario, inputnombreCliente, inputprimerApellidoCliente, inputfechaCliente, inputcantidadMascota];
    infoTabla.push(nuevo_item);
    createCookie(inputidentificacionCliente, infoTabla);
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

inputfechaCliente.addEventListener('change', calcularEdad);