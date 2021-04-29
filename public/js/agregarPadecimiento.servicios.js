'use strict';

const registrar_padecimiento = async(nombrePadecimiento) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-padecimiento',
        responseType: 'json',
        data: {

            nombrePadecimiento: nombrePadecimiento,

        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El padecimiento ha sido enviado',
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
const obtener_padecimientos = async() => {
    let lista_padecimientos = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-padecimientos',
        responseType: 'json'
    }).then((response) => {
        lista_padecimientos = response.data.lista_padecimientos;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err)
    });
    return lista_padecimientos;
};

const modificar_padecimiento = async(_id, nombrePadecimiento) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-padecimiento',
        responseType: 'json',
        data: {
            _id: _id,

            nombrePadecimiento: nombrePadecimiento,

        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El padecimiento ha sido modificado',
            'text': response.msj
        }).then(() => {
            mostrar_padecimientos();
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

const eliminar_padecimiento = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-padecimiento',
        responseType: 'json',
        data: {
            _id: _id,
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El padecimiento ha sido eliminado',
            'text': response.msj
        }).then(() => {
            mostrar_padecimientos();
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