//Implementar el modo estricto en todos los JS
'use strict';

let btnEditar = document.getElementById("btn-editar");
let btnFoto = document.getElementById("btn-foto");

let usuario = window.localStorage.getItem('user');


let btnImagen = document.querySelector('#btn-foto');
let imgPlaceholder = document.querySelector('#img-mascota');


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
let nombrePerfil = document.getElementById("name-placeholder");
let idPerfil = document.getElementById("id-placeholder");
let edadPerfil = document.getElementById("age-placeholder");
let correoPerfil = document.getElementById("email-placeholder");
let fotoPerfil = document.getElementById("foto-perfil");


const mostrarPerfilInfo = async() => {


    let cargarInfo = await mostrarPerfil(usuario);

    cargarInfo.forEach((infoUsers) => {
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


/*
let newImg = '';
var widget_cloud = cloudinary.createUploadWidget({
    cloudName: 'dxxi2soek',
    uploadPreset: 'preset_proyectoFinal'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Se ha subido correctamente: ', result.info);
        newImg = result.info.secure_url;
    }
})


btnImagen.addEventListener("click", function() {
    widget_cloud.open();
    cambiarFoto(usuario, newImg);
}, false);

*/

mostrarPerfilInfo();



///////////////////////////////////////////////////////////////////////////////////////////////
//                               Codigo cajas comentarios                                    //
///////////////////////////////////////////////////////////////////////////////////////////////

//Referencia de los campos HTMLs. (Elementos como tal, no su valor)
const comentarios = document.querySelector('#comentarios-text');
const boton_enviar = document.querySelector('#comentarios-boton');

//TABLA dinamica ~ Variables
var addComentarios = new Array();
var tabla_reservas = document.querySelector('#tbl-comentarios tbody');

const obtenerDatos = () => {
    console.log(`Nuevo Comentario: ${comentarios.value}`);
    //Agregar elemento al arreglo:
    let nuevo_item = [comentarios.value];
    addComentarios.push(nuevo_item);
    //Llenar la tabla con los nevos valores
    llenar_tabla();
    eraseText();
};


//TABLA dinamica
const llenar_tabla = () => {
    let reservas = addComentarios;
    tabla_reservas.innerHTML = ''; //Esto permite borrar el contenido del body de la tabla.
    for (let i = 0; i < addComentarios.length; i++) {
        let fila = tabla_reservas.insertRow(); //Inserta una nueva fila en la tabla
        fila.insertCell().innerHTML = addComentarios[i][0]; //Comentarios
    }
};

function eraseText() {
    document.getElementById("comentarios-text").value = "";
}

boton_enviar.addEventListener('click', obtenerDatos);