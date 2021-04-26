'use strict';

const mostrarPerfil = async(usuario) => {
    let lista_datos = []
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/perfil',
        responseType: 'json',
        params: {
            usuario: usuario
        }
    }).then((response) => {
        lista_datos = response.data.lista_clientes;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return lista_datos;
}


const modificarPerfil = async(usuario, nombre, num_ID, num_edad, correo) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-perfil',
        responseType: 'json',
        params: {
            usuario: usuario
        },
        data: {
            usuario: usuario,
            nombre: nombre,
            num_ID: num_ID,
            num_edad: num_edad,
            correo: correo
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su usuario ha sido actualizado',
            'text': response.msj
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};



const cambiarFoto = async(usuario, foto_perfil) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-perfil',
        responseType: 'json',
        params: {
            usuario: usuario
        },
        data: {

            foto_perfil: foto_perfil
        },
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su foto de perfil se ha cambiado',
            'text': response.msj
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};