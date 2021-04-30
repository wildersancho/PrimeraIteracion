'use strict';

const registrar_vacuna = async(vacuna, tipoMascota) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-vacuna',
        responseType: 'json',
        data: {
            vacuna: vacuna,
            tipoMascota: tipoMascota
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su mensaje ha sido enviado',
            'text': response.msj
        }).then(() => {
            location.reload();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};



const obtener_vacunas = async() => {
    let lista_vacunas = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-vacunas',
        responseType: 'json',
    }).then((response) => {
        lista_vacunas = response.data.lista_vacunas;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return lista_vacunas;
}


const eliminar_vacuna = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-vacuna',
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'title': 'La vacuna ha sido eliminada',
            'icon': 'success',
            'text': response.msj
        }).then(() => {
            mostrar_vacunas();
        });
    }).catch((response) => {
        Swal.fire({
            'title': response.msj,
            'icon': 'error',
            'text': response.err
        })
    });
};