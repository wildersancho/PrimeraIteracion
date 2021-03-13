'use strict';
let type = 'ninguno';
//let respuesta;
const inputCorreo = document.querySelector('#txtCorreo');
const botonRestablecer = document.querySelector('#btnRestablecer');

botonRestablecer.addEventListener('click', recuperarContra);


function recuperarContra() {
    let error = false;
    let correo = inputCorreo.value;


    error = validarCorreo(correo);
    if (error == true) {
        swal.fire({
            title: 'Recuperación incorrecta',
            text: 'Por favor revise los campos en rojo',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        if (type == 'cliente') {} else if (type == 'proveedor') {} else if (type == 'ninguno') {
            swal.fire({
                title: 'Recuperación incorrecta',
                text: 'El correo no existe en nuestro sistema, por favor revise la información ingresada o registre una cuenta nueva',
                type: 'warning',
                confirmButtonText: 'Entendido'
            });
        }
    }
}


function validarCorreo(pCorreo) {
    let error = false;

    if (pCorreo == '') {
        error = true;
        inputCorreo.classList.add('errorInput');
    } else {
        inputCorreo.classList.remove('errorInput');
    }
    return error;
};