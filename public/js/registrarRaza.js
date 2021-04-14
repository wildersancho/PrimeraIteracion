'use strict';
let razaSel = document.getElementById('nombreRaza');
const tipoMascotaSel = document.getElementById('tipoMascota');
const botonRegistrarRaza = document.getElementById('message_submit');

botonRegistrarRaza.addEventListener('click', regRaza);


async function regRaza() {
    let error = false;
    let raza = razaSel.value;
    let tipoMascota = tipoMascotaSel.value;
    console.log("validando");
    error = validarRaza(raza, tipoMascota);
    console.log(error);
    if (error == true) {
        swal.fire({
            title: 'Registro incorrecto',
            icon: 'error',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal.fire({
            title: 'Registro correcto',
            icon: 'success',
            showConfirmButton: false
        });
    }
    registrar_raza(raza, tipoMascota);
};


function validarRaza(raza, tipoMascota) {
    let error = false;
    if (raza == '') {
        error = true;
        //inputnombreUsuario.classList.add('errorInput');
    } else {
        console.log("no error")
            //inputnombreUsuario.classList.remove('errorInput');
    }
    if (tipoMascota == '') {
        error = true;
        //inputnombreUsuario.classList.add('errorInput');
    } else {
        console.log("no error");
        //inputnombreUsuario.classList.remove('errorInput');
    }
    return error;
}

const limpiar = () => {
    razaSel.value = '';
    tipoMascotaSel.value = '';
    const botonAgregar = document.getElementById('close');
    botonAgregar.click();
}