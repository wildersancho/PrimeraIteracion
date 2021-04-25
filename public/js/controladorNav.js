'use strict';


const navAdmin = () => {
    if (localStorage.getItem("user") !== null) {
        let tipoAdmin = validar_tipo_usuario_2();
        if (tipoAdmin == 1) {
            document.getElementById('navDinamico').innerHTML = `<a href="index.html"><img src="imgs/IconoMenu.png" id="logo" /></a>
            <a href="perfilProveedorCliente.html">Buscar un servicio</a>
            <a href="registrarProveedor.html">Ofrecer un servicio</a>
            <a class="icono-menu" onclick="cambiar_estilo_navegacion();">☰</a>
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
            <a href="perfilProveedorCliente.html">Buscar un servicio</a>
            <a href="registrarProveedor.html">Ofrecer un servicio</a>
            <a class="icono-menu" onclick="cambiar_estilo_navegacion();">☰</a>
            <a href="perfilProvedor.html">Mi Perfil</a>
            <a class="cerrarSesion" href="inicioSesion.html">Cerrar Sesión</a>`;
        }
    }
}
const navCliente = () => {
    if (localStorage.getItem("user") !== null) {
        let tipoCliente = validar_tipo_usuario_2();
        if (tipoCliente == 3) {
            document.getElementById('navDinamico').innerHTML = `<a href="index.html"><img src="imgs/IconoMenu.png" id="logo" /></a>
            <a href="perfilProveedorCliente.html">Buscar un servicio</a>
            <a href="registrarProveedor.html">Ofrecer un servicio</a>
            <a class="icono-menu" onclick="cambiar_estilo_navegacion();">☰</a>
            <a href="perfilUsuario.html">Mi Perfil</a>
            <a class="cerrarSesion" href="inicioSesion.html">Cerrar Sesión</a>`;
        }
    }
}
navAdmin();
navCliente();
navProveedor();