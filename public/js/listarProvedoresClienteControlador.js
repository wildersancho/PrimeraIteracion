'use strict';

let tabla = document.querySelector('#table-proveedores tbody');

let inputFiltro = document.querySelector('#filtrar-name');
let usuario = window.localStorage.getItem('user');

const mostrarProveedores = async() => {

    localStorage.getItem('provName');
    localStorage.removeItem('provName');
    let listaProveedores = await listarProveedores();
    let filtro = inputFiltro.value.toUpperCase();
    tabla.innerHTML = '';

    listaProveedores.forEach((proveedor) => {

            console.log(proveedor.usuario);
            console.log(proveedor.correo);
            console.log(proveedor.tipoServicio);
            console.log(proveedor.provincia);
            let fila = tabla.insertRow();
            if (proveedor.usuario.toUpperCase().includes(filtro) || proveedor.tipoServicio.toUpperCase().includes(filtro)) {
                fila.insertCell().innerHTML = proveedor.usuario;
                fila.insertCell().innerHTML = proveedor.correo;
                fila.insertCell().innerHTML = proveedor.tipoServicio;
                fila.insertCell().innerHTML = proveedor.provincia;

                let btnPerfil = document.createElement('button');
                btnPerfil.type = "button";
                btnPerfil.textContent = 'Ver Perfil';
                fila.insertCell().appendChild(btnPerfil);

                btnPerfil.addEventListener('click', function() {
                    //add local storage
                    localStorage.setItem('provName', proveedor.usuario);
                    location.href = 'perfilProveedorCliente.html';

                })

            }
        }

    )
};

inputFiltro.addEventListener('keyup', mostrarProveedores);
mostrarProveedores();