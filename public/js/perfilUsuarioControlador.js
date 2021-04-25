//Implementar el modo estricto en todos los JS
'use strict';

let btnEditar = document.getElementById("btn-editar");


//Campos del HTML
let nombrePerfil = document.getElementById("name-placeholder");
let idPerfil = document.getElementById("id-placeholder");
let edadPerfil = document.getElementById("age-placeholder");
let correoPerfil = document.getElementById("email-placeholder");
let fotoPerfil = document.getElementById("foto-perfil");


const mostrarPerfilInfo = async() => {

    let usuario = window.localStorage.getItem('user');
    let cargarInfo = await mostrarPerfil(usuario);

    cargarInfo.forEach((infoUsers) => {
        nombrePerfil.innerHTML = infoUsers.nombre;
        idPerfil.innerHTML = infoUsers.num_ID;
        edadPerfil.innerHTML = infoUsers.num_edad;
        correoPerfil.innerHTML = infoUsers.correo;
        fotoPerfil.src = infoUsers.foto_perfil;

    });

}

mostrarPerfilInfo();

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
            <label for="Username">Numero identidad: </label>
            <input type="text" id="Username" class="emptyFields" value=${infoPerfil.infoPerfil} disabled>
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
                infoPerfil._id,
                document.querySelector('#nombre').value,
                document.querySelector('#Username').value,
                document.querySelector('#Correo').value,
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
            modificar_cliente(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4], formValues[5], formValues[6]);
            location.reload();
        }
    }
}




btnEditar.addEventListener('click', mostrar_editar);











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