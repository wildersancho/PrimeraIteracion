'use strict';

const registrar_raza = async(raza, tipoMascota) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-raza',
        responseType: 'json',
        data: {
            raza: raza,
            tipoMascota: tipoMascota
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

const obtener_razas = async() => {
    let lista_razas = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-razas',
        responseType: 'json',
    }).then((response) => {
        lista_razas = response.data.lista_razas;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return lista_razas;
}