'use strict';
//Datos de section de Proveedor
let selecttipoIDProveedor = document.querySelector('#txtTipoIDProveedor');
let inputidentificacionProveedor = document.querySelector('#txtIdentificacionProveedor');
let inputemail = document.querySelector('#txtEmail');
let inputnombreUsuario = document.querySelector('#txtNombreUsuario');
let inputnombreProveedor = document.querySelector('#txtNombreProveedor');
let inputsegundoNombreProveedor = document.querySelector('#txtSegundoNombreProveedor');
let inputprimerApellidoProveedor = document.querySelector('#txtPrimerApellidoProveedor');
let inputsegundoApellidoProveedor = document.querySelector('#txtSegundoApellidoProveedor');
let inputfechaProveedor = document.querySelector('#txtFechaProveedor');
let inputedadProveedor = document.querySelector('#txtEdadProveedor');
let inputcantidadServicios = document.querySelector('#txtCantidadServicios');
let inputProvincia = document.querySelector('#id-provincia');
let inputCanton = document.querySelector('#id-canton');
let inputDistrito = document.querySelector('#id-distrito');
let inputDireccion = document.querySelector('#id-direccion');

var inputradios = document.querySelector('#registroServicio'); /** */
let inputRadioButton = document.querySelectorAll('input[name="rbtServicio"]') /**/
var img_perfil = document.getElementById("img-perfil");

let accion = 'Registrar';
let fecha = new Date().toLocaleString();
let botonRegistrarProveedor = document.querySelector('#btnRegistrarProveedor');


async function obtenerDatosProveedor() {
    let error = false;
    let tipoIDProveedor = selecttipoIDProveedor.value;
    let identificacionProveedor = inputidentificacionProveedor.value;
    let nombreUsuario = inputnombreUsuario.value;
    let nombreProveedor = inputnombreProveedor.value;
    let segundoNombreProveedor = inputsegundoNombreProveedor.value;
    let primerApellidoProveedor = inputprimerApellidoProveedor.value;
    let segundoApellidoProveedor = inputsegundoApellidoProveedor.value;
    let email = inputemail.value;
    let fechaSinFormato = new Date(inputfechaProveedor.value);
    let fechaProveedorSplit = inputfechaProveedor.value.split("-");
    let fechaProveedor = fechaProveedorSplit[2] + '/' + fechaProveedorSplit[1] + '/' + fechaProveedorSplit[0];
    let edadProveedor = Number(inputedadProveedor.value);
    let cantidadServicios = Number(inputcantidadServicios.value);
    let provincia = inputProvincia.value;
    let canton = inputCanton.value;
    let distrito = inputDistrito.value;
    let direccion = inputDireccion.value;

    error = validarProveedor(nombreUsuario, tipoIDProveedor, identificacionProveedor, nombreProveedor, primerApellidoProveedor, email, fechaSinFormato, edadProveedor, cantidadServicios, inputRadioButton, provincia, canton, distrito, direccion);
    let nombre = nombreProveedor + " " + segundoNombreProveedor + " " + primerApellidoProveedor + " " + segundoApellidoProveedor;
    let foto_perfil = "pending";

    if (error == true) {
        swal.fire({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar su cuenta, revise los campos en rojo',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        //Validar usuario ya registrado
        let usuarioRepetido = false;
        if (usuarioRepetido) {
            inputnombreUsuario.classList.add('errorInput');
            swal.fire({
                title: 'Nombre de usuario ya registrado',
                text: 'Por favor escoger un nombre de usuario diferente',
                icon: 'warning',
                confirmButtonText: 'Entendido'
            });
        } else {
            inputnombreUsuario.classList.remove('errorInput');
            let emailRepetido = false;
            if (emailRepetido) {} else {
                inputemail.classList.remove('errorInput');
                if (error == false) {
                    let estado_cuenta = 'Pendiente';

                    registrarProveedores(tipoIDProveedor, identificacionProveedor, email, nombreUsuario, nombre, fechaSinFormato, edadProveedor, cantidadServicios, foto_perfil, estado_cuenta, provincia, canton, distrito, direccion);
                }

            }
        }
    }

};


function validarProveedor(pnombreUsuario, ptipoIDProveedor, pidentificacionProveedor, pnombreProveedor, pprimerApellidoProveedor, pemail, pfechaProveedor, pedadProveedor, pcantidadServicios, pinputRadioButton, provincia, canton, distrito, direccion) {
    let error = false;
    let expLetras = /^[a-z A-ZáéíóúñÑÁÉÍÓÚüÜ]+$/;
    let regExpNumeros = /^[0-9]+$/;
    let regExpAlfanumericos = /^[a-z]+$/;
    let expCorreo = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    console.log("validando");

    if (pnombreUsuario == '') {
        error = true;
        inputnombreUsuario.classList.add('errorInput');
    } else {
        inputnombreUsuario.classList.remove('errorInput');
    }

    if (pnombreProveedor == '' || expLetras.test(pnombreProveedor) == false) {
        error = true;
        inputnombreProveedor.classList.add('errorInput');
    } else {
        inputnombreProveedor.classList.remove('errorInput');
    }

    if (pidentificacionProveedor == '' || regExpNumeros.test(pidentificacionProveedor) == false) {
        error = true;
        inputidentificacionProveedor.classList.add('errorInput');
    } else {
        if ((ptipoIDProveedor == 'Cédula de Identidad' && (pidentificacionProveedor.length == 9 || pidentificacionProveedor.length == 10) && regExpNumeros.test(pidentificacionProveedor) == true)) {
            inputidentificacionProveedor.classList.remove('errorInput');
        } else if (ptipoIDProveedor != 'Cédula de Identidad' && regExpAlfanumericos.test(pidentificacionProveedor) == true) {
            inputidentificacionProveedor.classList.remove('errorInput');
        } else {
            inputidentificacionProveedor.classList.add('errorInput');
        }
    }

    if (provincia == '' || expLetras.test(provincia) == false) {
        error = true;
        inputProvincia.classList.add('errorInput');
    } else {
        inputProvincia.classList.remove('errorInput');
    }




    if (canton == '' || expLetras.test(canton) == false) {
        error = true;
        inputCanton.classList.add('errorInput');
    } else {
        inputCanton.classList.remove('errorInput');
    }



    if (distrito == '' || expLetras.test(distrito) == false) {
        error = true;
        inputDistrito.classList.add('errorInput');
    } else {
        inputDistrito.classList.remove('errorInput');
    }





    if (direccion == '' || expLetras.test(direccion) == false) {
        error = true;
        inputDireccion.classList.add('errorInput');
    } else {
        inputDireccion.classList.remove('errorInput');
    }



    if (pprimerApellidoProveedor == '' || expLetras.test(pprimerApellidoProveedor) == false) {
        error = true;
        inputprimerApellidoProveedor.classList.add('errorInput');
    } else {
        inputprimerApellidoProveedor.classList.remove('errorInput');
    }

    if (pemail == '' || expCorreo.test(pemail) == false) {
        error = true;
        inputemail.classList.add('errorInput');
    } else {
        inputemail.classList.remove('errorInput');
    }

    if (pfechaProveedor == 'Invalid Date') {
        error = true;
        inputfechaProveedor.classList.add('errorInput');
    } else {
        inputfechaProveedor.classList.remove('errorInput');
    }

    if (pedadProveedor == '' || pedadProveedor < inputedadProveedor.min || pedadProveedor > inputedadProveedor.max || regExpNumeros.test(inputedadProveedor.value) == false) {
        error = true;
        inputedadProveedor.classList.add('errorInput');
    } else {
        inputedadProveedor.classList.remove('errorInput');
    }

    if (pcantidadServicios < 1) {
        error = true;
        inputcantidadServicios.classList.add('errorInput');
    } else {
        inputcantidadServicios.classList.remove('errorInput');
    }

    for (const rb of pinputRadioButton) {
        if (rb.checked) {
            inputradios.classList.remove('errorInput');
            break;
        } else {
            error = true;
            inputradios.classList.add('errorInput');
            console.log(inputradios.value)
        }
    }

    return error;
};



function calcularEdad() {
    let fechaActual = new Date(); /**Obtener la fecha actual */
    let fechaIngresada = new Date(inputfechaProveedor.value);

    let edad = fechaActual.getFullYear() - fechaIngresada.getFullYear(); /*Obtener la edad*/
    console.log('Haciendo fecha');
    inputedadProveedor.value = edad;
}

$("#radio1").click(function() {
    $('#registroServicio').html('');
    $('#registroServicio').append(' <a href="registrarServicios.html">Registrar Servicio</a>');
});

$("#radio2").click(function() {
    $('#registroServicio').html('');
});

botonRegistrarProveedor.addEventListener('click', obtenerDatosProveedor);
inputfechaProveedor.addEventListener('change', calcularEdad);

const mostrar_servicios = async() => {
    let lista_servicios = await obtener_servicios_2();
    let contador = 0;
    lista_servicios.forEach((servicio) => {
        document.getElementById('radioServ').innerHTML += `<div>
        <input type="radio" class="input-radio" name="rbtServicio" value="${servicio.nombreServicio}">
        <label for="label-tipoServicio" class="label-radio1" value="${contador}">${servicio.nombreServicio}</label>
    </div>`;
        contador++;
    })
}
const obtener_servicios_2 = async() => {
    let lista_servicios = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-servicios_1',
        responseType: 'json'
    }).then((response) => {
        lista_servicios = response.data.lista_servicios;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err)
    });
    return lista_servicios;
};

mostrar_servicios();