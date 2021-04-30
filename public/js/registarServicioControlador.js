'use strict';
//Datos de section de cliente
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
let inputFirstSection = document.querySelector('#firstSection')


botonRegistrarCliente.addEventListener('click', obtenerDatosServicio);
let usuario = window.localStorage.getItem('user');
let proveedor = window.localStorage.getItem('provName');

/*const mostrar_servicios = async() => {
    let lista_servicios = await obtener_servicios_2(proveedor);
    let contador = 0;
    lista_servicios.forEach((servicio) => {
        console.log(servicio.servicio);
        document.getElementById('id-tipoServicio').innerHTML = `
        <option value="Guarderia">${servicio.servicio}</option>`;
        contador++;
    })
}*/

inputFirstSection.innerHTML = `<div>
<label for="txtNombreUsuario" id="nombreUsuario">Nombre de Usuario</label>
<input type="text" id="txtNombreUsuario" required value="${usuario}" readonly>
</div><div>
<label for="txtNombreProveedor" id="nombreProveedor">Nombre de Proveedor</label>
<input type="text" id="txtNombreProveedor" required value="${proveedor}" readonly>
</div>`

let inputnombreUsuario = document.querySelector('#txtNombreUsuario');
let inputnombreProveedor = document.querySelector('#txtNombreProveedor');



const obtener_servicios_2 = async(usuario) => {
    let lista_servicios = []
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-servicios',
        responseType: 'json',
        params: {
            usuario: usuario
        }
    }).then((response) => {
        lista_servicios = response.data.lista_servicios;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return lista_servicios;
}

let select_servicio = document.getElementById('id-tipoServicio');


async function cambiarServicio() {
    let lista_servicios = await obtener_servicios_2(proveedor);
    var arrServicios = new Array(100);
    console.log(lista_servicios);
    lista_servicios.forEach((servicio) => {
        arrServicios.push(servicio.servicio);
        var option = document.createElement('option');
        option.text = servicio.servicio;
        select_servicio.add(option)

    });

    return select_servicio;
}

cambiarServicio();

async function obtenerDatosServicio() {
    let servicio = select_servicio.value;
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
        registrar_solicitud_servicio(usuario, nombreProveedor, tel, Provincia, Canton, Distrito, servicio, nombreMascota, Observaciones, fecha);
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

/*function registrarBitacora(nombreUsuario, tel, Provincia, Canton, Distrito, fechaCliente) {
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
}*/


const limpiar = () => {
    inputfechaCliente.value = '';
    input_tel.value = '';
    inputProvincia.value = 'Provincia';
    inputCanton.value = 'Cantón';
    inputDistrito.value = 'Distrito';
    inputObservaciones.value = '';
}