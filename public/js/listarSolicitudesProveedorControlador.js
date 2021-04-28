'use strict';

let tabla = document.querySelector('#table-usuarios tbody');

let inputFiltro = document.querySelector('#filtrar-name');

//Sweatalert modificar popup

const mostrar_editar = async(usuario) => {
    const { value: formValues } = await Swal.fire({
        title: 'Editar Proveedor',
        html: `
        <div class="datos">
        
        <div>        
            <label for="nombre">Nombre de usuario: </label>
            <input type="text" id="nombre" class="emptyFields" value=${usuario.nombre}>
        </div>

        <div>        
            <label for="Username">Username: </label>
            <input type="text" id="Username" class="emptyFields" value=${usuario.usuario}>
        </div>
       
        <div>        
            <label for="Correo">Correo: </label>
            <input type="email" id="Correo" class="emptyFields" value=${usuario.correo}>
        </div>

        <div>        
            <label for="Edad">Edad: </label>
            <input type="Number" id="Edad" class="emptyFields" value=${usuario.num_edad}>
        </div>

        <div>        
            <label for="cedula">Cédula: </label>
            <input type="Number" id="cedula" class="emptyFields" value=${usuario.num_ID}>
        </div>

        <div>        
        <label for="servicios">Cantidad Servicios: </label>
        <input type="text" id="servicios" class="emptyFields" value=${usuario.cant_servicios}>
    </div>



        </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                usuario._id,
                document.querySelector('#nombre').value,
                document.querySelector('#Username').value,
                document.querySelector('#Correo').value,
                document.querySelector('#Edad').value,
                document.querySelector('#cedula').value,
                document.querySelector('#servicios').value,
            ]
        }
    });
    if (formValues) {
        const { value: accept } = await Swal.fire({
            icon: 'warning',
            text: 'Está seguro que desea modificar la informacion del servicio?',
            confirmButtonText: `Si`,
            showCancelButton: true
        });
        if (accept) {
            modificar_proveedor(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4], formValues[5], formValues[6]);
            location.reload();
        }
    }
}



const verPerfil = async(usuario) => {
    const { value: formValues } = await Swal.fire({
        imageUrl: 'https://placeholder.pics/svg/300x300',
        imageHeight: 400,
        imageAlt: 'A tall image',
        title: 'Informacion del proveedor: ',
        html: `
        <div class="datos">

        <div>
            <h2>Nombre de usuario:</h2>
            <p>${usuario.nombre}</p>
        </div>

        <div>
            <h2>Username: </h2>
            <p>${usuario.usuario}</p>
        </div>

        <div>
            <h2>Correo: </h2>
            <p> ${usuario.correo}</p>
        </div>

        <div>
            <h2>Edad: </h2>
            <p>${usuario.num_edad}</p>
        </div>

        <div>        
            <h2>Cédula: </h2>
            <p>${usuario.num_ID}</p>
        </div>

        <div>        
        <h2>Cantidad Servicios: </h2>
        <p>${usuario.cant_servicios}</p>
        </div>`,

    });
}


const mostrarUsuarios = async() => {

    let listarProveedor = await listarProveedores();
    let filtro = inputFiltro.value.toUpperCase();
    tabla.innerHTML = '';

    listarProveedor.forEach((usuario) => {
            let fila = tabla.insertRow();

            if (usuario.nombre.toUpperCase().includes(filtro) && usuario.solicitud == "Pendiente") {

                fila.insertCell().innerHTML = usuario.nombre;
                fila.insertCell().innerHTML = usuario.usuario;
                fila.insertCell().innerHTML = usuario.correo;
                fila.insertCell().innerHTML = usuario.num_edad;
                fila.insertCell().innerHTML = usuario.num_ID;
                fila.insertCell().innerHTML = usuario.cant_servicios;


                let btn_Aprobar = document.createElement('button');
                btn_Aprobar.type = "button";
                btn_Aprobar.classList.add('far');
                btn_Aprobar.classList.add('fa-check-circle');
                btn_Aprobar.classList.add('aceptar');


                let btn_Rechazar = document.createElement('button');
                btn_Rechazar.type = "button";
                btn_Rechazar.classList.add('far');
                btn_Rechazar.classList.add('fa-times-circle');
                btn_Rechazar.classList.add('rechazar');

                fila.insertCell().appendChild(btn_Aprobar);
                fila.insertCell().appendChild(btn_Rechazar);


                btn_Aprobar.addEventListener('click', function() {
                    responderSolicitud(usuario._id, true);
                });

                btn_Rechazar.addEventListener('click', function() {
                    responderSolicitud(usuario._id, false);
                });



            }
        }

    )
};

inputFiltro.addEventListener('keyup', mostrarUsuarios);
mostrarUsuarios();