'use strict';

const registrar_Servicio = async(nombreServicio) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-servicio_1',
        responseType: 'json',
        data: {
            nombreServicio: nombreServicio
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El servicio ha sido enviado',
            'text': response.msj
        }).then(() => {
            limpiar();
            mostrar_servicios();
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
const obtener_servicios = async() => {
    let lista_servicios = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-servicios_1',
        responseType: 'json'
    }).then((response) => {
        lista_servicios = response.data.lista_servicios;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err)
    });
    return lista_servicios;
};

const modificar_servicio = async(_id, nombreServicio) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-servicio_1',
        responseType: 'json',
        data: {
            _id: _id,
            nombreServicio: nombreServicio

        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El padecimiento ha sido modificado',
            'text': response.msj
        }).then(() => {
            mostrar_servicios();
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

const eliminar_servicio = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-servicio_1',
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
            mostrar_servicios();
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