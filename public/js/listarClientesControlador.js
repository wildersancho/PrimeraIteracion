'use strict';

let tabla = document.querySelector('#table-usuarios tbody');

let inputFiltro = document.querySelector('#filtrar-name');

//Sweatalert modificar popup

const mostrar_editar = async(usuario) => {
    const { value: formValues } = await Swal.fire({
        title: 'Editar Cliente',
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
        <label for="mascotas">Cantidad Mascotas: </label>
        <input type="text" id="mascotas" class="emptyFields" value=${usuario.cant_mascotas}>
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
                document.querySelector('#mascotas').value,
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



const verPerfil = async(usuario) => {
    const { value: formValues } = await Swal.fire({
        imageUrl: `${usuario.foto_perfil}`,
        imageHeight: 400,
        imageAlt: 'Perfil Cliente',
        title: 'Informacion del Cliente: ',
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
        <h2>Cantidad Mascotas: </h2>
        <p>${usuario.cant_mascotas}</p>
        </div>`,

    });
}


const mostrarUsuarios = async() => {

    let listarCliente = await listarClientes();
    let filtro = inputFiltro.value.toUpperCase();
    tabla.innerHTML = '';

    listarCliente.forEach((usuario) => {
            let fila = tabla.insertRow();

            if (usuario.nombre.toUpperCase().includes(filtro)) {

                fila.insertCell().innerHTML = usuario.nombre;
                fila.insertCell().innerHTML = usuario.usuario;
                fila.insertCell().innerHTML = usuario.correo;
                fila.insertCell().innerHTML = usuario.num_edad;
                fila.insertCell().innerHTML = usuario.num_ID;
                fila.insertCell().innerHTML = usuario.cant_mascotas;

                //Ver perfil
                let btnPerfil = document.createElement('button');
                btnPerfil.type = "button";
                btnPerfil.textContent = 'Ver Perfil';
                fila.insertCell().appendChild(btnPerfil);

                btnPerfil.addEventListener('click', function() {
                    verPerfil(usuario);

                })

                //Editar perfil
                let mod_perfil = document.createElement('button');
                mod_perfil.type = "button";
                mod_perfil.textContent = 'Editar';

                fila.insertCell().appendChild(mod_perfil);

                mod_perfil.addEventListener('click', function() {
                    mostrar_editar(usuario);

                })


                //Cambiar el estado de cuenta
                let estadoCuenta = fila.insertCell();

                estadoCuenta.innerHTML = usuario.estado_cuenta;



                switch (usuario.estado_cuenta) {
                    case 'Habilitado':
                        estadoCuenta.classList.add("aceptar");
                        break;

                    case 'Deshabilitado':
                        estadoCuenta.classList.add('rechazar');
                        break;

                    default:
                        estadoCuenta.classList.add('default');
                        break;
                }



                let btn_habilitar = document.createElement('button');
                btn_habilitar.type = "button";
                btn_habilitar.classList.add('far');
                btn_habilitar.classList.add('fa-check-circle');
                btn_habilitar.classList.add('aceptar');


                let btn_desabilitar = document.createElement('button');
                btn_desabilitar.type = "button";
                btn_desabilitar.classList.add('far');
                btn_desabilitar.classList.add('fa-times-circle');
                btn_desabilitar.classList.add('rechazar');

                fila.insertCell().appendChild(btn_habilitar);
                fila.insertCell().appendChild(btn_desabilitar);


                btn_habilitar.addEventListener('click', function() {
                    cambiarEstado(usuario._id, true);
                });

                btn_desabilitar.addEventListener('click', function() {
                    cambiarEstado(usuario._id, false);
                });





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

inputFiltro.addEventListener('keyup', mostrarUsuarios);
mostrarUsuarios();