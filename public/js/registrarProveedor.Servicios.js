const registrarProveedores = async(tipo_ID, num_ID, correo, tipoServicio, usuario, nombre, fechaEdad, num_edad, foto_perfil, provincia, canton, distrito, direccion) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-proveedores',
        responseType: 'json',
        data: {
            tipo_ID: tipo_ID,
            num_ID: num_ID,
            correo: correo,
            tipoServicio: tipoServicio,
            usuario: usuario,
            nombre: nombre,
            fechaEdad: fechaEdad,
            num_edad: num_edad,
            foto_perfil: foto_perfil,
            estado_cuenta: "Habilitado",
            FechaReg: new Date(),
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            direccion: direccion
        }

    }).then((response) => {
        Swal.fire(
            'Excelente!',
            'Se ha agregado su listar!',
            'success'

        ).then(function() {
            location.reload();
        });
    }).catch((response) => {
        console.log("No se pudo procesar su request");


    }).then(() => {});
};


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

const eliminarCampos = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-proveedor',
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then(() => {
        listarProveedores();
    }).then(() => { location.reload(); }).catch((response) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido eliminar la mascota',
        })
    }).then(() => {});
};


const cambiarEstado = async(_id, es_activar) => {
    let url_dinamico = '';
    if (es_activar) {
        url_dinamico = "http://localhost:3000/api/habilitar-proveedor";
    } else {
        url_dinamico = "http://localhost:3000/api/deshabilitar-proveedor";
    }
    await axios({
        method: 'put',
        url: url_dinamico,
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        listarProveedores();
    }).then(() => { location.reload(); }).catch((response) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido eliminar la mascota',
        })
    }).then(() => {});

}
const responderSolicitud = async(_id, es_activar) => {
    let url_dinamico = '';
    if (es_activar) {
        url_dinamico = "http://localhost:3000/api/aprobar-proveedor";
    } else {
        url_dinamico = "http://localhost:3000/api/rechazar-proveedor";
    }
    await axios({
        method: 'put',
        url: url_dinamico,
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        listarProveedores();
    }).then(() => { location.reload(); }).catch((response) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido eliminar la mascota',
        })
    }).then(() => {});

}


const modificar_proveedor = async(_id, nombre, usuario, correo, num_edad, num_ID, cant_servicios, provincia, canton, distrito, direccion) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-proveedor',
        responseType: 'json',
        data: {
            _id: _id,
            nombre: nombre,
            usuario: usuario,
            correo: correo,
            num_edad: num_edad,
            num_ID: num_ID,
            cant_servicios: cant_servicios,
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            direccion: direccion
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su usuario ha sido actualizado',
            'text': response.msj
        }).then(() => {
            listarServicios();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};