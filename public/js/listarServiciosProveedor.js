'use strict';

const tabla = document.querySelector("#tbl-serviciosProveedor tbody");


const mostrar_servicios_proveedor = async() => {
    let lista_servicios_proveedor = await obtener_servicios_proveedor();

    tabla.innerHTML = '';
    lista_servicios_proveedor.forEach((servicios) => {


        let fila = tabla.insertRow();

        fila.insertCell().innerHTML = servicios.nombreServicio;
        fila.insertCell().innerHTML = servicios.tipoMascota;
        fila.insertCell().innerHTML = servicios.precio;
        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button')
        boton_editar.innerHTML = "Editar";

        boton_editar.type = "button"
        boton_editar.addEventListener('click', async() => {
            const { value: formValues } = await Swal.fire({
                title: 'Editar Servicio',
                html: `
                <label for="nombreServicio">Servicio</label><p>
                <select name="nombreServicio" id="nombreServicio" class="swal2-input" value="${cambiarServicio()}" required/>
                <option value= "${servicios.nombreServicio}">Servicio1</option>
                
                </select>
                </p>
                <label for="tipoMascota">Tipo de Mascota</label>
                <p><select name="Tipo Macota" id="tipoMascota" class="swal2-input" value= "${servicios.tipoMascota}"required/>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                </select>
                
                <label for="precio">Precio del Servicio</label>
                <input id="precio" class="swal2-input value= "${servicios.precio}">' 
                `,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        servicios._id,

                        document.getElementById('nombreServicio').value,
                        document.getElementById('tipoMascota').value,
                        document.getElementById('precio').value
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

                    modificar_servicio_proveedor(formValues[0], formValues[1], formValues[2], formValues[3]);
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
            eliminar_servicio_proveedor(servicios._id)
        });
    });


}


mostrar_servicios_proveedor();