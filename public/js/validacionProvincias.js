/*Para cargar estas funciones dentro del HTML 

En el select de provincia en el HTML se agrega: onchange="asignarCanton()"
En el select de canton en el HTML se agrega: onchange="asignarDistrito()"


*/

let provincia = document.querySelector(".id-provincia");
let canton = document.querySelector(".id-canton");
let selectDistrito = document.getElementById('id-distrito');
let heredia = document.getElementById("Heredia");
let cartago = document.getElementById("Cartago");
let sjo = document.getElementById("SanJose");

let cantonesHeredia = new Array("Flores", "San Pablo", "Belén", "Santo Domingo", "San Isidro", "San Rafael", "Santa Bárbara", "Barva",
    "Heredia");

let cantonesCartago = new Array("La Unión", "Alvarado", "El Guarco", "Oreamuno", "Jiménez", "Cartago", "Paraíso", "Turrialba");

var cantonesChepe = new Array("Tibás", "Montes de Oca", "Curridabat", "Alajuelita", "Moravia", "Goicoechea", "Escazú", "San José",
    "Santa Ana", "Desamparados", "León Cortés", "Mora", "Aserrí", "Vázquez de Coronado", "Tarrazú", "Acosta", "Dota", "Turrubares",
    "Puriscal", "Pérez Zeledón", );

//Function que agrega las opciones del arreglo al select
function provinciaSelect(arreglo, select) {
    var newOption = '';
    select.innerHTML = "";

    for (let i = 0; i < arreglo.length; i++) {

        newOption = document.createElement('option');
        newOption.appendChild(document.createTextNode(arreglo[i]));
        select.appendChild(newOption);

    }
}


//Funcion cargado en el "Onclick" del HTML
function asignarCanton() {

    switch (provincia.value) {
        case heredia.value:
            provinciaSelect(cantonesHeredia, canton);
            break;

        case cartago.value:
            provinciaSelect(cantonesCartago, canton);
            break;

        case sjo.value:
            provinciaSelect(cantonesChepe, canton);
            break;

    }
}



//Funcion que llena los distritos
function asignarDistrito() {

    //Heredia Distritos

    switch (canton.value) {
        //Carga los valores dependiendo de los arreglos de los cantones

        case cantonesHeredia[0]:
            let distritoFlores = new Array('San Joaquín', 'Barrantes', 'Llorente');
            provinciaSelect(distritoFlores, selectDistrito);
            break;

        case cantonesHeredia[1]:
            let distritoSP = new Array('San Pablo', 'Rincón de Sabanilla');
            provinciaSelect(distritoSP, selectDistrito);
            break;

        case cantonesHeredia[2]:
            let distritoBelen = new Array('San Antonio', 'La Ribera', 'La Asunción');
            provinciaSelect(distritoBelen, selectDistrito);
            break;

        case cantonesHeredia[3]:
            let distritoSantoDomingo = new Array('Santo Domingo', 'San Vicente', 'San Miguel', 'Paracito', 'Santo Tomás', 'Santa Rosa', 'Tures', 'Pará');
            provinciaSelect(distritoSantoDomingo, selectDistrito);
            break;

        case cantonesHeredia[4]:
            let distritoSanIsidro = new Array('San Isidro', 'San José', 'Concepción', 'San Francisco');
            provinciaSelect(distritoSanIsidro, selectDistrito);
            break;

        case cantonesHeredia[5]:
            let distritoSanRafael = new Array('San Rafael', 'San Josecito', 'Santiago', 'Ángeles', 'Concepción');
            provinciaSelect(distritoSanRafael, selectDistrito);
            break;

        case cantonesHeredia[6]:
            let distritoSantaBarb = new Array('Santa Bárbara', 'San Pedro', 'San Juan', 'Jesús', 'Santo Domingo', 'Santo Domingo', 'Purabá');
            provinciaSelect(distritoSantaBarb, selectDistrito);
            break;

        case cantonesHeredia[7]:
            let distritoBarva = new Array('Barva', 'San Pedro', 'San Roque', 'Santa Lucia', 'San José de la Montaña');
            provinciaSelect(distritoBarva, selectDistrito);
            break;

        case cantonesHeredia[8]:
            let distritoHeredia = new Array('Heredia', 'Mercedes', 'San Francisco', 'Ulloa', 'Varablanca');
            provinciaSelect(distritoHeredia, selectDistrito);
            break;

            //Cartaguito Distritos

        case cantonesCartago[0]:
            let cartagoUnion = new Array('Tres Ríos', 'San Diego', 'San Juan', 'San Rafael', 'Concepción', 'Dulce Nombre', 'San Ramón', 'Río Azul');
            provinciaSelect(cartagoUnion, selectDistrito);
            break;

        case cantonesCartago[1]:
            let cartagoAlvarado = new Array('Pacayas', 'Cervantes', 'Capellades');
            provinciaSelect(cartagoAlvarado, selectDistrito);
            break;

        case cantonesCartago[2]:
            let cartagoGuarco = new Array('El Tejar', 'San Isidro', 'Tobosi', 'Patio de Agua');
            provinciaSelect(cartagoGuarco, selectDistrito);
            break;

        case cantonesCartago[3]:
            let cartagoOreamuno = new Array('San Rafael', 'Cot', 'Potrero Cerrado', 'Cipreses', 'Santa Rosa');
            provinciaSelect(cartagoOreamuno, selectDistrito);
            break;

        case cantonesCartago[4]:
            let cartagoJimenez = new Array('Juan Viñas', 'Tucurrique', 'Pejibaye');
            provinciaSelect(cartagoJimenez, selectDistrito);
            break;

        case cantonesCartago[5]:
            let cartagoCampeon = new Array('Oriental', 'Occidental', 'Carmen', 'San Nicolás', 'Agua Caliente', 'Guadalupe', 'Corralillo', 'Tierra Blanca', 'Dulce Nombre', 'Llano Grande', 'Quebradilla');
            provinciaSelect(cartagoCampeon, selectDistrito);
            break;

        case cantonesCartago[6]:
            let cartagoParaiso = new Array('Paraíso', 'Santiago', 'Orosi', 'Cachí', 'Llanos de Santa Lucía');
            provinciaSelect(cartagoParaiso, selectDistrito);
            break;

        case cantonesCartago[7]:
            let cartagoTurri = new Array('Turrialba', 'La Suiza', 'Peralta', 'Santa Cruz', 'Santa Teresita', 'Pavones', 'Tuis', 'Tayutic', 'Santa Rosa', 'Tres Equis', 'La Isabel', 'Chirripó');
            provinciaSelect(cartagoTurri, selectDistrito);
            break;

            //Distritos de chepe: 
    }
}