'use strict';

const registrar_servicio = async(nombreUsuario, nombreProveedor, tel, Provincia, Canton, Distrito, Servicio, nombreMascota, Observaciones, fecha) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-servicio',
        responseType: 'json',
        data: {
            nombreUsuario: nombreUsuario,
            nombreProveedor: nombreProveedor,
            tel: tel,
            Provincia: Provincia,
            Canton: Canton,
            Distrito: Distrito,
            Servicio: Servicio,
            nombreMascota: nombreMascota,
            Observaciones: Observaciones,
            fecha: fecha,
            status: 'enviado',
            banned: false
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su mensaje ha sido enviado',
            'text': response.msj
        }).then(() => {
            limpiar();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
    //en data a la izquierda van las llaves y a la derecha el valor (el parametro que recibimos.)
};