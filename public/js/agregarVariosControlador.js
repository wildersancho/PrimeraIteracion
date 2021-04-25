'use strict';


const botonAgregar = document.querySelector('#btn-agregar');
const input_codigo = document.querySelector('#codigoPadecimiento');
const input_nombre = document.querySelector('#nombrePadecimiento');








const obtenerDatos = () => {
    let codigoPadecimiento = input_codigo.value;
    let nombrePadecimiento = input_nombre.value;



    registrar_padecimiento(codigoPadecimiento, nombrePadecimiento);


};


const validar = () => {

    let error = false;


    let campos_requeridos = document.querySelectorAll(':required');
    campos_requeridos.forEach(campo => {
        //validar vacio
        if (campo.value == '') {
            error = true;
            campo.classList.add('error-input');
        } else {
            campo.classList.remove('error-input');
        }
    });


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
    input_codigo.value = "";
    input_nombre.value = "";

}

botonAgregar.addEventListener('click', validar);