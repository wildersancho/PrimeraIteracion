'use strict';
const obtener_servicios_proveedor = async(Proveedor) => {
    console.log(Proveedor);
    let lista_servicios_proveedor = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api//listar-serviciosp',
        responseType: 'json',
        params: {
            Proveedor: Proveedor
        }
    }).then((response) => {
        lista_servicios_proveedor = response.data.lista_servicios_proveedor;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err)
    });
    return lista_servicios_proveedor;

};

const registrar_solicitud_servicio = async(usuario, nombreProveedor, tel, Provincia, Canton, Distrito, servicio, nombreMascota, Observaciones, fecha) => {
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
// const obtener_solicitud_servicio = async() => {
//     let lista_solicitud_servicio = [];
//     await axios({
//         method: 'get',
//         url: 'http://localhost:3000/api/listar-solicitud-servicio',
//         responseType: 'json'
//     }).then((response) => {
//         lista_solicitud_servicio = response.data.lista_solicitud_servicio;
//     }).catch((response) => {
//         console.log(response.data.msj + " " + response.data.err)
//     });
//     return lista_solicitud_servicio;
// };