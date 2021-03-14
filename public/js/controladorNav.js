'use strict';
const cambiar_estilo_navegacion = () => {
    var x = document.getElementById("header-principal");
    if (x.className === "header-principal") {
        x.className += " responsive";
    } else {
        x.className = "header-principal";
    }
}