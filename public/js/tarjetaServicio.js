const registrar_tarjeta = async(usuario, tarjeta, nombreTarjeta, fechaTarjeta, numeroCode, tipoTarjeta) => {
    console.log(usuario);
    console.log(tarjeta);
    console.log(nombreTarjeta);
    console.log(fechaTarjeta);
    console.log(numeroCode);
    console.log(tipoTarjeta);
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-tarjeta',
        responseType: 'json',
        data: {
            usuario: usuario,
            tarjeta: tarjeta,
            numeroTarjeta: tarjeta,
            nombreTarjeta: nombreTarjeta,
            fechaTarjeta: fechaTarjeta,
            codSeguridad: numeroCode,
            tipoTarjeta: tipoTarjeta
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su tarjeta ha sido registrada',
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

const obtener_tarjetas = async(usuario) => {
    let lista_tarjetas = []
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-tarjetas2',
        responseType: 'json',
        params: {
            usuario: usuario
        }
    }).then((response) => {
        lista_tarjetas = response.data.lista_tarjetas;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return lista_tarjetas;
}


const eliminar_tarjeta = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-tarjeta',
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'title': 'La tarjeta ha sido eliminada',
            'icon': 'success',
            'text': response.msj
        }).then(() => {
            mostrar_tarjetas();
        });
    }).catch((response) => {
        Swal.fire({
            'title': response.msj,
            'icon': 'error',
            'text': response.err
        })
    });
};