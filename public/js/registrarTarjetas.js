/*
Visa: must have 16 digits All Visa card numbers start with a 4.
^4[0-9]{12}(?:[0-9]{3})?$


MasterCard MasterCard numbers either start with the numbers 51 through 55 or with the numbers 2221 through 2720. All have 16 digits.: 
^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$

*/

let numeroTarjeta = document.querySelector(".tar-num");
let nombreTarjeta = document.querySelector(".tar-name");
let fechaTarjeta = document.querySelector(".tar-fecha");
let numeroCode = document.querySelector(".tar-code");
let tipoTarjeta = document.querySelector(".tipo-tar");
let boton = document.querySelector(".tar-botton");
let userName = "wsanchor";


//Sweetalert Popups

function errorSweetAlert() {
    Swal.fire({
        title: 'Registro incorrecto',
        text: 'No se pudo registrar su cuenta, revise los campos en rojo',
        icon: 'warning',
        confirmButtonText: 'Entendido'
    });
}

function confirmationSweetAlert() {
    Swal.fire({
        title: 'Registro correcto',
        icon: 'success',
        showConfirmButton: false
    })
}


//Validacion de la tarjeta, si es Mastercard o Visa

function validationTarjeta() {

    let regexVisa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    let regexMasterCard = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;

    var testVisa = regexVisa.test(numeroTarjeta.value);
    var testMasterCard = regexMasterCard.test(numeroTarjeta.value);

    console.log(testVisa);
    console.log(testMasterCard);

    if (testVisa == true) {
        tipoTarjeta.innerHTML = "Su tarjeta es: Visa.";
        tipoTarjeta.style.color = "Green";

    } else if (testMasterCard == true) {
        tipoTarjeta.innerHTML = "Su tarjeta es: Mastercard.";
        tipoTarjeta.style.color = "Blue";
    } else {
        tipoTarjeta.innerHTML = "Su tarjeta es de otra empresa o no es valida.";
        tipoTarjeta.style.color = "Red";
        numeroTarjeta.className = ' required';
        errorSweetAlert();
    }
}


//Validar los campos si estan vacios o no
function validarCampos(campoValidar) {

    if (campoValidar.value === "") {
        campoValidar.className = ' required';
        errorSweetAlert();

    } else {
        campoValidar.className = ' ';
        window.localStorage.setItem('user', userName);
        let usuario = window.localStorage.getItem('user');
        registrar_tarjeta(usuario, numeroTarjeta, nombreTarjeta, fechaTarjeta, numeroCode, tipoTarjeta);
        confirmationSweetAlert();
    }

}

//valida el tipo de tarjeta con un solo enter

addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        validationTarjeta();
    }
});

//valida la info con el submit

boton.addEventListener('click', function() {
    validarCampos(numeroTarjeta);
    validarCampos(nombreTarjeta);
    validarCampos(fechaTarjeta);
    validarCampos(numeroCode);

    validationTarjeta();

});


const registrar_tarjeta = async(usuario, numeroTarjeta, nombreTarjeta, fechaTarjeta, numeroCode, tipoTarjeta) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-tarjeta',
        responseType: 'json',
        data: {
            usuario: usuario,
            numeroTarjeta: numeroTarjeta,
            nombreTarjeta: nombreTarjeta,
            fechaTarjeta: fechaTarjeta,
            numeroCode: numeroCode,
            tipoTarjeta: tipoTarjeta
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su tarjeta ha sido registrada',
            'text': response.msj
        }).then(() => {});
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};