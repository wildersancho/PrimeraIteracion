'use strict';

let tabla = document.querySelector('#table-mascotas tbody');

let inputFiltro = document.querySelector('#filtrar-name');

let usuario = window.localStorage.getItem('user');

//Sweatalert modificar popup
const mostrar_editar = async(usuario) => {
    const { value: formValues } = await Swal.fire({
        title: 'Editar Mascota',
        html: `
        <div class="datos">
        <div>
            <label for="txtNombreMascota" id="nombreMascota">Nombre de Mascota</label>
            <input type="text" id="txtNombreMascota" class="emptyFields" value=${usuario.nombreMascota}>
        </div>
        <div>        
            <label for="TelContacto">Teléfono de contacto</label>
            <input type="number" id="telContacto" maxlength="8" class="emptyFields" value=${usuario.Numero}>
        </div>

        <div class="datos" name='formulario1'>
            <label for="id-raza">Raza</label>
            <select id="id-raza" class="emptyFields" class="swal2-input">
                <option>Tipo de Raza</option>
                <option  value="raza1"  >${usuario.Raza}</option >
            </select>
        </div>
        
        <div class="datos" name='formulario1'>
            <label for="id-padecimientos">Padecimientos</label>
            <select id="id-padecimientos" class="emptyFields" class="swal2-input">
                <option>Tipo de Padecimientos</option>
                    <option class="padecimientos" value="padecimientos1">${usuario.Padecimientos}</option>
                    </select>
        </div>
        <div class="datos" name='formulario1'>
            <label for="id-vacunas">Vacunas</label>
            <select class="emptyFields" id="id-vacunas" class="swal2-input">
                <option >Tipo de vacunas</option>
                <option class= "vacunas" value="vacunas1">${usuario.Vacunas}</option>
                
            </select>
        </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                usuario._id,
                document.querySelector('#txtNombreMascota').value,
                document.querySelector('#telContacto').value,
                document.querySelector('#id-raza').value,
                document.querySelector('#id-padecimientos').value,
                document.querySelector('#id-vacunas').value
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
            modificar_mascota(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4], formValues[5], formValues[6], formValues[7]);
            location.reload();
        }
    }
}




const verPerfil = async(usuario) => {
    const { value: formValues } = await Swal.fire({
        imageUrl: `${usuario.FotoMascota}`,
        imageHeight: 400,
        imageAlt: 'Perfil de mascota',
        title: 'Perfil de Mascota: ',
        html: `
        <div class="datos">
        

        <div>        
            <h2>Nombre: </h2>
            <p>${usuario.nombreMascota}</p>
        </div>

        <div>        
            <h2>Tipo de Mascota: </h2>
            <p>${usuario.tipoMascota}</p>
        </div>

        <div>        
            <h2>Raza: </h2>
            <p>${usuario.Raza}</p>
        </div>
       
        <div>        
            <h2>Padecimientos: </h2>
            <p> ${usuario.Padecimientos}</p>
        </div>

        <div>        
            <h2>Vacunas: </h2>
            <p>${usuario.Vacunas}</p>
        </div>

        <div>        
            <h2>Numero del Dueño(a): </h2>
            <p>${usuario.Numero}</p>
        </div>

        <div>        
        <h2>Caracteres Especiales: </h2>
        <p>${usuario.Comentario}</p>
        </div>`,


    });
}





//Muestra el listar

const mostrarMascotas = async() => {

    let listaTareas = await listarMascotas();
    let filtro = inputFiltro.value.toUpperCase();
    tabla.innerHTML = '';

    listaTareas.forEach((usuario) => {
            let fila = tabla.insertRow();

            if (usuario.nombreMascota.toUpperCase().includes(filtro) || usuario.Raza.toUpperCase().includes(filtro)) {
                fila.insertCell().innerHTML = usuario.nombreMascota;

                fila.insertCell().innerHTML = usuario.tipoMascota;
                fila.insertCell().innerHTML = usuario.Raza;
                fila.insertCell().innerHTML = usuario.Padecimientos;
                fila.insertCell().innerHTML = usuario.Vacunas;
                fila.insertCell().innerHTML = usuario.Numero;
                fila.insertCell().innerHTML = usuario._id;

                let btnPerfil = document.createElement('button');
                btnPerfil.type = "button";
                btnPerfil.textContent = 'Ver Perfil';
                fila.insertCell().appendChild(btnPerfil);

                btnPerfil.addEventListener('click', function() {
                    verPerfil(usuario);

                })


                let mod_perfil = document.createElement('button');
                mod_perfil.type = "button";
                mod_perfil.textContent = 'Editar';

                fila.insertCell().appendChild(mod_perfil);

                mod_perfil.addEventListener('click', function() {
                    mostrar_editar(usuario);

                })


                let btn_delete = document.createElement('button');
                btn_delete.type = "button";
                btn_delete.classList.add('far');
                btn_delete.classList.add('fa-trash-alt');
                fila.insertCell().appendChild(btn_delete);

                btn_delete.addEventListener('click', function() {
                    eliminarCampos(usuario._id);

                });


            }
        }

    )
};

inputFiltro.addEventListener('keyup', mostrarMascotas);
mostrarMascotas();