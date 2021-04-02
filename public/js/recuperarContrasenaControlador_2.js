'use strict';


let boton = document.querySelector('#button-enviar');

var inputCorreo = document.getElementById("txt-correo");

function obtenerDatos() {

    let correo = inputCorreo.value;

    let error = validar(correo);
    if (error) {
        swal.fire({
            title: 'Correo Inválido',
            text: 'Por revise revise que cumpla el formato correcto',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal.fire({
            title: 'Formulario Exitoso',
            text: 'Se ha enviado una contraseña temporal al correo: ' + correo,
            icon: 'success',
            confirmButtonText: 'Entendido',
            timer: 3000,
            buttons: false
        }).then(() => {
            window.location.replace("recuperarContrasena.html");
        });
    }
}

function validar(pcorreo) {
    let expCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let error = false;
    let validation = expCorreo.test(pcorreo);
    if (pcorreo == '' || !validation) {
        error = true;
        inputCorreo.classList.add('errorInput');
    } else {
        inputCorreo.classList.remove('errorInput');
    }

    return error;
}

boton.addEventListener('click', obtenerDatos);