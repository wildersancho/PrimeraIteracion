'use strict';


const input_nombre = document.querySelector('#txtUsuario');
const input_contrasenna = document.querySelector('#txtContrasenna');
const botonIniciar = document.querySelector('#btnInicio');



function obtenerDatos() {
    let usuario = input_nombre.value;
    let contrasenna = input_contrasenna.value;
    console.log(usuario);
    console.log(contrasenna);
    let error = validar(usuario, contrasenna);
    if (error) {
        swal.fire({
            title: 'Inicio de sesión incorrecto',
            text: 'Por revise revise los campos en rojo',
            type: 'error',
            confirmButtonText: 'Entendido'
        });
    } else {
        let tipoUsuario = validar_tipo_usuario();
        if (tipoUsuario == 4) {
            Swal.fire({
                'icon': 'warning',
                'title': 'Usuario Incorrecto',
                'text': 'El usuario no está registrado'
            });
        } else {
            guardar_info(tipoUsuario);
            limpiar_pantalla();
            window.location.replace("./index.html");
        }
    }
}

const validar_tipo_usuario = () => {
    let tipo = 4;
    if (lista_usuarios_admin.find(nombre => nombre.toLowerCase() == input_nombre.value.toLowerCase())) {
        tipo = 1;
    } else if (lista_usuarios_proveedor.find(nombre => nombre.toLowerCase() == input_nombre.value.toLowerCase())) {
        tipo = 2;
    } else if (lista_usuarios_cliente.find(nombre => nombre.toLowerCase() == input_nombre.value.toLowerCase())) {
        tipo = 3;
    }
    return tipo;
}

function validar(pusuario, pcontrasenna) {
    let error = false;
    if (pusuario == '') {
        error = true;
        input_nombre.classList.add('errorInput');
    } else {
        input_nombre.classList.remove('errorInput');
    }

    if (pcontrasenna == '') {
        error = true;
        input_contrasenna.classList.add('errorInput');
    } else {
        input_contrasenna.classList.remove('errorInput');
    }


    return error;
}

const guardar_info = (tipo_usuario) => {
    localStorage.setItem('user', input_nombre.value);
    //localStorage.setItem('user_pass', input_contrasenna.value);
    localStorage.setItem('user_type', tipo_usuario);
}


const limpiar_pantalla = () => {
    input_nombre.value = '';
    input_contrasenna.value = '';
}

botonIniciar.addEventListener('click', obtenerDatos);