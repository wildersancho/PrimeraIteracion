'use strict';
let botonRegistrarRaza = document.getElementById('message_submit');

function regRaza() {
    let raza = document.getElementById('nombreRaza').value;
    let tipoMascota = document.getElementById('tipoMascota').value;
    console.log("validando");
    error = validarRaza(raza, tipoMascota);
    if (error == true) {
        swal.fire({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar su cuenta, revise los campos en rojo',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        alert("test");
        swal.fire({
            title: 'Registro correcto',
            text: 'No se pudo registrar su cuenta, revise los campos en rojo',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    }
    alert("test");
    registrar_raza(raza, tipoMascota);
}


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

botonRegistrarRaza.addEventListener('click', regRaza);