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

var inputradios = document.querySelector('#label-tarjeta'); /** */
let inputRadioButton = document.querySelectorAll('input[name="rbtTarjeta"]') /**/
var img_perfil = document.getElementById("img-perfil");

let accion = 'Registrar';
let fecha = new Date().toLocaleString();
let botonRegistrarCliente = document.querySelector('#btnRegistrarCliente');
let imagen = imgPlaceholder;

async function obtenerDatosCliente() {

    let cargarImg = imagen.scr;
    let error = false;
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

    error = validarCliente(nombreUsuario, tipoIDCliente, identificacionCliente, nombreCliente, primerApellidoCliente, email, fechaSinFormato, edadCliente, cantidadMascotas, inputRadioButton);
    let nombre = nombreCliente + " " + segundoNombreCliente + " " + primerApellidoCliente + " " + segundoApellidoCliente;


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
                if (error == false) {
                    registrarClientes(tipoIDCliente, identificacionCliente, email, nombreUsuario, nombre, fechaSinFormato, edadCliente, cantidadMascotas, cargarImg);
                }

            }
        }
    }

};



async function validarUsuarioDuplicado() {
    let userInput = inputnombreUsuario;

    let es_duplicado;

    let popup = document.getElementById('user-popup');
    popup.innerHTML = "";

    let lista_clientes = await listarClientes();

    lista_clientes.forEach((user) => {
        let userDB = user.usuario;
        if (userInput.value == userDB) {
            es_duplicado = true;
        }
    });


    if (es_duplicado == true) {
        userInput.classList.add('errorInput');
        popup.innerHTML = "Usuario ya existe";
    } else if (es_duplicado == false) {
        userInput.classList.remove('errorInput');

    }

}

function validarCliente(pnombreUsuario, ptipoIDCliente, pidentificacionCliente, pnombreCliente, pprimerApellidoCliente, pemail, pfechaCliente, pedadCliente, pcantidadMascotas, pinputRadioButton) {
    let error = false;
    let expLetras = /^[a-z A-ZáéíóúñÑÁÉÍÓÚüÜ]+$/;
    let regExpNumeros = /^[0-9]+$/;
    let regExpAlfanumericos = /^[a-z]+$/;
    let expCorreo = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    console.log("validando");

    validarUsuarioDuplicado();


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

    if (pcantidadMascotas < 1) {
        error = true;
        inputcantidadMascota.classList.add('errorInput');
    } else {
        inputcantidadMascota.classList.remove('errorInput');
    }

    for (const rb of pinputRadioButton) {
        if (rb.checked) {
            inputradios.classList.remove('errorInput');
            break;
        } else {
            error = true;
            inputradios.classList.add('errorInput');
            console.log(inputradios.value)
        }
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

$("#radio1").click(function() {
    $('#registroTarjeta').html('');
    $('#registroTarjeta').append(' <a href="registrarTarjetas.html">Registrar tarjeta</a>');
});

$("#radio2").click(function() {
    $('#registroTarjeta').html('');
});


botonRegistrarCliente.addEventListener('click', obtenerDatosCliente);
inputfechaCliente.addEventListener('change', calcularEdad);