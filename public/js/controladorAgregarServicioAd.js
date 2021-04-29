'use strict';


const botonAgregar = document.querySelector('#btn-agregar');

const input_nombre = document.querySelector('#nombreServicio');








const obtenerDatos = () => {

    let nombreServicio = input_nombre.value;



    registrar_Servicio(nombreServicio);


};


const validar = () => {

    let error = false;
    let expLetras = /^[A-Z]+$/i;



    if (expLetras.test(input_nombre.value) == false) {
        error = true;
        input_nombre.classList.add('error-input');
    } else {
        input_nombre.classList.remove('error-input');
    }
    if (input_nombre.value == '') {
        error = true;
        input_nombre.classList.add('error-input');
    } else {
        input_nombre.classList.remove('error-input');
    }




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