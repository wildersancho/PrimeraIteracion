'use strict';


let boton = document.querySelector('#button-enviar');

var inputCorreo = document.getElementById("txt-correo");
var inputPass = document.getElementById('txt-password');

function obtenerDatos() {

    let correo = inputCorreo.value;
    console.log(correo);
    let contrasenna = inputPass.value;

    let error = validar(correo, contrasenna);
    if (error) {
        swal.fire({
            title: 'No se puede cambiar la contraseña',
            text: 'Por revise revise los campos en rojo',
            icon: 'error',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal.fire({
            title: 'Formulario Exitoso',
            icon: 'success',
            confirmButtonText: 'Entendido'
        }).then(() => {
            window.location.replace("cambiarContraseña.html");
        });
    }
}

function validar(pcorreo, pcontrasenna) {
    let expContrasena = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let expCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let error = false;
    let validation = expCorreo.test(pcorreo);
    if (pcorreo == '' || !validation) {
        error = true;
        inputCorreo.classList.add('errorInput');
    } else {
        inputCorreo.classList.remove('errorInput');
    }

    let validation1 = expContrasena.test(pcontrasenna);
    console.log(validation1);
    if (pcontrasenna == '' || !validation1) {
        error = true;
        inputPass.classList.add('errorInput');
    } else {
        inputPass.classList.remove('errorInput');
    }

    return error;
}

boton.addEventListener('click', obtenerDatos);