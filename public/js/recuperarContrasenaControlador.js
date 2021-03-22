const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const boton = document.querySelector('#button-enviar')

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {

        case "password":
            validarCampo(expresiones.password, e.target, 'password');

            break;

        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;

    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');

        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');

        campos[campo] = false;
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
    input.addEventListener('click', validarFormulario)
});


formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos');
    if (campos.password && campos.telefono && terminos.checked) {
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});

























// 'use strict';
// let type = 'ninguno';
// //let respuesta;
// const inputCorreo = document.querySelector('#txtCorreo');
// const botonRestablecer = document.querySelector('#btnRestablecer');

// botonRestablecer.addEventListener('click', recuperarContra);


// function recuperarContra() {
//     let error = false;
//     let correo = inputCorreo.value;


//     error = validarCorreo(correo);
//     if (error == true) {
//         swal.fire({
//             title: 'Recuperación incorrecta',
//             text: 'Por favor revise los campos en rojo',
//             type: 'warning',
//             confirmButtonText: 'Entendido'
//         });
//     } else {
//         if (type == 'cliente') {} else if (type == 'proveedor') {} else if (type == 'ninguno') {
//             swal.fire({
//                 title: 'Recuperación incorrecta',
//                 text: 'El correo no existe en nuestro sistema, por favor revise la información ingresada o registre una cuenta nueva',
//                 type: 'warning',
//                 confirmButtonText: 'Entendido'
//             });
//         }
//     }
// }


// function validarCorreo(pCorreo) {
//     let error = false;

//     if (pCorreo == '') {
//         error = true;
//         inputCorreo.classList.add('errorInput');
//     } else {
//         inputCorreo.classList.remove('errorInput');
//     }
//     return error;
// };