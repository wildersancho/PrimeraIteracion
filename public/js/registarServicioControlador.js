'use strict';
//Datos de section de cliente
let inputnombreUsuario = document.querySelector('#txtNombreUsuario');
let inputnombreProveedor = document.querySelector('#txtNombreProveedor');
let inputfechaCliente = document.querySelector('#FechaServicio');
let input_tel = document.querySelector('#TelContacto');
let inputProvincia = document.querySelector('#id-provincia');
let inputCanton = document.querySelector('#id-canton');
let inputDistrito = document.querySelector('#id-distrito');
let inputObservaciones = document.querySelector('#observaciones');
var inputradios = document.querySelector('#label-tipoServicio');
var selectMascota = document.querySelector('#nombreMascota');
let accion = 'Registrar';
let botonRegistrarCliente = document.querySelector('#btnRegistrarServicio');


botonRegistrarCliente.addEventListener('click', obtenerDatosServicio);

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

//let userName = "wsanchor";
//window.localStorage.setItem('user', userName);
let usuario = window.localStorage.getItem('user');

let provName = "Patitos";;
window.localStorage.setItem('provName', provName);
let proveedor = window.localStorage.getItem('provName');

$(inputnombreUsuario).val(usuario)
$(inputnombreProveedor).val(proveedor)

async function obtenerDatosServicio() {
    let servicio = '';
    let radios = document.getElementsByName('rbtServicio');
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            servicio = radios[i].value;
            break;
        }
    }
    let error = false;
    let nombreMascota = selectMascota.value;
    usuario = inputnombreUsuario.value;
    let nombreProveedor = inputnombreProveedor.value;
    let tel = input_tel.value;
    let Provincia = inputProvincia.value;
    let Canton = inputCanton.value;
    let Distrito = inputDistrito.value;
    let Observaciones = inputObservaciones.value;
    let fecha = inputfechaCliente.value;
    let inputRadioButton = document.querySelectorAll('input[name="rbtServicio"]')

    error = validarCliente(usuario, tel, Provincia, Canton, Distrito, fecha, inputRadioButton);

    if (error == true) {
        swal.fire({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar su cuenta, revise los campos en rojo',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        console.log(usuario);
        console.log(tel);
        console.log(Provincia);
        console.log(Canton);
        console.log(Distrito);
        console.log(servicio);
        console.log(nombreMascota);
        console.log(Observaciones);
        console.log(fecha);
        registrar_servicio(usuario, nombreProveedor, tel, Provincia, Canton, Distrito, servicio, nombreMascota, Observaciones, fecha);
        if (error == false) {
            swal.fire({
                title: 'Registro correcto',
                icon: 'success',
                showConfirmButton: false
            });

        } else {
            swal.fire({
                title: 'Registro incorrecto',
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
        }

    }
};


function validarCliente(pnombreUsuario, ptel, pProvincia, pCanton, pDistrito, pfechaCliente, pinputRadioButton) {
    let error = false;
    let expTel = /^[0-9]{8}$/;
    console.log("validando");

    if (pnombreUsuario == '') {
        error = true;
        inputnombreUsuario.classList.add('errorInput');
        console.log("error usuario");
    } else {
        inputnombreUsuario.classList.remove('errorInput');
    }
    if (ptel == '' || expTel.test(ptel) == false) {
        error = true;
        input_tel.classList.add('errorInput');
        console.log("error telefono");
    } else {
        input_tel.classList.remove('errorInput');
    }
    if (pfechaCliente == '') {
        error = true;
        inputfechaCliente.classList.add('errorInput');
        console.log("error fecha");
    } else {
        inputfechaCliente.classList.remove('errorInput');
    }
    if (pProvincia == 'Provincia') {
        error = true;
        inputProvincia.classList.add('errorInput');
        console.log("error Provincia");
    } else {
        inputProvincia.classList.remove('errorInput');
    }
    if (pCanton == 'Cantón') {
        error = true;
        inputCanton.classList.add('errorInput');
        console.log("error Canton");
    } else {
        inputCanton.classList.remove('errorInput');
    }
    if (pDistrito == 'Distrito') {
        error = true;
        inputDistrito.classList.add('errorInput');
        console.log("error Distrito");
    } else {
        inputDistrito.classList.remove('errorInput');
    }
    for (const rb of pinputRadioButton) {
        if (rb.checked) {
            inputradios.classList.remove('errorInput');
            error = false;
            break;
        } else {
            error = true;
            inputradios.classList.add('errorInput');
            console.log("error Radios");
        }
    }
    return error;
};

function registrarBitacora(nombreUsuario, tel, Provincia, Canton, Distrito, fechaCliente) {
    var infoTabla = new Array();
    //Agregar elemento al arreglo:
    let nuevo_item = [nombreUsuario, tel, Provincia, Canton, Distrito, fechaCliente, 'Paseo'];
    infoTabla.push(nuevo_item);
    createCookie(nombreUsuario, infoTabla);
};

var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}


const limpiar = () => {
    inputfechaCliente.value = '';
    input_tel.value = '';
    inputProvincia.value = 'Provincia';
    inputCanton.value = 'Cantón';
    inputDistrito.value = 'Distrito';
    inputObservaciones.value = '';
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