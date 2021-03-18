'use strict';

function registrarLinea(ptipoUsuario, pnombreUsuarioCliente, ptipoIDCliente, pidentificacionCliente, pprimerNombreCliente, psegundoNombreCliente, pprimerApellidoCliente, psegundoApellidoCliente, pcorreoCliente, pfechaCliente, pedadCliente, pImagenURL, pcaptcha) {

    let respuesta = '';
    console.log("Valor de fecha: " + pfechaCliente);
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_cliente',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            tipoUsuario: ptipoUsuario,
            nombreUsuarioCliente: pnombreUsuarioCliente,
            tipoIDCliente: ptipoIDCliente,
            identificacionCliente: pidentificacionCliente,
            primerNombreCliente: pprimerNombreCliente,
            segundoNombreCliente: psegundoNombreCliente,
            primerApellidoCliente: pprimerApellidoCliente,
            segundoApellidoCliente: psegundoApellidoCliente,
            correoCliente: pcorreoCliente,
            fechaCliente: pfechaCliente,
            edadCliente: pedadCliente,
            fotoCliente: pImagenURL,
            captcha: pcaptcha
        }
    });
    console.log(peticion.body);
    peticion.done(function(response) {
        respuesta = response;
    });

    peticion.fail(function(response) {
        respuesta = response;
    });

    return respuesta;
};

function verificarUsuarioCliente(pnombreUsuarioCliente) {
    let respuesta = '';
    if (pnombreUsuarioCliente == 'admin') {
        respuesta = true;
    } else {
        let peticion = $.ajax({
            url: 'http://localhost:4000/api/verificar_usuario_cliente',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            async: false,
            data: {
                nombreUsuarioCliente: pnombreUsuarioCliente
            }
        });
        peticion.done(function(response) {
            respuesta = response;
        });

        peticion.fail(function(response) {});
    }
    return respuesta;
};

function verificarUsuarioDueno(pnombreUsuarioCliente) {
    let respuesta = '';
    if (pnombreUsuarioCliente == 'admin') {
        respuesta = true;
    } else {
        let peticion = $.ajax({
            url: 'http://localhost:4000/api/verificar_usuario_dueno',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            async: false,
            data: {
                NombreUsuario: pnombreUsuarioCliente
            }
        });

        peticion.done(function(response) {
            respuesta = response;
        });

        peticion.fail(function(response) {});
    }
    console.log('Valor de respuesta: ');
    console.log(respuesta.body);
    return respuesta;
};


function verificarCorreoCliente(pcorreoCliente) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/verificar_correo_cliente',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            correoCliente: pcorreoCliente
        }
    });
    peticion.done(function(response) {
        respuesta = response;
    });

    peticion.fail(function(response) {});

    return respuesta;
};

function verificarCorreoDueno(pcorreoCliente) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/verificar_correo_dueno',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            correo: pcorreoCliente
        }
    });
    peticion.done(function(response) {
        respuesta = response;
    });

    peticion.fail(function(response) {});

    return respuesta;
};

let imagenUrl = '';
let cont = 0;



function processImage(id) {
    let options = {
        client_hints: true,
    };
    return $.cloudinary.url(id, options);
}