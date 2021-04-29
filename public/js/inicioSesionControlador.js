'use strict';


const input_nombre = document.querySelector('#txtUsuario');
const input_contrasenna = document.querySelector('#txtContrasenna');
const botonIniciar = document.querySelector('#btnInicio');

const obtenerDatos = async() => {
    ///function obtenerDatos() {
    let usuario = input_nombre.value;
    let contrasenna = input_contrasenna.value;
    let error = validar(usuario, contrasenna);
    if (error) {
        swal.fire({
            title: 'Inicio de sesión incorrecto',
            text: 'Por revise revise los campos en rojo',
            type: 'error',
            confirmButtonText: 'Entendido'
        });
    } else {
        let tipoUsuario = await validar_tipo_usuario();
        console.log(tipoUsuario);
        if (tipoUsuario == 4) {
            Swal.fire({
                'icon': 'warning',
                'title': 'Usuario Incorrecto',
                'text': 'El usuario no está registrado o la contraseña es incorrecta'
            });
        } else {
            guardar_info(tipoUsuario);
            limpiar_pantalla();
            window.location.replace("./index.html");
        }
    }
}


const validar_tipo_usuario = async() => {
    const lista_usuarios_admin = new Array("Administrador");
    const passAdmin = "Admin123";
    const lista_usuarios_proveedor = new Array("Wilder", "Yensy");
    let lista_usuarios_cliente = await obtener_clientes();
    let lista_usuarios_proveedores = await obtener_proveedores();
    var arrClientes = new Array(100);
    var arrPass = new Array(100);
    var arrProveedores = new Array(100);
    var arrPassP = new Array(100);
    let validacionPass;
    lista_usuarios_cliente.forEach((cliente) => {
        arrClientes.push(cliente.usuario);
        console.log(cliente.usuario);
    });
    lista_usuarios_cliente.forEach((pass) => {
        arrPass.push(pass.password);
        console.log(pass.password);
    });

    lista_usuarios_proveedores.forEach((proveedor) => {
        arrProveedores.push(proveedor.usuario);
        console.log(proveedor.usuario);
    });
    lista_usuarios_proveedores.forEach((passP) => {
        arrPassP.push(passP.password);
        console.log(passP.password);
    });

    let tipo = 4;
    console.log(tipo);
    if (lista_usuarios_admin.find(nombre => nombre.toLowerCase() == input_nombre.value.toLowerCase())) {
        validacionPass = validarPass(passAdmin);
        if (validacionPass) {
            tipo = 1;
        }
    } else if (arrProveedores.find(nombre2 => nombre2 == input_nombre.value)) {
        let t1 = input_nombre.value
        let indx = arrProveedores.indexOf(t1);
        let passwd = arrPassP[indx];
        console.log("found");
        validacionPass = (validarPass(passwd));
        if (validacionPass) {
            tipo = 2;
        }
    } else if (arrClientes.find(nombre3 => nombre3 == input_nombre.value)) {
        let t1 = input_nombre.value
        let indx = arrClientes.indexOf(t1);
        let passwd = arrPass[indx];
        validacionPass = (validarPass(passwd));
        if (validacionPass) {
            tipo = 3;
        }
    }
    return tipo;
}

function validarPass(password) {
    let autenficado = false;
    if (password == input_contrasenna.value) {
        autenficado = true;
    }
    return autenficado;
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