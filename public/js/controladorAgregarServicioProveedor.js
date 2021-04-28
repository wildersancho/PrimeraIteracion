'use strict';


const botonAgregar = document.querySelector('#btn-agregar');
const input_codigo = document.querySelector('#codigoServicio');
const input_nombre = document.querySelector('#nombreServicio');
const input_tipo_mascota = document.querySelector('#tipoMascota');
const input_precio = document.querySelector('#precioServicio');



const obtenerDatos = () => {
    let codigoServicio = input_codigo.value;
    let nombreServicio = input_nombre.value;
    let tipoMascota = input_tipo_mascota.value;
    let precio = input_precio.value;



    registrar_Servicio_Proveedor(codigoServicio, nombreServicio, tipoMascota, precio);


};

const validar = () => {

    let error = false;
    let expNum = /^[0-9]+$/;

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

    if (expNum.test(input_codigo.value) == false) {
        error = true;
        input_codigo.classList.add('error-input');
    } else {
        error = false;
        input_codigo.classList.remove('error-input');
    };
    if (expNum.test(input_precio.value) == false) {
        error = true;
        input_precio.classList.add('error-input');
    } else {
        error = false;
        input_precio.classList.remove('error-input');
    };
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
    input_tipo_mascota.value = "";
    input_precio.value = "";

}


botonAgregar.addEventListener('click', validar);