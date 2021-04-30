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
            modificar_cliente(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4]);
            location.reload();
        }
    }
}


const mostrarUsuarios = async() => {

    let Proveedor = await Proveedor();
    let filtro = inputFiltro.value.toUpperCase();
    tabla.innerHTML = '';

    Proveedor.forEach((usuario) => {
            let fila = tabla.insertRow();

            if (usuario.nombre.toUpperCase().includes(filtro)) {

                fila.insertCell().innerHTML = usuario.nombre;
                fila.insertCell().innerHTML = usuario.usuario;
                fila.insertCell().innerHTML = usuario.correo;
                fila.insertCell().innerHTML = usuario.num_edad;
                fila.insertCell().innerHTML = usuario.num_ID;
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
                    case 'Abilitado':
                        estadoCuenta.classList.add("aceptar");
                        break;

                    case 'Deshabilitado':
                        estadoCuenta.classList.add('rechazar');
                        break;

                    default:
                        estadoCuenta.classList.add('default');
                        break;
                }



                let btn_abilitar = document.createElement('button');
                btn_abilitar.type = "button";
                btn_abilitar.classList.add('far');
                btn_abilitar.classList.add('fa-check-circle');
                btn_abilitar.classList.add('aceptar');


                let btn_desabilitar = document.createElement('button');
                btn_desabilitar.type = "button";
                btn_desabilitar.classList.add('far');
                btn_desabilitar.classList.add('fa-times-circle');
                btn_desabilitar.classList.add('rechazar');

                fila.insertCell().appendChild(btn_abilitar);
                fila.insertCell().appendChild(btn_desabilitar);


                btn_abilitar.addEventListener('click', function() {
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