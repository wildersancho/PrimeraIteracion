'use strict';

const obtener_usuarios = async() => {
    let lista_usuarios = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-usuarios',
        responseType: 'json',
    }).then((response) => {
        lista_usuarios = response.data.lista_usuarios;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return lista_usuarios;
}