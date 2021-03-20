///////////////////////////////////////////////////////////////////////////////////////////////////
// Validacion Correo:                                                                            //
///////////////////////////////////////////////////////////////////////////////////////////////////

let botonProveedor = document.querySelector('.botton-crear');
let correoProveedor = document.querySelector('.id-email');

function validarCampos() {

    let regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    let testCorreo = regexMail.test(correoProveedor.value);

    console.log(testCorreo);

    if (testCorreo == false) {
        correoProveedor.className = ' required';
    }

}

botonProveedor.addEventListener('click', validarCampos);

//Google map API
function initMap() {
    let map;
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 9.918532, lng: -84.108204 },
        zoom: 10,
    });
}