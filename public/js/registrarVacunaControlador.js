'use strict';
let VacunaSel = document.getElementById('nombreVacuna');
const tipoMascotaSel = document.getElementById('tipoMascota');
const botonRegistrarVacuna = document.getElementById('message_submit');

botonRegistrarVacuna.addEventListener('click', regVacuna);


async function regVacuna() {
    let error = false;
    let Vacuna = VacunaSel.value;
    let tipoMascota = tipoMascotaSel.value;
    console.log("validando");
    error = validarVacuna(Vacuna, tipoMascota);
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
    registrar_vacuna(Vacuna, tipoMascota);
};


function validarVacuna(Vacuna, tipoMascota) {
    let error = false;
    if (Vacuna == '') {
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
    VacunaSel.value = '';
    tipoMascotaSel.value = '';
    const botonAgregar = document.getElementById('close');
    botonAgregar.click();
}