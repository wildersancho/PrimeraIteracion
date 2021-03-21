//1) Definir Las Variables Correspondintes

var opt_1 = new Array(
    "Tibás",
    "Montes de Oca",
    "Curridabat",
    "Alajuelita",
    "Moravia",
    "Goicoechea",
    "Escazú",
    "San José",
    "Santa Ana",
    "Desamparados",
    "León Cortés",
    "Mora",
    "Aserrí",
    "Vázquez de Coronado",
    "Tarrazú",
    "Acosta",
    "Dota",
    "Turrubares",
    "Puriscal",
    "Pérez Zeledón",

);
var opt_2 = new Array(
    "Esparza",
    "Montes de Oro",
    "Garabito",
    "Parrita",
    "Quepos",
    "Corredores",
    "Coto Brus",
    "Golfito",
    "Puntarenas",
    "Osa",
    "Buenos Aires"
);
var opt_3 = new Array(
    "Guácimo",
    "Matina",
    "Siquirres",
    "Limón",
    "Pococí",
    "Talamanca",

);
var opt_4 = new Array(
    "Flores",
    "San Pablo",
    "Belén",
    "Santo Domingo",
    "San Isidro",
    "San Rafael",
    "Santa Bárbara",
    "Barva",
    "Heredia",
    "Sarapiquí"

);
var opt_5 = new Array(
    "Hojancha",
    "Nandayure",
    "Carrillo",
    "Tilarán",
    "Abangares",
    "Cañas",
    "Bagaces",
    "Santa Cruz",
    "Nicoya",
    "La Cruz",
    "Liberia",

);
var opt_6 = new Array(
    "La Unión",
    "Alvarado",
    "El Guarco",
    "Oreamuno",
    "Jiménez",
    "Cartago",
    "Paraíso",
    "Turrialba"

);
var opt_7 = new Array(
    "Palmares",
    "Poás",
    "Sarchí",
    "San Mateo",
    'Naranjo',
    "Atenas",
    "Grecia",
    "Orotina",
    "Zarcero",
    "Río Cuarto",
    "Alajuela",
    "Guatuso",
    "San Ramón",
    "Los Chiles",
    'Upala',
    "San Carlos"
);

// 2) crear una funcion que permita ejecutar el cambio dinamico

function cambia() {
    var cosa;
    //Se toma el vamor de la "cosa seleccionada"
    cosa = document.formulario1.cosa[document.formulario1.cosa.selectedIndex].value;
    //se chequea si la "cosa" esta definida
    if (cosa != 0) {
        //selecionamos las cosas Correctas
        mis_opts = eval("opt_" + cosa);
        //se calcula el numero de cosas
        num_opts = mis_opts.length;
        //marco el numero de opt en el select
        document.formulario1.opt.length = num_opts;
        //para cada opt del array, la pongo en el select
        for (i = 0; i < num_opts; i++) {
            document.formulario1.opt.options[i].value = mis_opts[i];
            document.formulario1.opt.options[i].text = mis_opts[i];
        }
    } else {
        //si no habia ninguna opt seleccionada, elimino las cosas del select
        document.formulario1.opt.length = 1;
        //ponemos un guion en la unica opt que he dejado
        document.formulario1.opt.options[0].value = "-";
        document.formulario1.opt.options[0].text = "-";
    }
    //hacer un reset de las opts
    document.formulario1.opt.options[0].selected = true;

}