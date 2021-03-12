function registrarBitacora(pNombre, pAccion, pTipo, pAfectado, pFecha){
  let respuesta = '';
  let peticion = $.ajax({
      url: 'http://localhost:4000/api/registrar_bitacora',
      type: 'post',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
          //lave : valor
          //La llave es el mismo nombre con que se recibe en el api.js del backend
         nombre : pNombre,
         accion : pAccion,
         tipo: pTipo,
         afectado: pAfectado,
         fecha: pFecha,
      }
    });
  
    peticion.done(function(response){
      respuesta = response;
    });
  
    peticion.fail(function(response){
      respuesta = response;
    });

   return respuesta; 
};