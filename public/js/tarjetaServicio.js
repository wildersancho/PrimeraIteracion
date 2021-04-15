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
        }).then(() => {});
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};