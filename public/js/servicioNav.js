function obtenerDatosDueno(pusuario){
    let respuesta = false;
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/obtener_dueno',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async: false,
        data:{
            NombreUsuario : pusuario,
        }
    });

    peticion.done(function(response){
        respuesta = response;
    });

    peticion.fail(function(){

    });

    return respuesta;
};

function obtenerDatosCliente(pusuario){
    let respuesta = false;
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/obtener_cliente',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async: false,
        data:{
            nombreUsuarioCliente : pusuario,
        }
    });

    peticion.done(function(response){
        respuesta = response;
    });

    peticion.fail(function(){

    });

    return respuesta;
};