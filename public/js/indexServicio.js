function listarActividades(){
    let listaActividades = [];
  
    let peticion = $.ajax(
        {
            url: 'http://localhost:4000/api/listar_actividades',
            type: 'get',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType : 'json',
            async:false,
            data:{
  
            }
        }
    );
  
    peticion.done(function(response){
        listaActividades = response;
    });
  
    peticion.fail(function(){
  
    });
  
    return listaActividades;
};

let imagenUrl = '';
let cont = 0;

$(function() {
    $.cloudinary.config({ cloud_name: 'andromeda-cenfo', api_key: '842839194878294'});

    let uploadButton = $('#btnSubirFoto');

    uploadButton.on('click', function(e){

        cloudinary.openUploadWidget({ cloud_name: 'andromeda-cenfo', upload_preset: 'proyecto', tags: ['cgal'], multiple: false},
        function(error, result) {
            if(error) console.log(error);
        
            let id = result[0].public_id;
                
            console.log(id);

            imagenUrl = processImage(id);
            console.log(imagenUrl);

            if(cont == 0){
                document.querySelector('#txtFoto1').src = imagenUrl;
                cont = 0 + 1;
                return imagenUrl;
            }else if(cont == 1){
                document.querySelector('#txtFoto2').src = imagenUrl;
                cont = 1 + 1;
                return imagenUrl;
            }else if(cont == 2){
                document.querySelector('#txtFoto3').src = imagenUrl;
                cont = 2 + 1;
                return imagenUrl;
            }else if(cont == 3){
                document.querySelector('#txtFoto4').src = imagenUrl;
                cont = 3 + 1;
                return imagenUrl;
            }else if(cont == 4){
                document.querySelector('#txtFoto5').src = imagenUrl;
                cont = 4 + 1;
                return imagenUrl;
            }else if(cont == 5){
                document.querySelector('#txtFoto6').src = imagenUrl;
                cont = 5 + 1;
                return imagenUrl;
            }else if(cont == 6){
                document.querySelector('#txtFoto7').src = imagenUrl;
                cont = 6 + 1;
                return imagenUrl;
            }else if(cont == 7){
                document.querySelector('#txtFoto8').src = imagenUrl;
                cont = 7 + 1;
                return imagenUrl;
            }
        });
    });
})

function processImage(id) {
    let options = {
        client_hints: true,
    };
    return $.cloudinary.url(id, options);
}

function listarLugares(){
    let listaLugares = [];
  
    let peticion = $.ajax(
        {
            url: 'http://localhost:4000/api/listar_lugares',
            type: 'get',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType : 'json',
            async:false,
            data:{
  
            }
        }
    );
  
    peticion.done(function(response){
        listaLugares = response;
    });
  
    peticion.fail(function(){
  
    });
  
    return listaLugares;
};