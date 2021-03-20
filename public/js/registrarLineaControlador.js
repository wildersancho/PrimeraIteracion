'use strict';
//Datos de section de cliente
let selecttipoIDCliente = document.querySelector('#txtTipoIDCliente');
let inputNombreUsuarioCliente = document.querySelector('#txtNombreUsuarioCliente');
let inputIdentificacionCliente = document.querySelector('#txtIdentificacionCliente');
let inputprimerNombreClienteCliente = document.querySelector('#txtprimerNombreCliente');
let inputsegundoNombreClienteCliente = document.querySelector('#txtsegundoNombreClienteCliente');
let inputprimerApellidoCliente = document.querySelector('#txtprimerApellidoCliente');
let inputsegundoApellidoCliente = document.querySelector('#txtsegundoApellidoCliente');
let inputCorreoCliente = document.querySelector('#txtCorreoCliente');
let inputFechaCliente = document.querySelector('#txtFechaCliente');
let inputEdadCliente = document.querySelector('#txtEdadCliente');
let elementoFotoCliente = document.querySelector('#txtFotoCliente');
let divCaptcha = document.querySelector('#captcha');
let accion = 'Registrar';
let fecha = new Date().toLocaleString();

let botonRegistrarCliente = document.querySelector('#btnRegistrarCliente');
//comentario
botonRegistrarCliente.addEventListener('click', obtenerDatosCliente);


async function obtenerDatosCliente() {
    let error = false;
    let tipoUsuario = 'cliente';
    let nombreUsuarioCliente = inputNombreUsuarioCliente.value;
    let tipoIDCliente = selecttipoIDCliente.value;
    let identificacionCliente = inputIdentificacionCliente.value;
    let primerNombreCliente = inputprimerNombreClienteCliente.value;
    let segundoNombreCliente = inputsegundoNombreClienteCliente.value;
    let primerApellidoCliente = inputprimerApellidoCliente.value;
    let segundoApellidoCliente = inputsegundoApellidoCliente.value;
    let correoCliente = inputCorreoCliente.value;
    let fechaSinFormato = new Date(inputFechaCliente.value);
    let fechaClienteSplit = inputFechaCliente.value.split("-");
    let fechaCliente = fechaClienteSplit[2] + '/' + fechaClienteSplit[1] + '/' + fechaClienteSplit[0];
    let edadCliente = Number(inputEdadCliente.value);
    let captcha = document.querySelector('#g-recaptcha-response').value;
    let fotoCliente = elementoFotoCliente.src;

    error = validarCliente(nombreUsuarioCliente, tipoIDCliente, identificacionCliente, primerNombreCliente, primerApellidoCliente, correoCliente, fechaSinFormato, edadCliente, fotoCliente, captcha);



    if (error == true) {
        swal.fire({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar su cuenta, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        console.log("Iniciar backend");
        //Validar primero con clientes
        //Validar usuario ya registrador
        let usuarioRepetido = await verificarUsuarioCliente(nombreUsuarioCliente);

        if (usuarioRepetido) {

            inputNombreUsuarioCliente.classList.add('errorInput');
            swal.fire({
                title: 'Nombre de usuario ya registrado',
                text: 'Por favor escoger un nombre de usuario diferente',
                type: 'warning',
                confirmButtonText: 'Entendido'
            });
        } else {
            inputNombreUsuarioCliente.classList.remove('errorInput');
            //Validar ahora con Proveedores
            usuarioRepetido = await verificarUsuarioProveedor(nombreUsuarioCliente);

            if (usuarioRepetido) {

                inputNombreUsuarioCliente.classList.add('errorInput');
                swal.fire({
                    title: 'Nombre de usuario ya registrado',
                    text: 'Por favor escoger un nombre de usuario diferente',
                    type: 'warning',
                    confirmButtonText: 'Entendido'
                });
            } else {
                inputNombreUsuarioCliente.classList.remove('errorInput');
                //Validar ahora correo con clientes
                let correoRepetido = await verificarCorreoCliente(correoCliente);
                if (correoRepetido) {
                    inputCorreoCliente.classList.add('errorInput');
                    swal.fire({
                        title: 'Correo electrónico de cuenta ya registrado',
                        text: 'Por favor escoger un correo electrónico de cuenta diferente',
                        type: 'warning',
                        confirmButtonText: 'Entendido'
                    });
                } else {
                    inputCorreoCliente.classList.remove('errorInput');
                    //Validar ahora correo de Aministrador
                    correoRepetido = await verificarCorreoAdministrador(correoCliente);

                    if (correoRepetido) {
                        inputCorreoCliente.classList.add('errorInput');
                        swal.fire({
                            title: 'Correo electrónico de cuenta ya registrado',
                            text: 'Por favor escoger un correo electrónico de cuenta diferente',
                            type: 'warning',
                            confirmButtonText: 'Entendido'
                        });
                    } else {
                        inputCorreoCliente.classList.remove('errorInput');
                        let respuesta = registrarLinea(tipoUsuario, nombreUsuarioCliente, tipoIDCliente, identificacionCliente, primerNombreCliente, segundoNombreCliente, primerApellidoCliente, segundoApellidoCliente, correoCliente, fechaCliente, edadCliente, fotoCliente, captcha);
                        registrarBitacora(nombreUsuarioCliente, accion, 'cliente', primerNombreCliente + ' ' + primerApellidoCliente, fecha);
                        console.log("Terminar backend");
                        if (respuesta.success == true) {
                            swal.fire({
                                title: 'Registro correcto',
                                text: respuesta.msg,
                                type: 'success',
                                showConfirmButton: false
                            });
                            setTimeout(() => {
                                location.href = "http://127.0.0.1:5500/public/inicioSesion.html"
                            }, 3000);
                        } else {
                            swal.fire({
                                title: 'Registro incorrecto',
                                text: respuesta.msg,
                                type: 'error',
                                confirmButtonText: 'Entendido'
                            });
                        }
                    }
                }
            }
        }
    }
};


function validarCliente(pnombreUsuarioCliente, ptipoIDCliente, pidentificacionCliente, pprimerNombreCliente, pprimerApellidoCliente, pcorreoCliente, pfechaCliente, pedadCliente, pfotoCliente, pcaptcha) {
    let error = false;
    let expLetras = /^[a-z A-ZáéíóúñÑÁÉÍÓÚüÜ]+$/;
    let regExpNumeros = /^[0-9]+$/;
    let regExpAlfanumericos = /^[a-z A-ZáéíóúñÑÁÉÍÓÚüÜ0-9]+$/;
    let expCorreo = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    console.log("validando");

    if (pnombreUsuarioCliente == '') {
        error = true;
        inputNombreUsuarioCliente.classList.add('errorInput');
    } else {
        inputNombreUsuarioCliente.classList.remove('errorInput');
    }

    if (pprimerNombreCliente == '' || expLetras.test(pprimerNombreCliente) == false) {
        error = true;
        inputprimerNombreClienteCliente.classList.add('errorInput');
    } else {
        inputprimerNombreClienteCliente.classList.remove('errorInput');
    }

    if (pidentificacionCliente == '' || regExpNumeros.test(pidentificacionCliente) == false) {
        error = true;
        inputIdentificacionCliente.classList.add('errorInput');
    } else {
        if ((ptipoIDCliente == 'Cédula de Identidad' && (pidentificacionCliente.length == 9 || pidentificacionCliente.length == 10) && regExpNumeros.test(pidentificacionCliente) == true) || (ptipoIDCliente == 'Cédula de Residencia' && regExpAlfanumericos.test(pidentificacionCliente))) {
            inputIdentificacionCliente.classList.remove('errorInput');
        } else {
            inputIdentificacionCliente.classList.add('errorInput');
        }
    }

    if (pprimerApellidoCliente == '' || expLetras.test(pprimerApellidoCliente) == false) {
        error = true;
        inputprimerApellidoCliente.classList.add('errorInput');
    } else {
        inputprimerApellidoCliente.classList.remove('errorInput');
    }
    if (pcorreoCliente == '' || expCorreo.test(pcorreoCliente) == false) {
        error = true;
        inputCorreoCliente.classList.add('errorInput');
    } else {
        inputCorreoCliente.classList.remove('errorInput');
    }

    if (pfechaCliente == 'Invalid Date') {
        error = true;
        inputFechaCliente.classList.add('errorInput');
    } else {
        inputFechaCliente.classList.remove('errorInput');
    }

    if (pedadCliente == '' || pedadCliente < inputEdadCliente.min || pedadCliente > inputEdadCliente.max || regExpNumeros.test(inputEdadCliente.value) == false) {
        error = true;
        inputEdadCliente.classList.add('errorInput');
    } else {
        inputEdadCliente.classList.remove('errorInput');
    }

    if (pfotoCliente == 'http://127.0.0.1:5500/public/imgs/foto.png') {
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

    return error;
};

function calcularEdad() {
    let fechaActual = new Date(); /**Obtener la fecha actual */
    let fechaIngresada = new Date(inputFechaCliente.value);

    let edad = fechaActual.getFullYear() - fechaIngresada.getFullYear(); /*Obtener la edad*/
    console.log('Haciendo fecha');
    inputEdadCliente.value = edad;
}


inputFechaCliente.addEventListener('change', calcularEdad);

//Para captcha (creo)
$(document).ready(function() {
    $('#comment_form').submit(function() {
        $(this).ajaxSubmit({
            error: function(xhr) {
                status('Error: ' + xhr.status);
            },
            success: function(response) {
                console.log(response);
            }
        });
        //Very important line, it disable the page refresh.
        return false;
    });
});