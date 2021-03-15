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
let inputcantidadMascota = document.querySelector('txtCantidadMascota')
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
    let cantidadMascotas = inputcantidadMascota
    let captcha = document.querySelector('#g-recaptcha-response').value;
    let fotoCliente = elementoFotoCliente.src;

    error = validarCliente(tipoIDCliente, identificacionCliente, nombreUsuario, nombreCliente, primerApellidoCliente, email,
        fechaSinFormato, edadCliente, cantidadMascotas, fotoCliente, captcha);



    if (error == true) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar su cuenta, revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        console.log("Iniciando backend");
        //Validar primero con clientes
        let usuarioRepetido = await verificarUsuarioCliente(nombreUsuario);

        if (usuarioRepetido) {

            inputnombreUsuario.classList.add('errorInput');
            swal({
                title: 'Nombre de usuario ya registrado',
                text: 'Por favor escoger un nombre de usuario diferente',
                type: 'warning',
                confirmButtonText: 'Entendido'
            });
        } else {
            inputnombreUsuario.classList.remove('errorInput');
            //Validar ahora con duenos
            usuarioRepetido = await verificarUsuarioDueno(nombreUsuario);

            if (usuarioRepetido) {

                inputnombreUsuario.classList.add('errorInput');
                swal({
                    title: 'Nombre de usuario ya registrado',
                    text: 'Por favor escoger un nombre de usuario diferente',
                    type: 'warning',
                    confirmButtonText: 'Entendido'
                });
            } else {
                inputnombreUsuario.classList.remove('errorInput');
                //Validar ahora correo con clientes
                let emailRepetido = await verificarCorreoCliente(email);
                if (emailRepetido) {
                    inputemail.classList.add('errorInput');
                    swal({
                        title: 'Correo electrónico de cuenta ya registrado',
                        text: 'Por favor escoger un correo electrónico de cuenta diferente',
                        type: 'warning',
                        confirmButtonText: 'Entendido'
                    });
                } else {
                    inputemail.classList.remove('errorInput');
                    //Validar ahora correo con duenos (correoNegocio)
                    emailRepetido = await verificarCorreoDueno(email);

                    if (correoRepetido) {
                        inputemail.classList.add('errorInput');
                        swal({
                            title: 'Correo electrónico de cuenta ya registrado',
                            text: 'Por favor escoger un correo electrónico de cuenta diferente',
                            type: 'warning',
                            confirmButtonText: 'Entendido'
                        });
                    } else {
                        inputemail.classList.remove('errorInput');
                        let respuesta = registrarLinea(tipoUsuario, tipoIDCliente, identificacionCliente, nombreUsuario, nombreCliente, segundoNombreCliente, primerApellidoCliente, segundoApellidoCliente, email, fechaCliente, edadCliente, cantidadMascotas, fotoCliente, captcha);
                        registrarBitacora(nombreUsuario, accion, 'cliente', primerNombreCliente + ' ' + primerApellidoCliente + ' ' + segundoApellidoCliente, fecha);
                        console.log("Terminando al backend");
                        if (respuesta.success == true) {
                            swal({
                                title: 'Registro correcto',
                                text: respuesta.msg,
                                type: 'success',
                                showConfirmButton: false
                            });
                            setTimeout(() => {
                                location.href = "http://localhost:3000/public/inicioSesion.html"
                            }, 3000);
                        } else {
                            swal({
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


function validarCliente(pnombreUsuario, ptipoIDCliente, pidentificacionCliente, pnombreCliente, pprimerApellidoCliente, psegundoApellidoCliente, pemail, pfechaCliente, pedadCliente, pfotoCliente, pcaptcha) {
    let error = false;
    let expLetras = /^[a-z A-ZáéíóúñÑÁÉÍÓÚüÜ]+$/;
    let regExpNumeros = /^[0-9]+$/;
    let regExpAlfanumericos = /^[a-z A-ZáéíóúñÑÁÉÍÓÚüÜ0-9]+$/;
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
        if ((ptipoIDCliente == 'Cédula de Identidad' && (pidentificacionCliente.length == 9 || pidentificacionCliente.length == 10) && regExpNumeros.test(pidentificacionCliente) == true) || (ptipoIDCliente == 'Cédula de Residencia' && regExpAlfanumericos.test(pidentificacionCliente))) {
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

    if (psegundoApellidoCliente == '' || expLetras.test(psegundoApellidoCliente) == false) {
        error = true;
        inputsegundoApellidoCliente.classList.add('errorInput');
    } else {
        inputsegundoApellidoCliente.classList.remove('errorInput');
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

    if (pedadCliente == '' || pedadCliente < inputEdadCliente.min || pedadCliente > inputedadCliente.max || regExpNumeros.test(inputedadCliente.value) == false) {
        error = true;
        inputedadCliente.classList.add('errorInput');
    } else {
        inputedadCliente.classList.remove('errorInput');
    }

    if (pfotoCliente == 'http://localhost:3000/public/imgs/foto.png') {
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
    let fechaIngresada = new Date(inputfechaCliente.value);

    let edad = fechaActual.getFullYear() - fechaIngresada.getFullYear(); /*Obtener la edad*/
    console.log('Haciendo fecha');
    inputedadCliente.value = edad;
}


inputfechaCliente.addEventListener('change', calcularEdad);

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