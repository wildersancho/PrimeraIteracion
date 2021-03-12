'use strict';
let nav = document.querySelectorAll('#navPrincipal a');
let conectado = sessionStorage.getItem('conectado');
let tipo = sessionStorage.getItem('tipo_usuario');
let usuario = sessionStorage.getItem('usuario');
let etiqueta = document.querySelector('#lblUsuario');
let foto = document.querySelector('#fotoUsuario');


let objetoUsuario;
let datosUsuario;

const botonCerrarSesion = document.querySelector('#btnCerrarSesion');

botonCerrarSesion.addEventListener('click', cerrarSesion);

if(conectado){
    switch(tipo){
        case 'administrador':
            foto.classList.add('desactivar');
            etiqueta.href = 'bitacora.html';
        break;
    
        case 'cliente':
            nav[0].classList.add('ocultar');
            nav[1].classList.add('ocultar');
            nav[2].classList.add('ocultar');
            nav[3].classList.add('ocultar');
            nav[4].classList.add('ocultar');
            nav[6].classList.add('ocultar');
            nav[7].classList.add('ocultar');
            nav[8].classList.add('ocultar');
            objetoUsuario = obtenerDatosCliente(usuario);
            datosUsuario = objetoUsuario["0"];
        break;
        case 'dueno':
            nav[0].classList.add('ocultar');
            nav[1].classList.add('ocultar');
            nav[2].classList.add('ocultar');
            nav[3].classList.add('ocultar');
            nav[4].classList.add('ocultar');
            nav[6].classList.add('ocultar');
            objetoUsuario = obtenerDatosDueno(usuario);
            datosUsuario = objetoUsuario["0"];
            etiqueta.classList.add('desactivar');
            foto.classList.add('desactivar');
        break;
    
        default:
    
        break;
    
    }
}else{
    window.location.href = 'inicioSesion.html';
}

setUserName();

setFoto();


function cerrarSesion(){

    sessionStorage.clear();
    window.location.href = 'inicioSesion.html';

}
function setUserName(){
    let label = document.querySelector('#lblUsuario');
    if(tipo == 'dueno' && !(datosUsuario['TipodeIdentidad']=='Cédula Jurídica')){
        label.innerHTML = datosUsuario['PrimNombre'] + ' ' + datosUsuario['PrimerApellido'];
    }else if(tipo == 'dueno' && datosUsuario['TipodeIdentidad']=='Cédula de Identidad'){
        label.innerHTML = datosUsuario['PrimNombre'] + ' ' + datosUsuario['PrimerApellido'];
    }else if(tipo == 'dueno' && datosUsuario['TipodeIdentidad']=='Cédula Jurídica'){
        label.innerHTML = datosUsuario['NombreComercial'];
    }else if(tipo=='cliente'){
        label.innerHTML = datosUsuario['primerNombreCliente'] + ' ' + datosUsuario['primerApellidoCliente'];
    }else if(tipo=='administrador'){
        label.innerHTML = 'Administrador';
    }
    
}
function setFoto(){
    let foto = document.querySelector('#fotoUsuario');
    let fotoUsuario;
    if(tipo == 'dueno' && !(datosUsuario['TipodeIdentidad']=='Cédula Jurídica')){
        fotoUsuario = datosUsuario['Foto'];
    }else if(tipo == 'dueno' && datosUsuario['TipodeIdentidad']=='Cédula de Identidad'){
        fotoUsuario = datosUsuario['Foto'];
    }else if(tipo == 'cliente'){
        fotoUsuario = datosUsuario['fotoCliente'];
    }else if(tipo == 'dueno' && datosUsuario['TipodeIdentidad']=='Cédula Jurídica'){
        fotoUsuario = ('/public/imgs/logo.png');    
    }else if(tipo == 'administrador'){
        fotoUsuario = ('/public/imgs/logo.png');
    }
    foto.src = fotoUsuario;
}



