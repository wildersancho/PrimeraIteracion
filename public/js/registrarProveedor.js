///////////////////////////////////////////////////////////////////////////////////////////////////
// Validacion Correo:                                                                            //
///////////////////////////////////////////////////////////////////////////////////////////////////

let botonProveedor = document.querySelector('#botton-crear');
let correoProveedor = document.querySelector('.id-email');
let nombreUsuario = document.querySelector('#id-encargado');
let apellido = document.querySelector('#id-apellido');
let apellido2 = document.querySelector('#id-apellido2');
let phone = document.querySelector('#id-phone');
let idNegocio = document.querySelector('#id-negocio');
let idNumber = document.querySelector('#id-num');
let dirrecion = document.querySelector('.text-area');


function validarCorreo(correoProveedor) {

    let regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    let testCorreo = regexMail.test(correoProveedor.value);

    console.log(testCorreo);

    if (testCorreo == true) {
        correoProveedor.placeholder = '';
        correoProveedor.className;
        correoProveedor.style.borderColor = '';
    } else {

        correoProveedor.className = ' required';
        correoProveedor.placeholder = 'Formato incorrecto';
        correoProveedor.style.borderColor = "red";
        errorSweetAlert();
    }

}

function validacionSelect() {


    if (provincia.value == "Provincia") {
        provincia.style.borderColor = "red";
        errorSweetAlert();
    } else {
        provincia.style.borderColor = "";
    }
    if (canton.value == "Canton") {
        canton.style.borderColor = "red";
        selectDistrito.style.borderColor = "red";
        errorSweetAlert();
    } else {
        canton.style.borderColor = "";
        selectDistrito.style.borderColor = "";
    }
}





botonProveedor.addEventListener('click', function() {

    validarCorreo(correoProveedor);
    validarCampos(nombreUsuario);
    validarCampos(apellido);
    validarCampos(apellido2);
    validarCampos(phone);
    validarCampos(idNegocio);
    validarCampos(idNumber);
    validarCampos(dirrecion);
    validacionSelect();

});

//Google map API
function initMap() {
    let map;
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 9.918532, lng: -84.108204 },
        zoom: 10,
    });
}