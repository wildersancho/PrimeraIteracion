'use strict';


const validar_tipo_usuario_2 = () => {
    let tipo = 4;

    if (localStorage.getItem("user_type").toString() != "4") {
        tipo = localStorage.getItem("user_type").toString();
    }
    return tipo;
}


const navAdmin = () => {
    if (localStorage.getItem("user") !== null) {
        let tipoAdmin = validar_tipo_usuario_2();
        if (tipoAdmin == 1) {
            document.getElementById('navDinamico').innerHTML = `<a href="index.html"><img src="imgs/IconoMenu.png" id="logo" /></a>
            <a href="listarProveedoresCliente.html">Buscar un servicio</a>
            <a href="registrarProveedor.html">Ofrecer un servicio</a>
            <a href="perfilAdministador.html">Mi Perfil</a>
            <a class="cerrarSesion" href="inicioSesion.html">Cerrar Sesión</a>`;
        }
    }
}

const navProveedor = () => {
    if (localStorage.getItem("user") !== null) {
        let tipoProveedor = validar_tipo_usuario_2();
        if (tipoProveedor == 2) {
            document.getElementById('navDinamico').innerHTML = `<a href="index.html"><img src="imgs/IconoMenu.png" id="logo" /></a>
            <a href="listarProveedoresCliente.html">Buscar un servicio</a>
            <a href="perfilProvedor.html">Mi Perfil</a>
            <a class="cerrarSesion" href="inicioSesion.html"onclick="cerrarSesion()" >Cerrar Sesión</a>`;
        }
    }
}
const navCliente = () => {
    if (localStorage.getItem("user") !== null) {
        let tipoCliente = validar_tipo_usuario_2();
        if (tipoCliente == 3) {
            document.getElementById('navDinamico').innerHTML = `<a href="index.html"><img src="imgs/IconoMenu.png" id="logo" /></a>
            <a href="listarProveedoresCliente.html">Buscar un servicio</a>
            <a href="perfilUsuario.html">Mi Perfil</a>
            <a class="cerrarSesion" href="inicioSesion.html">Cerrar Sesión</a>`;
        }
    }
}
const navGeneral = () => {
    if (localStorage.getItem("user") === null) {
        document.getElementById('navDinamico').innerHTML = `<a href="index.html"><img src="imgs/IconoMenu.png" id="logo" /></a>
            <a href="listarProveedoresCliente.html">Buscar un servicio</a>
            <a href="registrarProveedor.html">Ofrecer un servicio</a>
            <a class="cerrarSesion" href="inicioSesion.html">Inicio Sesion</a>`;

    }
}

navAdmin();
navCliente();
navProveedor();
navGeneral();

let botonCerrarSesion = document.querySelector('.cerrarSesion');

function cerrarSesion() {
    localStorage.clear();
}

botonCerrarSesion.addEventListener('click', cerrarSesion);