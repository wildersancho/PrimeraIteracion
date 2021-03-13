'use strict';

const inputUsuario = document.querySelector('#txtUsuario');
const inputContrasenna = document.querySelector('#txtContrasenna');
const botonIniciar = document.querySelector('#btnInicio');


function obtenerDatos() {
    let usuario = inputUsuario.value;
    let contrasenna = inputContrasenna.value;


    let error = validar(usuario, contrasenna);
    let expContrasena = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let usuarioAceptadoclientes = false;
    let usuarioAceptadoAdmin = false;
    let usuarioAceptadoProveedor = false;

    if (error) {
        swal.fire({
            title: 'Inicio de sesión incorrecto',
            text: 'Por revise revise los campos en rojo',
            type: 'error',
            confirmButtonText: 'Entendido'
        });
    } else {
        usuarioAceptadoclientes = validarCredenciales(usuario, contrasenna);
        if (usuarioAceptadoclientes) {} else {
            usuarioAceptadoAdmin = validarCredencialesAdmin(usuario, contrasenna);
            if (usuarioAceptadoAdmin) {} else {
                usuarioAceptadoProveedor = validarCredencialesProveedor(usuario, contrasenna);
                if (usuarioAceptadoProveedor) {} else {
                    swal.fire({
                        title: 'Inicio de sesión incorrecto',
                        text: 'Por favor revise las credenciales',
                        type: 'error',
                        confirmButtonText: 'Entendido'
                    });
                }
            }
        }
    }
}

function validar(pusuario, pcontrasenna) {
    let error = false;
    if (pusuario == '') {
        error = true;
        inputUsuario.classList.add('errorInput');
    } else {
        inputUsuario.classList.remove('errorInput');
    }

    if (pcontrasenna == '') {
        error = true;
        inputContrasenna.classList.add('errorInput');
    } else {
        inputContrasenna.classList.remove('errorInput');
    }


    return error;
}




botonIniciar.addEventListener('click', obtenerDatos);