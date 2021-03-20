let botonComentario = document.querySelector(".comentarios-boton");
let comentarioText = document.querySelector(".comentarios-text");
let cajaComment = document.querySelector(".caja-comentarios");


botonComentario.addEventListener('click', function(e) {
    cajaComment.value = "";
    cajaComment.value += comentarioText.value;
    console.log(cajaComment.value);
    comentarioText.value = "";

});