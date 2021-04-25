const cambiar_estilo_navegacion = () => {
        var x = document.getElementById("header-principal");
        if (x.className === "header-principal") {
            x.className += " responsive";
        } else {
            x.className = "header-principal";
        }
    }
    //Ejemplo para quemar los usuarios/permisos por defecto
    //Vamos a tener un arreglo para los usuarios administrador, otro para los proveedores y otro para los clientes que previamente existen en el sistema.
let listarCliente = await listarClientes();
const lista_usuarios_admin = new Array("Yessica", "Mario");
const lista_usuarios_proveedor = new Array("Wilder", "Yensy");
const lista_usuarios_cliente = new Array("Mike", "Axel", "Jonathan");

const configurar_app = () => {
    //valida, si los datos no existen en sesion y los agrega
    if (!localStorage.getItem("lista_admins")) {
        localStorage.setItem("lista_admins", lista_usuarios_admin);
    }
    if (!localStorage.getItem("lista_proveedores")) {
        localStorage.setItem("lista_proveedores", lista_usuarios_proveedor);
    }
    if (!localStorage.getItem("lista_clientes")) {
        localStorage.setItem("lista_clientes", lista_usuarios_cliente);
    }
}


const validar_tipo_usuario_2 = () => {
    let tipo = 4;
    if (lista_usuarios_admin.find(nombre => nombre.toLowerCase() == localStorage.getItem("user").toLowerCase())) {
        tipo = 1;
    } else if (lista_usuarios_proveedor.find(nombre => nombre.toLowerCase() == localStorage.getItem("user").toLowerCase())) {
        tipo = 2;
    } else if (lista_usuarios_cliente.find(nombre => nombre.toLowerCase() == localStorage.getItem("user").toLowerCase())) {
        tipo = 3;
    }
    return tipo;
}

configurar_app();