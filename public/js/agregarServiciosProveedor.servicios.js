'use strict';

const registrar_Servicio_Proveedor = async(codigoServicio, nombreServicio, tipoMascota, precio) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-servicio-proveedor',
        responseType: 'json',
        data: {
            codigoServicio: codigoServicio,
            nombreServicio: nombreServicio,
            tipoMascota: tipoMascota,
            precio: precio

        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El servicio ha sido enviado',
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
const obtener_servicios_proveedor = async() => {
    let lista_servicios_proveedor = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-servicios-proveedor',
        responseType: 'json'
    }).then((response) => {
        lista_servicios_proveedor = response.data.lista_servicios_proveedor;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err)
    });
    return lista_servicios_proveedor;
};

const modificar_servicio_proveedor = async(_id, codigoServicio, nombreServicio, tipoMascota, precio) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-servicio-proveedor',
        responseType: 'json',
        data: {
            _id: _id,
            codigoServicio: codigoServicio,
            nombreServicio: nombreServicio,
            tipoMascota: tipoMascota,
            precio: precio

        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El Servicio ha sido modificado',
            'text': response.msj
        }).then(() => {
            mostrar_servicios_proveedor();
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

const eliminar_servicio_proveedor = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-servicio-proveedor',
        responseType: 'json',
        data: {
            _id: _id,
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El servicio ha sido eliminado',
            'text': response.msj
        }).then(() => {
            mostrar_servicios_proveedor();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': response.msj,
        })
    });
    //en data a la izquierda van las llaves y a la derecha el valor (el parametro que recibimos.)
};