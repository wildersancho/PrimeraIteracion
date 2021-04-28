let btnImagen = document.querySelector('#btn-subida');
let imgPlaceholder = document.querySelector('#img-mascota');


var widget_cloud = cloudinary.createUploadWidget({
    cloudName: 'dxxi2soek',
    uploadPreset: 'preset_proyectoFinal'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Se ha subido correctamente: ', result.info);
        imgPlaceholder.scr = result.info.secure_url;

    }
})


btnImagen.addEventListener("click", function() {
    widget_cloud.open();

}, false);