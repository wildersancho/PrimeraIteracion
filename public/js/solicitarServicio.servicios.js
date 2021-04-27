'use strict';

const registrar_solicitud_servicio = async(tipoServicio, fechaServicio, nombreUsuario, provincia, canton, distrito, mascotas, telefono, observaciones) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-solicitud-servicio',
        responseType: 'json',
        data: {
            tipoServicio: tipoServicio,
            fechaServicio: fechaServicio,
            nombreUsuario: nombreUsuario,
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            mascotas: mascotas,
            telefono: telefono,
            observaciones: observaciones

        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'La Solicitud ha sido enviado',
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