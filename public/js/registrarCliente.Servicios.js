const registrarClientes = async(tipo_ID, num_ID, correo, usuario, nombre, fechaEdad, num_edad, cant_mascotas, foto_perfil) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-clientes',
        responseType: 'json',
        data: {
            tipo_ID: tipo_ID,
            num_ID: num_ID,
            correo: correo,
            usuario: usuario,
            nombre: nombre,
            fechaEdad: fechaEdad,
            num_edad: num_edad,
            cant_mascotas: cant_mascotas,
            foto_perfil: foto_perfil,
            estado_cuenta: 'Pending',
            FechaReg: new Date()
        }

    }).then((response) => {
        Swal.fire(
            'Excelente!',
            'Por favor revise su correo para la contraseña temporal',
            'success'

        ).then(function() {
            location.reload();
        });
    }).catch((response) => {
        console.log("No se pudo procesar su request");


    }).then(() => {});
};

const listarClientes = async() => {
    let arregloMascota = [];

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-clientes',
        responseType: 'json',
    }).then((response) => {
        arregloMascota = response.data.lista_clientes;
        //lista_usuarios se encuentra declarada en el route de get
    }).catch((response) => {
        console.log(response.data.err);
    })
    return arregloMascota;
}

const eliminarCampos = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-cliente',
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then(() => {
        listarClientes();
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
        url_dinamico = "http://localhost:3000/api/habilitar-cliente";
    } else {
        url_dinamico = "http://localhost:3000/api/deshabilitar-cliente";
    }
    await axios({
        method: 'put',
        url: url_dinamico,
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        listarClientes();
    }).then(() => { location.reload(); }).catch((response) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido eliminar la mascota',
        })
    }).then(() => {});

}


const modificar_cliente = async(_id, nombre, usuario, correo, num_edad, num_ID, cant_mascotas) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-cliente',
        responseType: 'json',
        data: {
            _id: _id,
            nombre: nombre,
            usuario: usuario,
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