'use strict';


const botonAgregar = document.querySelector('#btn-agregar');

const input_nombre = document.querySelector('#nombrePadecimiento');








const obtenerDatos = () => {

    let nombrePadecimiento = input_nombre.value;



    registrar_padecimiento(nombrePadecimiento);


};


const validar = () => {
    // let expNum = /^([0-9])*$/;
    let error = false;


    // let campos_requeridos = document.querySelectorAll(':required');
    // campos_requeridos.forEach(campo => {
    //     //validar vacio
    //     if (campo.value == '') {
    //         error = true;
    //         campo.classList.add('error-input');
    //     } else {
    //         campo.classList.remove('error-input');
    //     }
    // });
    // if (expNum.test(input_codigo.value) == false) {
    //     error = true;
    //     input_codigo.classList.add('error-input');
    // } else {
    //     error = false;
    //     input_codigo.classList.remove('error-input');
    // }

    if (error == false) {
        obtenerDatos();
    } else {
        Swal.fire({
            'icon': 'warning', //'success', //'error' //'warning'
            'title': 'No se pudo enviar su mensaje',
            'text': 'Por favor revise los campos resaltados'
        });
    }
}
const limpiar = () => {
    //.value permite tanto obtener el valor como asignarlo

    input_nombre.value = "";

}

botonAgregar.addEventListener('click', validar);