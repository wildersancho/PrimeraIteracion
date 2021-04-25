'use strict';

let tabla = document.querySelector('#table-mascotas tbody');

let inputFiltro = document.querySelector('#filtrar-name');
let usuario = window.localStorage.getItem('user');

//Sweatalert modificar popup
const mostrar_editar = async(mascota) => {
    const { value: formValues } = await Swal.fire({
        title: 'Editar Mascota',
        html: `
        <div class="datos">
        <div>
            <label for="txtNombreMascota" id="nombreMascota">Nombre de Mascota</label>
            <input type="text" id="txtNombreMascota" class="emptyFields" value=${mascota.nombreMascota}>
        </div>
        <div>        
            <label for="TelContacto">Teléfono de contacto</label>
            <input type="number" id="telContacto" maxlength="8" class="emptyFields" value=${mascota.Numero}>
        </div>

        <div class="datos" name='formulario1'>
            <label for="id-raza">Raza</label>
            <select id="id-raza" class="emptyFields" class="swal2-input">
                <option>Tipo de Raza</option>
                <option  value="raza1"  >${mascota.Raza}</option >
            </select>
        </div>
        
        <div class="datos" name='formulario1'>
            <label for="id-padecimientos">Padecimientos</label>
            <select id="id-padecimientos" class="emptyFields" class="swal2-input">
                <option>Tipo de Padecimientos</option>
                    <option class="padecimientos" value="padecimientos1">${mascota.Padecimientos}</option>
                    </select>
        </div>
        <div class="datos" name='formulario1'>
            <label for="id-vacunas">Vacunas</label>
            <select class="emptyFields" id="id-vacunas" class="swal2-input">
                <option >Tipo de vacunas</option>
                <option class= "vacunas" value="vacunas1">${mascota.Vacunas}</option>
                
            </select>
        </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                mascota._id,
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




const verPerfil = async(mascota) => {
    const { value: formValues } = await Swal.fire({
        imageUrl: `${mascota.FotoMascota}`,
        imageHeight: 400,
        imageAlt: 'Perfil de mascota',
        title: 'Perfil de Mascota: ',
        html: `
        <div class="datos">
        

        <div>        
            <h2>Nombre: </h2>
            <p>${mascota.nombreMascota}</p>
        </div>

        <div>        
            <h2>Tipo de Mascota: </h2>
            <p>${mascota.tipoMascota}</p>
        </div>

        <div>        
            <h2>Raza: </h2>
            <p>${mascota.Raza}</p>
        </div>
       
        <div>        
            <h2>Padecimientos: </h2>
            <p> ${mascota.Padecimientos}</p>
        </div>

        <div>        
            <h2>Vacunas: </h2>
            <p>${mascota.Vacunas}</p>
        </div>

        <div>        
            <h2>Numero del Dueño(a): </h2>
            <p>${mascota.Numero}</p>
        </div>

        <div>        
        <h2>Caracteres Especiales: </h2>
        <p>${mascota.Comentario}</p>
        </div>`,


    });
}





//Muestra el listar

const mostrarMascotas = async() => {
    let usuario = window.localStorage.getItem('user');
    console.log(usuario);
    let listaTareas = await listarMascotas(usuario);
    let filtro = inputFiltro.value.toUpperCase();


    tabla.innerHTML = '';

    listaTareas.forEach((mascotas) => {
            let fila = tabla.insertRow();

            if (mascotas.nombreMascota.toUpperCase().includes(filtro) || mascotas.Raza.toUpperCase().includes(filtro)) {
                fila.insertCell().innerHTML = mascotas.nombreMascota;

                fila.insertCell().innerHTML = mascotas.tipoMascota;
                fila.insertCell().innerHTML = mascotas.Raza;
                fila.insertCell().innerHTML = mascotas.Padecimientos;
                fila.insertCell().innerHTML = mascotas.Vacunas;
                fila.insertCell().innerHTML = mascotas.Numero;
                fila.insertCell().innerHTML = mascotas._id;

                let btnPerfil = document.createElement('button');
                btnPerfil.type = "button";
                btnPerfil.textContent = 'Ver Perfil';
                fila.insertCell().appendChild(btnPerfil);

                btnPerfil.addEventListener('click', function() {
                    verPerfil(mascotas);

                })


                let mod_perfil = document.createElement('button');
                mod_perfil.type = "button";
                mod_perfil.textContent = 'Editar';

                fila.insertCell().appendChild(mod_perfil);

                mod_perfil.addEventListener('click', function() {
                    mostrar_editar(mascotas);

                })


                let btn_delete = document.createElement('button');
                btn_delete.type = "button";
                btn_delete.classList.add('far');
                btn_delete.classList.add('fa-trash-alt');
                fila.insertCell().appendChild(btn_delete);

                btn_delete.addEventListener('click', function() {
                    eliminarCampos(mascotas._id);

                });


            }
        }

    )
};

inputFiltro.addEventListener('keyup', mostrarMascotas);
mostrarMascotas();