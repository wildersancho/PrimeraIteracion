'use strict';

const registrar_servicio = async(usuario, nombreProveedor, tel, Provincia, Canton, Distrito, servicio, nombreMascota, Observaciones, fecha) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-servicio',
        responseType: 'json',
        data: {
            usuario: usuario,
            nombreProveedor: nombreProveedor,
            tel: tel,
            Provincia: Provincia,
            Canton: Canton,
            Distrito: Distrito,
            servicio: servicio,
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


const obtener_servicios = async(usuario) => {
    let lista_servicios = []
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-servicios',
        responseType: 'json',
        params: {
            usuario: usuario
        }
    }).then((response) => {
        lista_servicios = response.data.lista_servicios;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return lista_servicios;
}


const eliminar_servicio = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-servicio',
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'title': 'La servicio ha sido eliminada',
            'icon': 'success',
            'text': response.msj
        }).then(() => {
            mostrar_servicios();
        });
    }).catch((response) => {
        Swal.fire({
            'title': response.msj,
            'icon': 'error',
            'text': response.err
        })
    });
};