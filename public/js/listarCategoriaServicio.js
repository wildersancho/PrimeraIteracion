    function listarCategoria(){
    let listaCategoria = [];
  
    let peticion = $.ajax(
        {
            url: 'http://localhost:4000/api/listarCategoria',
            type: 'get',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType : 'json',
            async:false,
            data:{
  
            }
        }
    );
  
    peticion.done(function(response){
        listaCategoria = response;
    });
  
    peticion.fail(function(){
  
    });
  
    return listaCategoria;
};

function eliminarCategoria(pIDCategoria){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminarCategoria',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: pIDCategoria
        }  
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

function deshabilitarCategoria(pIDCategoria, pEstatus){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificarCategoria',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pIDCategoria,
            Estado : pEstatus
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

function habilitarCategoria(pIDCategoria, pEstatus){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/modificarCategoria',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pIDCategoria,
            Estado : pEstatus
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};

