const registrarMascotas = async(usuario, tipoMascota, nombreMascota, Raza, Padecimientos, Vacunas, FotoMascota, Numero, Comentario) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-mascota',
        responseType: 'json',
        data: {
            usuario: usuario,
            tipoMascota: tipoMascota,
            nombreMascota: nombreMascota,
            Raza: Raza,
            Padecimientos: Padecimientos,
            Vacunas: Vacunas,
            FotoMascota: FotoMascota,
            Numero: Numero,
            Comentario: Comentario,
            fechaRegistro: new Date()
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



const listarMascotasAdmin = async() => {
    let arregloMascota = [];

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-mascotasAdmin',
        responseType: 'json',
    }).then((response) => {
        arregloMascota = response.data.lista_mascota;

        //lista_usuarios se encuentra declarada en el route de get
    }).catch((response) => {
        console.log(response.data.err);
    })
    return arregloMascota;
}


const listarMascotas = async(usuario) => {
    let arregloMascota = [];

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-mascotas',
        responseType: 'json',
        params: {
            usuario: usuario
        }
    }).then((response) => {
        arregloMascota = response.data.lista_mascota;
        //lista_usuarios se encuentra declarada en el route de get
    }).catch((response) => {
        console.log(response.data.err);
    })
    return arregloMascota;
}


const eliminarCampos = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-mascota',
        responseType: 'json',
        data: {
            _id: _id
        }

    }).then(() => {
        listarMascotas();
    }).then(() => { location.reload(); }).catch((response) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido eliminar la mascota',
        })

    }).then(() => {});
};


const modificar_mascota = async(_id, nombreMascota, Numero, Raza, Padecimientos, Vacunas) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-mascotas',
        responseType: 'json',
        data: {
            _id: _id,
            nombreMascota: nombreMascota,
            Numero: Numero,
            Raza: Raza,
            Padecimientos: Padecimientos,
            Vacunas: Vacunas
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su medio de contacto ha sido actualizado',
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