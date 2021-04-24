/*
Visa: must have 16 digits All Visa card numbers start with a 4.
^4[0-9]{12}(?:[0-9]{3})?$


MasterCard MasterCard numbers either start with the numbers 51 through 55 or with the numbers 2221 through 2720. All have 16 digits.: 
^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$

*/

let tarjeta = document.querySelector(".tar-num");
let nombreTarjeta = document.querySelector(".tar-name");
let fechaTarjeta = document.querySelector(".tar-fecha");
let numeroCode = document.querySelector(".tar-code");
let tipoTarjeta = document.querySelector(".tipo-tar");
let boton = document.querySelector(".tar-botton");



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

//4012888888881881
//Validacion de la tarjeta, si es Mastercard o Visa

function validationTarjeta(tTarjeta) {

    let regexVisa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    let regexMasterCard = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;

    var testVisa = regexVisa.test(tarjeta.value);
    var testMasterCard = regexMasterCard.test(tarjeta.value);

    console.log(testVisa);
    console.log(testMasterCard);

    if (testVisa == true) {
        tipoTarjeta.innerHTML = "Su tarjeta es: Visa.";
        tipoTarjeta.style.color = "Green";
        tTarjeta = "Visa";

    } else if (testMasterCard == true) {
        tipoTarjeta.innerHTML = "Su tarjeta es: Mastercard.";
        tipoTarjeta.style.color = "Blue";
        tTarjeta = "MasterCard";
    } else {
        tipoTarjeta.innerHTML = "Su tarjeta es de otra empresa o no es valida.";
        tipoTarjeta.style.color = "Red";
        tarjeta.className = ' required';
        tTarjeta = "Otro";
        errorSweetAlert();
    }
    return tTarjeta;
}


//Validar los campos si estan vacios o no
function validarCampos(campoValidar, _error) {

    if (campoValidar.value === "") {
        campoValidar.className = ' required';
        errorSweetAlert();
        _error = true;
    } else {
        campoValidar.className = ' '
        confirmationSweetAlert();
    }
    return _error;
}

//valida el tipo de tarjeta con un solo enter

addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        //validationTarjeta(_error, tTarjeta);
    }
});

//valida la info con el submit

boton.addEventListener('click', function() {
    let _error = false;
    let tTarjeta = '';
    _error = validarCampos(tarjeta, _error);
    _error = validarCampos(nombreTarjeta, _error);
    _error = validarCampos(fechaTarjeta, _error);
    _error = validarCampos(numeroCode, _error);
    tTarjeta = validationTarjeta(tTarjeta);
    if (!_error) {
        let userName = "wsanchor";
        window.localStorage.setItem('user', userName);
        let usuario = window.localStorage.getItem('user');
        let tarjeta = document.getElementById("tar-num").value;
        let nombreTarjeta = document.getElementById("tar-name").value;
        let fechaTarjeta = document.getElementById("tar-fecha").value;
        let numeroCode = document.getElementById("tar-code").value;
        let tipoTarjeta = tTarjeta;
        registrar_tarjeta(usuario, tarjeta, nombreTarjeta, fechaTarjeta, numeroCode, tipoTarjeta);
    }
});