'use strict';
//Datos de section de cliente



let inputnombreMascota = document.querySelector('#txtNombreMascota');

let inputTelContacto = document.querySelector('#telContacto');

let inputRadioButtonMascota = document.querySelectorAll('input[name="rbtMascota"]')

let inputTipoRaza = document.querySelector('#id-raza');

let inputPadecimientos = document.querySelector('#id-padecimientos');

let inputVacunas = document.querySelector('#id-vacunas');

var inputradiosMascotas = document.querySelector('#label-tipoMascota');


let accion = 'registrar';


let botonRegistrarMascota = document.querySelector('#btnRegistrarMascota');

botonRegistrarMascota.addEventListener('click', obtenerDatosCliente);



async function obtenerDatosCliente() {
    let error = false;


    let nombreMascota = inputnombreMascota.value;
	let telContacto = inputTelContacto.value;
	let tipoRaza = inputTipoRaza.value;
	let padecimientos = inputPadecimientos.value;
	let vacunas = inputVacunas.value;




    error = validarCliente(nombreMascota,
        telContacto,inputRadioButtonMascota,tipoRaza,padecimientos,vacunas);



		if (error == true) {
			swal.fire({
				title: 'Registro incorrecto',
				text: 'No se pudo registrar su cuenta, revise los campos en rojo',
				icon: 'warning',
				confirmButtonText: 'Entendido'
			});
		} else {
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

	function validarCliente(pnombreMascota,ptelContacto,pradioButtonMascota,ptipoRaza,pPadecimientos,pVacunas ){
		let error = false;
		let expTel = /^[0-9]{8}$/;
		console.log("validando");
		if (pnombreMascota == '') {
			error = true;
			inputnombreMascota.classList.add('errorInput');
		} else {
			inputnombreMascota.classList.remove('errorInput');
		}

		if (ptelContacto == '' || expTel.test(ptelContacto) == false) {
			error = true;
			inputTelContacto.classList.add('errorInput');
		} else {
			inputTelContacto.classList.remove('errorInput');
		}
		if (ptipoRaza == 'Tipo de Raza') {
			error = true;
			inputTipoRaza.classList.add('errorInput');
		} else {
			inputTipoRaza.classList.remove('errorInput');
		}
		if (pPadecimientos == 'Tipo de Padecimientos') {
			error = true;
			inputPadecimientos.classList.add('errorInput');
		} else {
			inputPadecimientos.classList.remove('errorInput');
		}
		if (pVacunas == 'Tipo de vacunas') {
			error = true;
			inputVacunas.classList.add('errorInput');
		} else {
			inputVacunas.classList.remove('errorInput');
		}
		for (const rb of pradioButtonMascota) {
			if (rb.checked) {
				inputradiosMascotas.classList.remove('errorInput');
				break;
			} else {
				error = true;
				inputradiosMascotas.classList.add('errorInput');
			}
		}
		return error;
	};
