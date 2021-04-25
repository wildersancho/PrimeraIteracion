const mostrarPerfil = async(usuario) => {
    let lista_servicios = []
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/perfil',
        responseType: 'json',
        params: {
            usuario: usuario
        }
    }).then((response) => {
        lista_servicios = response.data.lista_servicios;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return lista_servicios;
}


const modificarPerfil = async(usuario, nombre, correo, num_edad, num_ID, cant_mascotas) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-perfil',
        responseType: 'json',
        data: {
            usuario: usuario,
            nombre: nombre,
            correo: correo,
            num_edad: num_edad,
            num_ID: num_ID,
            cant_mascotas: cant_mascotas
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su usuario ha sido actualizado',
            'text': response.msj
        }).then(() => {
            listarMascotas();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};