'use strict';

const tabla = document.querySelector("#tbl-serviciosAdministrador tbody");


const mostrar_servicios = async() => {
    let lista_servicios = await obtener_servicios();

    tabla.innerHTML = '';
    lista_servicios.forEach((servicios) => {


        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = servicios.nombreServicio;
        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button')
        boton_editar.innerHTML = "Editar";

        boton_editar.type = "button"
        boton_editar.addEventListener('click', async() => {
            const { value: formValues } = await Swal.fire({
                title: 'Editar Servicio',
                html: `<label for="NombreServicio">Nombre del Servicio</label><input id="nombre" class="swal2-input" value= "${servicios.nombreServicio}">`,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        servicios._id,
                        document.getElementById('nombre').value,
                    ]
                }
            })

            if (formValues) {
                const { value: accept } = await Swal.fire({
                    icon: 'warning',
                    text: 'Está seguro que desea modificar el Servicio',
                    confirmButtonText: `Si`,
                    showCancelButton: true
                });
                if (accept) {
                    console.log(formValues[0]);
                    console.log(formValues[1]);
                    modificar_servicio(formValues[0], formValues[1]);
                }
            }
        });
        celda_editar.appendChild(boton_editar);

        //Eliminar
        let celda_eliminar = fila.insertCell();
        let boton_eliminar = document.createElement('button')
        boton_eliminar.innerHTML = "Eliminar";
        boton_eliminar.type = "button"

        celda_eliminar.appendChild(boton_eliminar);
        boton_eliminar.addEventListener('click', async() => {
            eliminar_servicio(servicios._id)
        });
    });


}


mostrar_servicios();