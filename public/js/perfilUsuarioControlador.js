//Implementar el modo estricto en todos los JS
'use strict';

let btnEditar = document.getElementById("btn-editar");
let btnFoto = document.getElementById("btn-foto");

let usuario = window.localStorage.getItem('user');
let imagen = modificarImg;


//Boton Editar
const mostrar_editar = async(infoPerfil) => {
    const { value: formValues } = await Swal.fire({
        title: 'Editar Cliente',
        html: `
        <div class="datos">
        
        <div>        
            <label for="nombre">Editar Nombre: </label>
            <input type="text" id="nombre" class="emptyFields" value=${infoPerfil.nombre}>
        </div>

        <div>        
            <label for="cedula">Numero identidad: </label>
            <input type="text" id="cedula" class="emptyFields" value=${infoPerfil.num_ID} disabled>
        </div>
      
        <div>        
            <label for="Edad">Edad: </label>
            <input type="Number" id="Edad" class="emptyFields" value=${infoPerfil.num_edad}>
        </div>

         
        <div>        
            <label for="Correo">Correo: </label>
            <input type="email" id="Correo" class="emptyFields" value=${infoPerfil.correo} disabled>
        </div>

        </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                infoPerfil.usuario,
                document.querySelector('#nombre').value,
                document.querySelector('#cedula').value,
                document.querySelector('#Edad').value,
                document.querySelector('#Correo').value,
            ]
        }
    });
    if (formValues) {
        const { value: accept } = await Swal.fire({
            icon: 'warning',
            text: 'Está seguro que desea modificar la informacion de mascota?',
            confirmButtonText: `Si`,
            showCancelButton: true
        });
        if (accept) {
            //modificarPerfil(usuario, nombre, num_ID, num_edad, correo)
            modificarPerfil(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4]);
            location.reload();
        }
    }
}

//Campos del HTML
let usuarioPerfil = document.getElementById("user-placeholder");
let nombrePerfil = document.getElementById("name-placeholder");
let idPerfil = document.getElementById("id-placeholder");
let edadPerfil = document.getElementById("age-placeholder");
let correoPerfil = document.getElementById("email-placeholder");
let fotoPerfil = document.getElementById("foto-perfil");


const mostrarPerfilInfo = async() => {

    let cargarInfo = await mostrarPerfil(usuario);

    cargarInfo.forEach((infoUsers) => {

        cambiarFoto(usuario, imagen);
        usuarioPerfil.innerHTML = infoUsers.usuario;
        nombrePerfil.innerHTML = infoUsers.nombre;
        idPerfil.innerHTML = infoUsers.num_ID;
        edadPerfil.innerHTML = infoUsers.num_edad;
        correoPerfil.innerHTML = infoUsers.correo;
        fotoPerfil.src = infoUsers.foto_perfil;


        if (fotoPerfil.src != infoUsers.foto_perfil) {
            fotoPerfil.src = 'imgs/profile_default.jpg';
        }

        btnEditar.addEventListener('click', function() {
            mostrar_editar(infoUsers);
        });
    });


}

cambiarFoto(usuario, imagen);

mostrarPerfilInfo();