'use strict';

const tabla = document.querySelector("#tbl-padecimientos tbody");


const mostrar_padecimientos = async() => {
    let lista_padecimientos = await obtener_padecimientos();

    tabla.innerHTML = '';
    lista_padecimientos.forEach((padecimientos) => {


        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = padecimientos.nombrePadecimiento;
        fila.insertCell().innerHTML = padecimientos.codigoPadecimiento;
        //Editar
        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button')
        boton_editar.innerHTML = "Editar";

        boton_editar.type = "button"
        boton_editar.addEventListener('click', async() => {
            const { value: formValues } = await Swal.fire({
                title: 'Editar Padecimiento',
                html: `<label for="codigoPadecimiento">Código</label><input id="codigo" class="swal2-input value= "${padecimientos.codigoPadecimiento}">' 
                <label for="codigoPadecimiento">Nombre</label><input id="nombre" class="swal2-input" value= "${padecimientos.nombrePadecimiento}">`,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        padecimientos._id,
                        document.getElementById('codigo').value,
                        document.getElementById('nombre').value
                    ]
                }
            })

            if (formValues) {
                const { value: accept } = await Swal.fire({
                    icon: 'warning',
                    text: 'Está seguro que desea modificar el padecimiento',
                    confirmButtonText: `Si`,
                    showCancelButton: true
                });
                if (accept) {
                    modificar_padecimiento(formValues[0], formValues[1], formValues[2]);
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
            eliminar_padecimiento(padecimientos._id)
        });
    });

}


mostrar_padecimientos();