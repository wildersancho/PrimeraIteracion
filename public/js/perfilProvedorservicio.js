const mostrarPerfilP = async(usuario) => {
    let lista_datos = []
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/perfilProv',
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


const mostrarPerfilP2 = async(Proveedor) => {
    let lista_datos_2 = []
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-serviciosp2',
        responseType: 'json',
        params: {
            Proveedor: Proveedor
        }
    }).then((response) => {
        lista_datos_2 = response.data.lista_servicios_proveedor_2;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return lista_datos_2;

}