const listarProveedores = async() => {
    let arregloProveedor = [];

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-proveedores',
        responseType: 'json',
    }).then((response) => {
        arregloProveedor = response.data.lista_proveedores;

        //lista_usuarios se encuentra declarada en el route de get
    }).catch((response) => {
        console.log(response.data.err);
    })
    return arregloProveedor;
}