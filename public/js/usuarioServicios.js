'use strict'


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
    console.log(lista_clientes);
    return lista_clientes;
}


const obtener_proveedores = async() => {
    let lista_proveedores = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-proveedores',
        responseType: 'json',
    }).then((response) => {
        lista_proveedores = response.data.lista_proveedores;
    }).catch((response) => {
        console.log(response.data.err);
    });
    console.log(lista_proveedores);
    return lista_proveedores;
}