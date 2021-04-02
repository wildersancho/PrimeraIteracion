'use strict';

const registrar_cliente = async(tipoIDCliente, identificacionCliente, nombreUsuario, nombreCliente, segundoNombreCliente, primerApellidoCliente, segundoApellidoCliente, email, edadCliente, cantidadMascotas) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-cliente',
        responseType: 'json',
        data: {
            tipoIDCliente: tipoIDCliente,
            identificacionCliente: identificacionCliente,
            nombreUsuario: nombreUsuario,
            nombreCliente: nombreCliente,
            segundoNombreCliente: segundoNombreCliente,
            primerApellidoCliente: primerApellidoCliente,
            segundoApellidoCliente: segundoApellidoCliente,
            email: email,
            edadCliente: edadCliente,
            cantidadMascotas: cantidadMascotas
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

const obtener_clientes = async() => {
    let lista_clientes = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-clientes',
        responseType: 'json',
    }).then((response) => {
        lista_clientes = response.data.lista_clientes;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return lista_clientes;
}