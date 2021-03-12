'use strict';
let listaActividades = listarActividades();
let listaLugares = listarLugares();
let listaCategoriasLugares = listarCategoria();
const inputBuscarLugares = document.querySelector('#txtBuscarLugares');
const botonBuscarLugares = document.querySelector('#btnBuscarLugares');
const botonNoDesplegarLugares = document.querySelector('#noDesplegarLugares');
const botonDesplegarLugares = document.querySelector('#desplegarLugares');
const inputBuscarActividades = document.querySelector('#txtBuscarActividades');
const botonBuscarActividades = document.querySelector('#btnBuscarActividades');
const botonNoDesplegarActividades = document.querySelector('#noDesplegarActividades');
const botonDesplegarActividades = document.querySelector('#desplegarActividades');
const selectProvincias = document.querySelector('#txtProvincia');
const selectCantones = document.querySelector('#txtCanton');
const selectDistritos = document.querySelector('#txtDistrito');
const selectCategoria = document.querySelector('#txtCategoria');
const inputCategorias = document.querySelector('#txtCategorias');
const eliminarCategoriasLugares = document.querySelector('#removerCategoriasLugares');
let arregloCategorias = [];
let contCategorias = 0;
let botonFiltrarFecha = document.querySelector('#filtrarFecha');
let fechaMaxima = document.querySelector('#maxDate');
let fechaMin = document.querySelector('#minDate');
let botonGratis = document.querySelector('#ActividadesGratis');
imprimirListaCategoriasLugares();
imprimirBusquedaDeActividades();
imprimirPerfilLugares();

botonBuscarLugares.addEventListener('click', function(){
    imprimirPerfilLugares(inputBuscarLugares.value);
});

selectProvincias.addEventListener('click', function () {
    imprimirPerfilLugares(inputBuscarLugares.value, selectProvincias.value, selectCantones.value, selectDistritos.value);
})
selectCantones.addEventListener('click', function () {
    imprimirPerfilLugares(inputBuscarLugares.value, selectProvincias.value, selectCantones.value, selectDistritos.value);
})
selectDistritos.addEventListener('click', function () {
    imprimirPerfilLugares(inputBuscarLugares.value, selectProvincias.value, selectCantones.value, selectDistritos.value);
})
selectCategoria.addEventListener('click', function () {
    imprimirPerfilLugares(inputBuscarLugares.value, selectProvincias.value, selectCantones.value, selectDistritos.value);
})
eliminarCategoriasLugares.addEventListener('click', function () {
    imprimirPerfilLugares(inputBuscarLugares.value, selectProvincias.value, selectCantones.value, selectDistritos.value);
})

botonBuscarActividades.addEventListener('click', function () {
    imprimirBusquedaDeActividadesFiltradas(inputBuscarActividades.value);
})

botonGratis.addEventListener('click', imprimirBusquedaDeActividadesFiltradas);

botonFiltrarFecha.addEventListener('click', imprimirBusquedaDeActividadesFiltradas);

botonNoDesplegarLugares.addEventListener('click', function(){
    noDesplegarPerfilLugares();
});

botonDesplegarLugares.addEventListener('click', function(){
    desplegarPerfilLugares();
});

botonNoDesplegarActividades.addEventListener('click', function(){
    noDesplegarBusquedaDeActividades();
})

botonDesplegarActividades.addEventListener('click', function(){
    desplegarBusquedaDeActividades();
})

function imprimirBusquedaDeActividades(pBuscar){

    let cards = document.getElementById('cardsActividades');
    
    if(!pBuscar){
        pBuscar = '';
    }
    cards.innerHTML = '';
    
    let cont = 0;

    for(let i = 0; i < listaActividades.length; i++){
        if(listaActividades[i]['nombre'].toLowerCase().includes(pBuscar.toLowerCase()) || listaActividades[i]['descripcion'].toLowerCase().includes(pBuscar.toLowerCase()) || listaActividades[i]['fecha'].toLowerCase().includes(pBuscar.toLowerCase()) || listaActividades[i]['actividadGratis'].toLowerCase().includes(pBuscar.toLowerCase()) || listaActividades[i]['precio'].toLowerCase().includes(pBuscar.toLowerCase()) || listaActividades[i]['tipoMoneda'].toLowerCase().includes(pBuscar.toLowerCase()) || listaActividades[i]['lugar'].toLowerCase().includes(pBuscar.toLowerCase()) || listaActividades[i]['etiquetas'].toLowerCase().includes(pBuscar.toLowerCase())){
            
            let card = document.createElement('div');
            let elementoFoto = document.createElement('img');
            let nombre = document.createElement('h1');
            let descripcion = document.createElement('h3');
            let lugar= document.createElement('h3');
            let fecha= document.createElement('h3');
            let precio= document.createElement('h2');
            let botonVerMas = document.createElement('a');

            if(cont == 4){
                cont = 0;
            }

            switch(cont){
                case 0:
                    card.className = 'cardNaranja';
                    botonVerMas.className = 'buttonVerMasNaranja';
                    break;
                case 1:
                    card.className = 'cardAzul';
                    botonVerMas.className = 'buttonVerMasAzul';
                    break;
                case 2:
                    card.className= 'cardVerde';
                    botonVerMas.className = 'buttonVerMasVerde';
                    break;
                case 3:
                    card.className = 'cardRojo';
                    botonVerMas.className = 'buttonVerMasRojo';
            }

            elementoFoto.className = 'fotos';
            nombre.className = 'nombre';
            descripcion.className = 'descripcion';
            lugar.className= 'lugar';
            fecha.className = 'fecha';
            precio.className = 'precio';


            let fotos = listaActividades[i]['fotos'];
            let posicion = fotos.indexOf(',');

            if(!(posicion == -1)){
                fotos = fotos.slice(0, posicion);
            }
            if(fotos == ''){
                fotos = 'imgs/foto.png';
            }

            let actividadGratis = listaActividades[i]['actividadGratis'];
            let precioActividad = listaActividades[i]['precio'];
            let tipoMoneda = listaActividades[i]['tipoMoneda'];
            

           if(actividadGratis == 'Gratis'){
            precioActividad  = actividadGratis;
            }else{
                precioActividad = tipoMoneda + precioActividad;
            }

            elementoFoto.src = fotos;
            nombre.innerHTML = listaActividades[i]['nombre'];
            descripcion.innerHTML = listaActividades[i]['descripcion'];
            lugar.innerHTML= listaActividades[i]['lugar'];
            fecha.innerHTML= listaActividades[i]['fecha'];
            precio.innerHTML= precioActividad;
            botonVerMas.innerHTML = 'Ver actividad';

            cards.appendChild(card);
            card.appendChild(elementoFoto);
            card.appendChild(nombre);
            card.appendChild(descripcion);
            card.appendChild(lugar);
            card.appendChild(fecha);
            card.appendChild(precio);
            card.appendChild(botonVerMas);

            botonVerMas.addEventListener('click', function(){
                swal({
                    title: 'No se puede visualizar la actividad',
                    text: 'Por favor inicie sesión',
                    type: 'warning',
                    confirmButtonText: 'Entendido'
                });
            });

            cont++;
            
        }
    }
};

function mostrar(pTipo){
    let tipo = document.getElementById(pTipo);

    inputBuscarActividades.value = '';
    inputBuscarLugares.value = '';

    if(tipo.value == 'Lugares'){
        document.getElementById("lugares").classList.add('visibilityVisible');
        document.getElementById("lugares").classList.remove('noneDisplay');
        document.getElementById("actividades").classList.remove('visibilityVisible');
        document.getElementById("actividades").classList.add('noneDisplay');
        document.getElementById("buscar").classList.remove('visibilityVisible');
        document.getElementById("buscar").classList.add('noneDisplay');
    }else if(tipo.value == 'Actividades'){
        document.getElementById("actividades").classList.add('visibilityVisible');
        document.getElementById("actividades").classList.remove('noneDisplay');
        document.getElementById("lugares").classList.remove('visibilityVisible');
        document.getElementById("lugares").classList.add('noneDisplay');
        document.getElementById("buscar").classList.remove('visibilityVisible');
        document.getElementById("buscar").classList.add('noneDisplay');
    }
};

function imprimirPerfilLugares(pBuscar, pProvincia, pCanton, pDistrito){
    let cards = document.getElementById('cardsLugares');
    if(!pBuscar){
        pBuscar = '';
    }
    if (!pProvincia) {
        pProvincia = '';
    }
    if ((!pCanton) || pCanton == 'Cantón') {
        pCanton = '';
    }
    if ((!pDistrito) || pDistrito == 'Distrito') {
        pDistrito = '';
    }
    cards.innerHTML = '';
    let cont = 0;

    for(let i = 0; i < listaLugares.length; i++){
        if (listaLugares[i]['aprobado'] == 'true' && listaLugares[i]['estado'] == 'true' && listaLugares[i]['ban'] == 'false' && listaLugares[i]['provincia'].includes(pProvincia) && listaLugares[i]['canton'].includes(pCanton) && listaLugares[i]['distrito'].includes(pDistrito) && listaLugares[i]['categorias'].includes(arregloCategorias)) {
            if(listaLugares[i]['nombre'].toLowerCase().includes(pBuscar.toLowerCase()) || listaLugares[i]['categorias'].toLowerCase().includes(pBuscar.toLowerCase()) || listaLugares[i]['descripcion'].toLowerCase().includes(pBuscar.toLowerCase()) || listaLugares[i]['provincia'].toLowerCase().includes(pBuscar.toLowerCase()) || listaLugares[i]['canton'].toLowerCase().includes(pBuscar.toLowerCase()) || listaLugares[i]['distrito'].toLowerCase().includes(pBuscar.toLowerCase()) || listaLugares[i]['etiquetas'].toLowerCase().includes(pBuscar.toLowerCase())){
                if(cont == 3){
                    cont = 0;
                }
                let card = document.createElement('div');
                let elementoFoto = document.createElement('img');
                let nombre = document.createElement('h1');
                let direccionExacta = document.createElement('h3');
                let descripcion = document.createElement('p');
                let ranking = document.createElement('div');
                let calificacion = document.createElement('h2');
                let estrella1 = document.createElement('i');
                let estrella2 = document.createElement('i');
                let estrella3 = document.createElement('i');
                let estrella4 = document.createElement('i');
                let estrella5 = document.createElement('i');
                let botonCalificar = document.createElement('button');
                let opciones = document.createElement('div');
                let botonCalificaciones = document.createElement('button');
                let botonSeguir = document.createElement('button');

                switch(cont){
                    case 0:
                        card.className = 'cardOrange';
                        botonCalificar.className = 'botonCalificarOrange';
                        botonCalificaciones.className = 'calificacionesOrange';
                        botonSeguir.className = 'botonSeguirOrange';
                        break;
                    case 1:
                        card.className = 'cardBlue';
                        botonCalificar.className = 'botonCalificarBlue';
                        botonCalificaciones.className = 'calificacionesBlue';
                        botonSeguir.className = 'botonSeguirBlue';
                        break;
                    case 2:
                        card.className = 'cardRed';
                        botonCalificar.className = 'botonCalificarRed';
                        botonCalificaciones.className = 'calificacionesRed';
                        botonSeguir.className = 'botonSeguirRed';
                        break;
                }

                elementoFoto.className = 'foto';
                nombre.className = 'nombreLugar';
                direccionExacta.className = 'direccionExacta';
                descripcion.className = 'descripcionLugar';
                ranking.className = 'ranking';
                calificacion.className = 'calificacion';
                let rating = calcularPromedio();
                estrella1.id = 'estrella';
                if (rating < 1) {
                    if (rating > 0.5) {
                        estrella1.className = 'far fa-star';
                    } else {
                        estrella1.className = 'fas fa-star-half-alt';
                    }
                } else {
                    estrella1.className = 'fas fa-star';
                }
                estrella1.id = 'estrella';
                if (rating < 2) {
                    if (rating < 1.5) {
                        estrella2.className = 'far fa-star';
                    } else {
                        estrella2.className = 'fas fa-star-half-alt';
                    }
                } else {
                    estrella2.className = 'fas fa-star';
                }
                if (rating < 3) {
                    if (rating < 2.5) {
                        estrella3.className = 'far fa-star';
                    } else {
                        estrella3.className = 'fas fa-star-half-alt';
                    }
                } else {
                    estrella3.className = 'fas fa-star';
                }
                if (rating < 4) {
                    if (rating < 3.5) {
                        estrella4.className = 'far fa-star';
                    } else {
                        estrella4.className = 'fas fa-star-half-alt';
                    }
                } else {
                    estrella4.className = 'fas fa-star';
                }
                if (rating < 5) {
                    if (rating < 4.5) {
                        estrella5.className = 'far fa-star';
                    } else {
                        estrella5.className = 'fas fa-star-half-alt';
                    }
                } else {
                    estrella5.className = 'fas fa-star';
                }
                opciones.className = 'opciones';

                function calcularPromedio() {
                    let ratingLugar = 0;
                    let contCalificaciones = 0;
                    if (!(listaLugares[i]['calificaciones'].length == 0)) {
                        for (let contComentarios = 0; contComentarios < listaLugares[i]['calificaciones'].length; contComentarios++) {
                            if (!(listaLugares[i]['calificaciones'][contComentarios]['calificacionCliente'] == undefined)) {
                                let calificacionLugar = listaLugares[i]['calificaciones'][contComentarios]['calificacionCliente'];
                                ratingLugar += Number(calificacionLugar);
                                contCalificaciones++;
                            }
                        }
                    }
                    if (contCalificaciones == 0) {
                        ratingLugar = 5;
                        contCalificaciones = 1;
                    }
                    return ratingLugar = Math.round(ratingLugar / contCalificaciones * 10) / 10;
                }

                let fotos = listaLugares[i]['fotos'];
                let posicion = fotos.indexOf(',');

                if(!(posicion == -1)){
                    fotos = fotos.slice(0, posicion);
                }
                if(fotos == ''){
                    fotos = 'imgs/foto.png';
                }

                let provincia = listaLugares[i]['provincia'];
                let canton = listaLugares[i]['canton'];
                let distrito = listaLugares[i]['distrito'] + ', ';

                if(distrito == 'No Existen Distritos, '){
                    distrito = '';
                }

                elementoFoto.src = fotos;
                nombre.innerHTML = listaLugares[i]['nombre'];
                direccionExacta.innerHTML = distrito + canton + ', ' + provincia;
                descripcion.innerHTML = listaLugares[i]['descripcion'];
                calificacion.innerHTML = rating;
                botonCalificar.innerHTML = 'Calificar';
                botonCalificaciones.innerHTML = 'Ver calificaciones y comentarios';
                botonSeguir.innerHTML = 'Seguir';

                botonCalificar.addEventListener('click', function(){
                    swal({
                        title: 'No se puede calificar el lugar',
                        text: 'Por favor inicie sesión',
                        type: 'warning',
                        confirmButtonText: 'Entendido'
                    });
                });

                botonCalificaciones.addEventListener('click', function(){
                    swal({
                        title: 'No se puede visualizar las calificaciones y comentarios del lugar',
                        text: 'Por favor inicie sesión',
                        type: 'warning',
                        confirmButtonText: 'Entendido'
                    });
                });

                botonSeguir.addEventListener('click', function(){
                    swal({
                        title: 'No se puede seguir el lugar',
                        text: 'Por favor inicie sesión',
                        type: 'warning',
                        confirmButtonText: 'Entendido'
                    });
                });

                cards.appendChild(card);
                card.appendChild(elementoFoto);
                card.appendChild(nombre);
                card.appendChild(direccionExacta);
                card.appendChild(descripcion);
                card.appendChild(ranking);
                ranking.appendChild(calificacion);
                ranking.appendChild(estrella1);
                ranking.appendChild(estrella2);
                ranking.appendChild(estrella3);
                ranking.appendChild(estrella4);
                ranking.appendChild(estrella5);
                ranking.appendChild(botonCalificar);
                card.appendChild(opciones);
                opciones.appendChild(botonCalificaciones);
                opciones.appendChild(botonSeguir);

                cont++;
                
            }
        }
    }
};

function noDesplegarPerfilLugares(){
    document.getElementById("cardsLugares").classList.remove('visibilityVisible');
    document.getElementById("cardsLugares").classList.add('noneDisplay');
    document.getElementById("noDesplegarLugares").classList.remove('visibilityVisible');
    document.getElementById("noDesplegarLugares").classList.add('noneDisplay');
    document.getElementById("desplegarLugares").classList.add('visibilityVisible');
    document.getElementById("desplegarLugares").classList.remove('noneDisplay');
};

function desplegarPerfilLugares(){
    document.getElementById("cardsLugares").classList.add('visibilityVisible');
    document.getElementById("cardsLugares").classList.remove('noneDisplay');
    document.getElementById("noDesplegarLugares").classList.add('visibilityVisible');
    document.getElementById("noDesplegarLugares").classList.remove('noneDisplay');
    document.getElementById("desplegarLugares").classList.remove('visibilityVisible');
    document.getElementById("desplegarLugares").classList.add('noneDisplay');
};

function noDesplegarBusquedaDeActividades(){
    document.getElementById("cardsActividades").classList.remove('visibilityVisible');
    document.getElementById("cardsActividades").classList.add('noneDisplay');
    document.getElementById("noDesplegarActividades").classList.remove('visibilityVisible');
    document.getElementById("noDesplegarActividades").classList.add('noneDisplay');
    document.getElementById("desplegarActividades").classList.add('visibilityVisible');
    document.getElementById("desplegarActividades").classList.remove('noneDisplay');
};

function desplegarBusquedaDeActividades(){
    document.getElementById("cardsActividades").classList.add('visibilityVisible');
    document.getElementById("cardsActividades").classList.remove('noneDisplay');
    document.getElementById("noDesplegarActividades").classList.add('visibilityVisible');
    document.getElementById("noDesplegarActividades").classList.remove('noneDisplay');
    document.getElementById("desplegarActividades").classList.remove('visibilityVisible');
    document.getElementById("desplegarActividades").classList.add('noneDisplay');
};

function imprimirListaCategoriasLugares() {

    for (let opcion = 0; opcion < listaCategoriasLugares.length; opcion++) {
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.value = listaCategoriasLugares[opcion]['Nombre'];
        nuevaOpcion.innerHTML = listaCategoriasLugares[opcion]['Nombre'];
        selectCategoria.options.add(nuevaOpcion);
    }

};

function buscarCategoriaLugar(pCategoriaLugar) {

    let categoriasLugares = document.getElementById(pCategoriaLugar);
    let selectedOption = categoriasLugares.options[categoriasLugares.selectedIndex].value;
    if (!(selectedOption == '')) {
        let search = inputCategorias.value.search(selectedOption);
        if (search == -1) {
            arregloCategorias[contCategorias] = selectedOption;
            contCategorias++;
            inputCategorias.value += selectedOption + ', ';
        }
    }

};

function removerCategoriasLugares() {

    arregloCategorias = [];
    contCategorias = 0;
    inputCategorias.value = '';

};

function popularCantones(pprovincias, pcantones, pdistritos) {

    let provincias = document.getElementById(pprovincias);
    let cantones = document.getElementById(pcantones);
    let distritos = document.getElementById(pdistritos);
    let opcionArreglo = [];

    cantones.innerHTML = '';
    if (provincias.value == '') {
        let opcionCanton = document.createElement('option');
        opcionCanton.value = '';
        opcionCanton.innerHTML = 'Cantón';
        cantones.options.add(opcionCanton);
    }
    distritos.innerHTML = '';
    let opcionDistrito = document.createElement('option');
    opcionDistrito.value = '';
    opcionDistrito.innerHTML = 'Distrito';
    distritos.options.add(opcionDistrito);

    if (provincias.value == 'San José') {
        opcionArreglo = ['|Cantón', 'sanJose|San José', 'escazu|Escazú', 'desamparados|Desamparados', 'puriscal|Puriscal', 'tarrazu|Tarrazú', 'aserri|Aserrí', 'mora|Mora', 'goicoechea|Goicoechea', 'santaAna|Santa Ana', 'alajuelita|Alajuelita', 'vasquezDeCoronado|Vásquez de Coronado', 'acosta|Acosta', 'tibas|Tibás', 'moravia|Moravia', 'montesDeOca|Montes de Oca', 'turrubares|Turrubares', 'dota|Dota', 'curridabat|Curridabat', 'perezZeledon|Pérez Zeledón', 'leonCortesCastro|León Cortés Castro'];
    } else if (provincias.value == 'Alajuela') {
        opcionArreglo = ['|Cantón', 'alajuela|Alajuela', 'sanRamon|San Ramón', 'grecia|Grecia', 'sanMateo|San Mateo', 'atenas|Atenas', 'naranjo|Naranjo', 'palmares|Palmares', 'poas|Poás', 'orotina|Orotina', 'sanCarlos|San Carlos', 'zarcero|Zarcero', 'valverdeVega|Valverde Vega', 'upala|Upala', 'losChiles|Los Chiles', 'guatuso|Guatuso', 'rioCuarto|Río Cuarto'];
    } else if (provincias.value == 'Cartago') {
        opcionArreglo = ['|Cantón', 'cartago|Cartago', 'paraiso|Paraíso', 'laUnion|La Unión', 'jimenez|Jiménez', 'turrialba|Turrialba', 'alvarado|Alvarado', 'oreamuno|Oreamuno', 'elGuarco|El Guarco'];
    } else if (provincias.value == 'Heredia') {
        opcionArreglo = ['|Cantón', 'heredia|Heredia', 'barva|Barva', 'santoDomingo|Santo Domingo', 'santaBarbara|Santa Bárbara', 'sanRafael|San Rafael', 'sanIsidro|San Isidro', 'belen|Belén', 'flores|Flores', 'sanPablo|San Pablo', 'sarapiqui|Sarapiquí'];
    } else if (provincias.value == 'Puntarenas') {
        opcionArreglo = ['|Cantón', 'puntarenas|Puntarenas', 'esparza|Esparza', 'buenosAires|Buenos Aires', 'montesDeOro|Montes de Oro', 'osa|Osa', 'quepos|Quepos', 'golfito|Golfito', 'cotoBrus|Coto Brus', 'parrita|Parrita', 'corredores|Corredores', 'garabito|Garabito'];
    } else if (provincias.value == 'Guanacaste') {
        opcionArreglo = ['|Cantón', 'liberia|Liberia', 'nicoya|Nicoya', 'santaCruz|Santa Cruz', 'bagaces|Bagaces', 'carrillo|Carrillo', 'canas|Cañas', 'abangares|Abangares', 'tilaran|Tilarán', 'nandayure|Nandayure', 'laCruz|La Cruz', 'hojancha|Hojancha'];
    } else if (provincias.value == 'Limón') {
        opcionArreglo = ['|Cantón', 'limon|Limón', 'pococi|Pococí', 'siquirres|Siquirres', 'talamanca|Talamanca', 'matina|Matina', 'guacimo|Guácimo'];
    }

    for (let opcion = 0; opcion < opcionArreglo.length; opcion++) {
        let par = opcionArreglo[opcion].split('|');
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.value = par[1];
        nuevaOpcion.innerHTML = par[1];
        cantones.options.add(nuevaOpcion);
    }

};

function popularDistritos(pcantones, pdistritos) {

    let cantones = document.getElementById(pcantones);
    let distritos = document.getElementById(pdistritos);
    let opcionArreglo = [];

    distritos.innerHTML = '';

    if (cantones.value == 'San José') {
        opcionArreglo = ['|Distrito', 'carmen|Carmen', 'merced|Merced', 'hospital|Hospital', 'catedral|Catedral', 'zapote|Zapote', 'sanFranciscoDeDosRios|San Francisco de Dos Ríos', 'uruca|Uruca', 'mataRedonda|Mata Redonda', 'pavas|Pavas', 'hatillo|Hatillo', 'sanSebastian|San Sebastián'];
    } else if (cantones.value == 'Escazú') {
        opcionArreglo = ['|Distrito', 'escazu|Escazú', 'sanAntonio|San Antonio', 'sanRafael|San Rafael'];
    } else if (cantones.value == 'Desamparados') {
        opcionArreglo = ['|Distrito', 'desamparados|Desamparados', 'sanMiguel|San Miguel', 'sanJuanDeDios|San Juan de Dios', 'sanRafaelArriba|San Rafael Arriba', 'sanAntonio|San Antonio', 'frailes|Frailes', 'patarra|Patarrá', 'sanCristobal|San Cristóbal', 'rosario|Rosario', 'damas|Damas', 'sanRafaelAbajo|San Rafael Abajo', 'gravilias|Gravilias', 'losGuido|Los Guido'];
    } else if (cantones.value == 'Puriscal') {
        opcionArreglo = ['|Distrito', 'santiago|Santiago', 'mercedesSur|Mercedes Sur', 'barbacoas|Barbacoas', 'grifoAlto|Grifo Alto', 'sanRafael|San Rafael', 'candelarita|Candelarita', 'desamparaditos|Desamparaditos', 'sanAntonio|San Antonio', 'chires|Chires'];
    } else if (cantones.value == 'Tarrazú') {
        opcionArreglo = ['|Distrito', 'sanMarcos|San Marcos', 'sanLorenzo|San Lorenzo', 'sanCarlos|San Carlos'];
    } else if (cantones.value == 'Aserrí') {
        opcionArreglo = ['|Distrito', 'aserri|Aserrí', 'tarbaca|Tarbaca', 'vueltaDeJorco|Vuelta de Jorco', 'sanGabriel|San Gabriel', 'legua|Legua', 'monterrey|Monterrey', 'salitrillos|Salitrillos'];
    } else if (cantones.value == 'Mora') {
        opcionArreglo = ['|Distrito', 'colon|Colón', 'guayabo|Guayabo', 'tabarcia|Tabarcia', 'piedrasNegras|Piedras Negras', 'picagres|Picagres', 'jaris|Jaris'];
    } else if (cantones.value == 'Goicoechea') {
        opcionArreglo = ['|Distrito', 'guadalupe|Guadalupe', 'sanFrancisco|San Francisco', 'calleBlancos|Calle Blancos', 'mataDePlatano|Mata de Plátano', 'ipis|Ipís', 'ranchoRedondo|Rancho Redondo', 'purral|Purral'];
    } else if (cantones.value == 'Santa Ana') {
        opcionArreglo = ['|Distrito', 'santaAna|Santa Ana', 'salitral|Salitral', 'pozos|Pozos', 'uruca|Uruca', 'piedades|Piedades', 'brasil|Brasil'];
    } else if (cantones.value == 'Alajuelita') {
        opcionArreglo = ['|Distrito', 'alajuelita|Alajuelita', 'sanJosecito|San Josecito', 'sanAntonio|San Antonio', 'concepcion|Concepción', 'sanFelipe|San Felipe'];
    } else if (cantones.value == 'Vásquez de Coronado') {
        opcionArreglo = ['|Distrito', 'sanIsidro|San Isidro', 'sanRafael|San Rafael', 'dulceNombreDeJesus|Dulce Nombre de Jesús', 'patalillo|Patalillo', 'cascajal|Cascajal'];
    } else if (cantones.value == 'Acosta') {
        opcionArreglo = ['|Distrito', 'sanIgnacio|San Ignacio', 'guaitil|Guaitil', 'palmichal|Palmichal', 'cangrejal|Cangrejal', 'sabanillas|Sabanillas'];
    } else if (cantones.value == 'Tibás') {
        opcionArreglo = ['|Distrito', 'sanJuan|San Juan', 'cincoEsquinas|Cinco Esquinas', 'anselmoLlorente|Anselmo Llorente', 'leonXIII|León XIII', 'colima|Colima'];
    } else if (cantones.value == 'Moravia') {
        opcionArreglo = ['|Distrito', 'sanVicente|San Vicente', 'laTrinidad|La Trinidad', 'sanJeronimo|San Jerónimo'];
    } else if (cantones.value == 'Montes de Oca') {
        opcionArreglo = ['|Distrito', 'sanPedro|San Pedro', 'sabanilla|Sabanilla', 'mercedes|Mercedes', 'sanRafael|San Rafael'];
    } else if (cantones.value == 'Turrubares') {
        opcionArreglo = ['|Distrito', 'sanPablo|San Pablo', 'sanPedro|San Pedro', 'sanJuanDeMata|San Juan de Mata', 'sanLuis|San Luis', 'carara|Carara'];
    } else if (cantones.value == 'Dota') {
        opcionArreglo = ['|Distrito', 'santaMaría|Santa María', 'jardin|Jardín', 'copey|Copey'];
    } else if (cantones.value == 'Curridabat') {
        opcionArreglo = ['|Distrito', 'curridabat|Curridabat', 'granadilla|Granadilla', 'sanchez|Sánchez', 'tirrases|Tirrases'];
    } else if (cantones.value == 'Pérez Zeledón') {
        opcionArreglo = ['|Distrito', 'sanIsidro|San Isidro', 'generalViejo|General Viejo', 'danielFlores|Daniel Flores', 'rivas|Rivas', 'sanPedro|San Pedro', 'platanares|Platanares', 'pejibaye|Pejibaye', 'cajon|Cajón', 'baru|Barú', 'rioNuevo|Río Nuevo', 'paramo|Páramo'];
    } else if (cantones.value == 'León Cortés Castro') {
        opcionArreglo = ['|Distrito', 'sanPablo|San Pablo', 'sanAndres|San Andrés', 'llanoBonito|Llano Bonito', 'sanIsidro|San Isidro', 'santaCruz|Santa Cruz', 'sanAntonio|San Antonio'];
    } else if (cantones.value == 'Alajuela') {
        opcionArreglo = ['|Distrito', 'alajuela|Alajuela', 'sanJose|San José', 'carrizal|Carrizal', 'sanAntonio|San Antonio', 'guacima|Guácima', 'sanIsidro|San Isidro', 'sabanilla|Sabanilla', 'sanRafael|San Rafael', 'rioSegundo|Río Segundo', 'desamparados|Desamparados', 'turrucares|Turrúcares', 'tambor|Tambor', 'garita|Garita', 'sarapiqui|Sarapiquí'];
    } else if (cantones.value == 'San Ramón') {
        opcionArreglo = ['|Distrito', 'sanRamon|San Ramón', 'santiago|Santiago', 'sanJuan|San Juan', 'piedadesNorte|Piedades Norte', 'piedadesSur|Piedades Sur', 'sanRafael|San Rafael', 'sanIsidro|San Isidro', 'losAngeles|Los Ángeles', 'alfaro|Alfaro', 'volio|Volio', 'concepcion|Concepción', 'zapotal|Zapotal', 'penasBlancas|Peñas Blancas'];
    } else if (cantones.value == 'Grecia') {
        opcionArreglo = ['|Distrito', 'grecia|Grecia', 'sanIsidro|San Isidro', 'sanJose|San José', 'sanRoque|San Roque', 'tacares|Tacares', 'rioCuarto|Río Cuarto', 'puenteDePiedra|Puente de Piedra', 'bolivar|Bolívar'];
    } else if (cantones.value == 'San Mateo') {
        opcionArreglo = ['|Distrito', 'sanMateo|San Mateo', 'desmonte|Desmonte', 'jesusMaria|Jesús María', 'labrador|Labrador'];
    } else if (cantones.value == 'Atenas') {
        opcionArreglo = ['|Distrito', 'atenas|Atenas', 'jesus|Jesús', 'mercedes|Mercedes', 'sanIsidro|San Isidro', 'concepcion|Concepción', 'sanJose|San José', 'santaEulalia|Santa Eulalia', 'escobal|Escobal'];
    } else if (cantones.value == 'Naranjo') {
        opcionArreglo = ['|Distrito', 'naranjo|Naranjo', 'sanMiguel|San Miguel', 'sanJose|San José', 'cirriSur|Cirrí Sur', 'sanJeronimo|San Jerónimo', 'sanJuan|San Juan', 'elRosario|El Rosario', 'palmitos|Palmitos'];
    } else if (cantones.value == 'Palmares') {
        opcionArreglo = ['|Distrito', 'palmares|Palmares', 'zaragoza|Zaragoza', 'buenosAires|Buenos Aires', 'santiago|Santiago', 'candelaria|Candelaria', 'esquipulas|Esquipulas', 'laGranja|La Granja'];
    } else if (cantones.value == 'Poás') {
        opcionArreglo = ['|Distrito', 'sanPedro|San Pedro', 'sanJuan|San Juan', 'sanRafael|San Rafael', 'carrillos|Carrillos', 'sabanaRedonda|Sabana Redonda'];
    } else if (cantones.value == 'Orotina') {
        opcionArreglo = ['|Distrito', 'orotina|Orotina', 'mastate|Mastate', 'haciendaVieja|Hacienda Vieja', 'coyolar|Coyolar', 'laCeiba|La Ceiba'];
    } else if (cantones.value == 'San Carlos') {
        opcionArreglo = ['|Distrito', 'quesada|Quesada', 'florencia|Florencia', 'buenavista|Buenavista', 'aguasZarcas|Aguas Zarcas', 'venecia|Venecia', 'pital|Pital', 'laFortuna|La Fortuna', 'laTigra|La Tigra', 'laPalmera|La Palmera', 'venado|Venado', 'cutris|Cutris', 'monterrey|Monterrey', 'pocosol|Pocosol'];
    } else if (cantones.value == 'Zarcero') {
        opcionArreglo = ['|Distrito', 'zarcero|Zarcero', 'laguna|Laguna', 'tapesco|Tapesco', 'guadalupe|Guadalupe', 'palmira|Palmira', 'zapote|Zapote', 'brisas|Brisas'];
    } else if (cantones.value == 'Valverde Vega') {
        opcionArreglo = ['|Distrito', 'sarchiNorte|Sarchí Norte', 'sarchiSur|Sarchí Sur', 'toroAmarillo|Toro Amarillo', 'sanPedro|San Pedro', 'rodriguez|Rodríguez'];
    } else if (cantones.value == 'Upala') {
        opcionArreglo = ['|Distrito', 'upala|Upala', 'aguasClaras|Aguas Claras', 'SanJoseOPizote|San José O Pizote', 'bijagua|Bijagua', 'delicias|Delicias', 'dosRios|Dos Ríos', 'yoliyllal|Yoliyllal', 'canalete|Canalete'];
    } else if (cantones.value == 'Los Chiles') {
        opcionArreglo = ['|Distrito', 'losChiles|Los Chiles', 'canoNegro|Caño Negro', 'elAmparo|El Amparo', 'sanJorge|San Jorge'];
    } else if (cantones.value == 'Guatuso') {
        opcionArreglo = ['|Distrito', 'sanRafael|San Rafael', 'buenavista|Buenavista', 'cote|Cote', 'katira|Katira'];
    } else if (cantones.value == 'Río Cuarto') {
        opcionArreglo = ['|Distrito', 'rioCuarto|Río Cuarto'];
    } else if (cantones.value == 'Cartago') {
        opcionArreglo = ['|Distrito', 'oriental|Oriental', 'occidental|Occidental', 'carmen|Carmen', 'sanNicolas|San Nicolás', 'aguacaliente|Aguacaliente', 'guadalupe|Guadalupe', 'corralillo|Corralillo', 'tierraBlanca|Tierra Blanca', 'dulceNombre|Dulce Nombre', 'llanoGrande|Llano Grande', 'quebradilla|Quebradilla'];
    } else if (cantones.value == 'Paraíso') {
        opcionArreglo = ['|Distrito', 'paraiso|Paraíso', 'santiago|Santiago', 'orosi|Orosi', 'cachi|Cachí', 'llanosDeSantaLucia|Llanos de Santa Lucía'];
    } else if (cantones.value == 'La Unión') {
        opcionArreglo = ['|Distrito', 'tresRios|Tres Ríos', 'sanDiego|San Diego', 'sanJuan|San Juan', 'sanRafael|San Rafael', 'concepcion|Concepción', 'dulceNombre|Dulce Nombre', 'sanRamon|San Ramón', 'rioAzul|Río Azul'];
    } else if (cantones.value == 'Jiménez') {
        opcionArreglo = ['|Distrito', 'juanVinas|Juan Viñas', 'tucurrique|Tucurrique', 'pejibaye|Pejibaye'];
    } else if (cantones.value == 'Turrialba') {
        opcionArreglo = ['|Distrito', 'turrialba|Turrialba', 'laSuiza|La Suiza', 'peralta|Peralta', 'santaCruz|Santa Cruz', 'santaTeresita|Santa Teresita', 'pavones|Pavones', 'tuis|Tuis', 'tayutic|Tayutic', 'santaRosa|Santa Rosa', 'tresEquis|Tres Equis', 'laIsabel|La Isabel', 'chirripo|Chirripó'];
    } else if (cantones.value == 'Alvarado') {
        opcionArreglo = ['|Distrito', 'pacayas|Pacayas', 'cervantes|Cervantes', 'capellades|Capellades'];
    } else if (cantones.value == 'Oreamuno') {
        opcionArreglo = ['|Distrito', 'sanRafael|San Rafael', 'cot|Cot', 'potreroCerrado|Potrero Cerrado', 'cipreses|Cipreses', 'santaRosa|Santa Rosa'];
    } else if (cantones.value == 'El Guarco') {
        opcionArreglo = ['|Distrito', 'elTejar|El Tejar', 'sanIsidro|San Isidro', 'tobosi|Tobosi', 'patioDeAgua|Patio de Agua'];
    } else if (cantones.value == 'Heredia') {
        opcionArreglo = ['|Distrito', 'heredia|Heredia', 'mercedes|Mercedes', 'sanFrancisco|San Francisco', 'ulloa|Ulloa', 'varablanca|Varablanca'];
    } else if (cantones.value == 'Barva') {
        opcionArreglo = ['|Distrito', 'barva|Barva', 'sanPedro|San Pedro', 'sanPablo|San Pablo', 'sanRoque|San Roque', 'santaLucia|Santa Lucía', 'sanJoseDeLaMontana|San Jose de la Montaña'];
    } else if (cantones.value == 'Santo Domingo') {
        opcionArreglo = ['|Distrito', 'santoDomingo|Santo Domingo', 'sanVicente|San Vicente', 'sanMiguel|San Miguel', 'paracito|Paracito', 'santoTomas|Santo Tomás', 'santaRosa|Santa Rosa', 'tures|Tures', 'para|Pará'];
    } else if (cantones.value == 'Santa Bárbara') {
        opcionArreglo = ['|Distrito', 'santaBarbara|Santa Bárbara', 'sanPedro|San Pedro', 'sanJuan|San Juan', 'jesus|Jesús', 'santoDomingo|Santo Domingo', 'puraba|Purabá'];
    } else if (cantones.value == 'San Rafael') {
        opcionArreglo = ['|Distrito', 'sanRafael|San Rafael', 'sanJosecito|San Josecito', 'santiago|Santiago', 'losAngeles|Los Ángeles', 'concepcion|Concepción'];
    } else if (cantones.value == 'San Isidro') {
        opcionArreglo = ['|Distrito', 'sanIsidro|San Isidro', 'sanJose|San José', 'concepcion|Concepción', 'sanFrancisco|San Francisco'];
    } else if (cantones.value == 'Belén') {
        opcionArreglo = ['|Distrito', 'sanAntonio|San Antonio', 'laRibera|La Ribera', 'laAsuncion|La Asunción'];
    } else if (cantones.value == 'Flores') {
        opcionArreglo = ['|Distrito', 'sanJoaquin|San Joaquín', 'barrantes|Barrantes', 'llorente|Llorente'];
    } else if (cantones.value == 'San Pablo') {
        opcionArreglo = ['noDistritos|No Existen Distritos'];
    } else if (cantones.value == 'Sarapiquí') {
        opcionArreglo = ['|Distrito', 'puertoViejo|Puerto Viejo', 'laVirgen|La Virgen', 'horquetas|Horquetas', 'llanurasDelGaspar|Llanuras del Gaspar', 'curena|Cureña'];
    } else if (cantones.value == 'Puntarenas') {
        opcionArreglo = ['|Distrito', 'puntarenas|Puntarenas', 'pitahaya|Pitahaya', 'chomes|Chomes', 'lepanto|Lepanto', 'paquera|Paquera', 'manzanillo|Manzanillo', 'guacimal|Guacimal', 'barranca|Barranca', 'monteverde|Monteverde', 'islaDeCoco|Isla de Coco', 'cobano|Cóbano', 'chacarita|Chacarita', 'islaChira|Isla Chira', 'acapulco|Acapulco', 'elRoble|El Roble', 'arancibia|Arancibia'];
    } else if (cantones.value == 'Esparza') {
        opcionArreglo = ['|Distrito', 'espirituSanto|Espíritu Santo', 'sanJuanGrande|San Juan Grande', 'macacona|Macacona', 'sanRafael|San Rafael', 'sanJeronimo|San Jerónimo', 'caldera|Caldera'];
    } else if (cantones.value == 'Buenos Aires') {
        opcionArreglo = ['|Distrito', 'buenosAires|Buenos Aires', 'volcan|Volcán', 'potreroGrande|Potrero Grande', 'boruca|Boruca', 'pilas|Pilas', 'colinas|Colinas', 'changuena|Chánguena', 'biolley|Biolley', 'brunka|Brunka'];
    } else if (cantones.value == 'Montes de Oro') {
        opcionArreglo = ['|Distrito', 'miramar|Miramar', 'laUnion|La Unión', 'sanIsidro|San Isidro'];
    } else if (cantones.value == 'Osa') {
        opcionArreglo = ['|Distrito', 'cortes|Cortés', 'palmar|Palmar', 'sierpe|Sierpe', 'bahiaBallena|Bahía Ballena', 'piedrasBlancas|Piedras Blancas', 'bahiaDrake|Bahía Drake'];
    } else if (cantones.value == 'Quepos') {
        opcionArreglo = ['|Distrito', 'quepos|Quepos', 'savegre|Savegre', 'naranjito|Naranjito'];
    } else if (cantones.value == 'Golfito') {
        opcionArreglo = ['|Distrito', 'golfito|Golfito', 'puertoJimenez|Puerto Jiménez', 'guaycara|Guaycará', 'pavon|Pavón'];
    } else if (cantones.value == 'Coto Brus') {
        opcionArreglo = ['|Distrito', 'sanVito|San Vito', 'sabalito|Sabalito', 'aguaBuena|Agua Buena', 'limoncito|Limoncito', 'pittier|Pittier', 'gutierrezBraun|Gutíerrez Braun'];
    } else if (cantones.value == 'Parrita') {
        opcionArreglo = ['noDistritos|No Existen Distritos'];
    } else if (cantones.value == 'Corredores') {
        opcionArreglo = ['|Distrito', 'corridor|Corridor', 'laCuestaDeCorredores|La Cuesta de Corredores', 'canoasDeCorredores|Canoas de Corredores', 'laurelDeCorredores|Laurel de Corredores'];
    } else if (cantones.value == 'Garabito') {
        opcionArreglo = ['|Distrito', 'jaco|Jacó', 'tarcoles|Tárcoles'];
    } else if (cantones.value == 'Liberia') {
        opcionArreglo = ['|Distrito', 'liberia|Liberia', 'canasDulces|Cañas Dulces', 'mayorga|Mayorga', 'nacascolo|Nacascolo', 'curubande|Curubandé'];
    } else if (cantones.value == 'Nicoya') {
        opcionArreglo = ['|Distrito', 'nicoya|Nicoya', 'mansion|Mansión', 'sanAntonio|San Antonio', 'quebradaHonda|Quebrada Honda', 'sámara|Sámara', 'nosara|Nosara', 'belenDeNosarita|Belén de Nosarita'];
    } else if (cantones.value == 'Santa Cruz') {
        opcionArreglo = ['|Distrito', 'santaCruz|Santa Cruz', 'bolson|Bolsón', 'veintisieteDeAbril|Veintisiete de Abril', 'tempate|Tempate', 'cartagena|Cartagena', 'cuajiniquil|Cuajiniquil', 'diria|Diriá', 'caboVelas|Cabo Velas', 'tamarindo|Tamarindo'];
    } else if (cantones.value == 'Bagaces') {
        opcionArreglo = ['|Distrito', 'bagaces|Bagaces', 'laFortuna|La Fortuna', 'mogote|Mogote', 'rioNaranjo|Río Naranjo'];
    } else if (cantones.value == 'Carrillo') {
        opcionArreglo = ['|Distrito', 'filadelfia|Filadelfia', 'palmira|Palmira', 'sardinal|Sardinal', 'belen|Belén'];
    } else if (cantones.value == 'Cañas') {
        opcionArreglo = ['|Distrito', 'canas|Cañas', 'palmira|Palmira', 'sanMiguel|San Miguel', 'bebedero|Bebedero', 'porozal|Porozal'];
    } else if (cantones.value == 'Abangares') {
        opcionArreglo = ['|Distrito', 'juntas|Juntas', 'sierra|Sierra', 'sanJuan|San Juan', 'colorado|Colorado'];
    } else if (cantones.value == 'Tilarán') {
        opcionArreglo = ['|Distrito', 'tilaran|Tilarán', 'quebradaGrande|Quebrada Grande', 'tronadora|Tronadora', 'santaRosa|Santa Rosa', 'libano|Líbano', 'tierrasMorenas|Tierras Morenas', 'arenal|Arenal'];
    } else if (cantones.value == 'Nandayure') {
        opcionArreglo = ['|Distrito', 'carmona|Carmona', 'santaRita|Santa Rita', 'zapotal|Zapotal', 'sanPablo|San Pablo', 'porvenir|Porvenir', 'bejuco|Bejuco'];
    } else if (cantones.value == 'La Cruz') {
        opcionArreglo = ['|Distrito', 'laCruz|La Cruz', 'santaCecilia|Santa Cecilia', 'laGarita|La Garita', 'santaElena|Santa Elena'];
    } else if (cantones.value == 'Hojancha') {
        opcionArreglo = ['|Distrito', 'hojancha|Hojancha', 'monteRomo|Monte Romo', 'puertoCarrillo|Puerto Carrillo', 'huacas|Huacas'];
    } else if (cantones.value == 'Limón') {
        opcionArreglo = ['|Distrito', 'limon|Limón', 'valleLaEstrella|Valle La Estrella', 'rioBlanco|Río Blanco', 'matama|Matama'];
    } else if (cantones.value == 'Pococí') {
        opcionArreglo = ['|Distrito', 'guapiles|Guápiles', 'jimenez|Jiménez', 'laRita|La Rita', 'roxana|Roxana', 'cariari|Cariari', 'colorado|Colorado', 'laColonia|La Colonia'];
    } else if (cantones.value == 'Siquirres') {
        opcionArreglo = ['|Distrito', 'siquirres|Siquirres', 'pacuarito|Pacuarito', 'florida|Florida', 'germania|Germania', 'cairo|Cairo', 'alegria|Alegría'];
    } else if (cantones.value == 'Talamanca') {
        opcionArreglo = ['|Distrito', 'bratsi|Bratsi', 'sixaola|Sixaola', 'cahuita|Cahuita', 'telire|Telire'];
    } else if (cantones.value == 'Matina') {
        opcionArreglo = ['|Distrito', 'matina|Matina', 'batan|Batán', 'carrandi|Carrandi'];
    } else if (cantones.value == 'Guácimo') {
        opcionArreglo = ['|Distrito', 'guacimo|Guácimo', 'mercedes|Mercedes', 'pocora|Pocora', 'rioJimenez|Río Jiménez', 'duacari|Duacarí'];
    }

    for (let opcion = 0; opcion < opcionArreglo.length; opcion++) {
        let par = opcionArreglo[opcion].split('|');
        let nuevaOpcion = document.createElement('option');
        nuevaOpcion.value = par[1];
        nuevaOpcion.innerHTML = par[1];
        distritos.options.add(nuevaOpcion);
    }

};

function imprimirBusquedaDeActividadesFiltradas() {

    let cards = document.getElementById('cardsActividades');

    if (!inputBuscarActividades.value) {
        inputBuscarActividades.value = '';
    }
    cards.innerHTML = '';

    let cont = 0;

    for (let i = 0; i < listaActividades.length; i++) {
        if(document.querySelector('#ActividadesGratis').checked== false && fechaMin.value === ''  && fechaMaxima.value === ''){
            if(listaActividades[i]['estado'] == 'true' && listaActividades[i]['ban'] == 'false'){
                if (listaActividades[i]['nombre'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['descripcion'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['fecha'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['actividadGratis'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['precio'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['tipoMoneda'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['lugar'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['etiquetas'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase())) {
        
                    let card = document.createElement('div');
                    let elementoFoto = document.createElement('img');
                    let id = document.createElement('h2');
                    let nombre = document.createElement('h1');
                    let descripcion = document.createElement('h3');
                    let lugar = document.createElement('h3');
                    let fecha = document.createElement('h3');
                    let precio = document.createElement('h2');
                    let botonVerMas = document.createElement('a');
        
                    if (cont == 4) {
                        cont = 0;
                    }
        
                    switch (cont) {
                        case 0:
                            card.className = 'cardNaranja';
                            botonVerMas.className = 'buttonVerMasNaranja';
                            break;
                        case 1:
                            card.className = 'cardAzul';
                            botonVerMas.className = 'buttonVerMasAzul';
                            break;
                        case 2:
                            card.className = 'cardVerde';
                            botonVerMas.className = 'buttonVerMasVerde';
                            break;
                        case 3:
                            card.className = 'cardRojo';
                            botonVerMas.className = 'buttonVerMasRojo';
                    }
        
                    elementoFoto.className = 'fotos';
                    nombre.className = 'nombre';
                    descripcion.className = 'descripcion';
                    lugar.className = 'lugar';
                    fecha.className = 'fecha';
                    precio.className = 'precio';
        
        
                    let fotos = listaActividades[i]['fotos'];
                    let posicion = fotos.indexOf(',');
        
                    if (!(posicion == -1)) {
                        fotos = fotos.slice(0, posicion);
                    }
                    if (fotos == '') {
                        fotos = 'imgs/foto.png';
                    }
        
                    let idActividad = listaActividades[i]['_id'];
                    let nombreActividad = listaActividades[i]['nombre'];
                    let descripcionActividad = listaActividades[i]['descripcion'];
                    let lugarActividad = listaActividades[i]['lugar'];
                    let fechaActividad = listaActividades[i]['fecha'];
                    let actividadGratis = listaActividades[i]['actividadGratis'];
                    let precioActividad = listaActividades[i]['precio'];
                    let tipoMoneda = listaActividades[i]['tipoMoneda'];
        
        
        
                    if (actividadGratis == 'Gratis') {
                        precioActividad = actividadGratis;
                    } else {
                        precioActividad = tipoMoneda + precioActividad;
                    }
        
                    elementoFoto.src = fotos;
                    nombre.innerHTML = nombreActividad;
                    descripcion.innerHTML = descripcionActividad;
                    lugar.innerHTML = lugarActividad;
                    fecha.innerHTML = fechaActividad;
                    precio.innerHTML = precioActividad;
                    botonVerMas.innerHTML = 'Ver actividad';
        
                    cards.appendChild(card);
                    card.appendChild(elementoFoto);
                    card.appendChild(nombre);
                    card.appendChild(descripcion);
                    card.appendChild(lugar);
                    card.appendChild(fecha);
                    card.appendChild(precio);
                    card.appendChild(botonVerMas);
        
                    botonVerMas.addEventListener('click', function(){
                        swal({
                            title: 'No se puede visualizar la actividad',
                            text: 'Por favor inicie sesión',
                            type: 'warning',
                            confirmButtonText: 'Entendido'
                        });
                    });
        
                    cont++;
        
                }
            }
        
        
            }else if(!(fechaMin.value== '') && !(fechaMaxima.value== '') && !(document.querySelector('#ActividadesGratis').checked== true)){
        if(listaActividades[i]['fecha'] >= fechaMin.value && listaActividades[i]['fecha'] <= fechaMaxima.value && listaActividades[i]['estado'] == 'true' && listaActividades[i]['ban'] == 'false'){
        if (listaActividades[i]['nombre'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['descripcion'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['fecha'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['actividadGratis'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['precio'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['tipoMoneda'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['lugar'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['etiquetas'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase())) {
                let card = document.createElement('div');
                let elementoFoto = document.createElement('img');
                let id = document.createElement('h2');
                let nombre = document.createElement('h1');
                let descripcion = document.createElement('h3');
                let lugar = document.createElement('h3');
                let fecha = document.createElement('h3');
                let precio = document.createElement('h2');
                let botonVerMas = document.createElement('a');

                if (cont == 4) {
                    cont = 0;
                }

                switch (cont) {
                    case 0:
                        card.className = 'cardNaranja';
                        botonVerMas.className = 'buttonVerMasNaranja';
                        break;
                    case 1:
                        card.className = 'cardAzul';
                        botonVerMas.className = 'buttonVerMasAzul';
                        break;
                    case 2:
                        card.className = 'cardVerde';
                        botonVerMas.className = 'buttonVerMasVerde';
                        break;
                    case 3:
                        card.className = 'cardRojo';
                        botonVerMas.className = 'buttonVerMasRojo';
                }

                elementoFoto.className = 'fotos';
                nombre.className = 'nombre';
                descripcion.className = 'descripcion';
                lugar.className = 'lugar';
                fecha.className = 'fecha';
                precio.className = 'precio';


                let fotos = listaActividades[i]['fotos'];
                let posicion = fotos.indexOf(',');

                if (!(posicion == -1)) {
                    fotos = fotos.slice(0, posicion);
                }
                if (fotos == '') {
                    fotos = 'imgs/foto.png';
                }

                let idActividad = listaActividades[i]['_id'];
                let nombreActividad = listaActividades[i]['nombre'];
                let descripcionActividad = listaActividades[i]['descripcion'];
                let lugarActividad = listaActividades[i]['lugar'];
                let fechaActividad = listaActividades[i]['fecha'];
                let actividadGratis = listaActividades[i]['actividadGratis'];
                let precioActividad = listaActividades[i]['precio'];
                let tipoMoneda = listaActividades[i]['tipoMoneda'];



                if (actividadGratis == 'Gratis') {
                    precioActividad = actividadGratis;
                } else {
                    precioActividad = tipoMoneda + precioActividad;
                }

                elementoFoto.src = fotos;
                nombre.innerHTML = nombreActividad;
                descripcion.innerHTML = descripcionActividad;
                lugar.innerHTML = lugarActividad;
                fecha.innerHTML = fechaActividad;
                precio.innerHTML = precioActividad;
                botonVerMas.innerHTML = 'Ver actividad';

                cards.appendChild(card);
                card.appendChild(elementoFoto);
                card.appendChild(nombre);
                card.appendChild(descripcion);
                card.appendChild(lugar);
                card.appendChild(fecha);
                card.appendChild(precio);
                card.appendChild(botonVerMas);

                botonVerMas.addEventListener('click', function(){
                    swal({
                        title: 'No se puede visualizar la actividad',
                        text: 'Por favor inicie sesión',
                        type: 'warning',
                        confirmButtonText: 'Entendido'
                    });
                });


                cont++;
            }
        }
    }else if(!(document.querySelector('#ActividadesGratis').checked== false) && !(fechaMin.value === '') && !(fechaMaxima.value === '')){
     if(listaActividades[i]['fecha'] >= fechaMin.value && listaActividades[i]['fecha'] <= fechaMaxima.value && listaActividades[i]['estado'] == 'true' && listaActividades[i]['ban'] == 'false'){
        if (listaActividades[i]['actividadGratis'] == "Gratis" && listaActividades[i]['estado'] == 'true' && listaActividades[i]['ban'] == 'false') {
            if (listaActividades[i]['nombre'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['descripcion'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['fecha'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['actividadGratis'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['precio'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['tipoMoneda'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['lugar'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['etiquetas'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase())) {

                    let card = document.createElement('div');
                    let elementoFoto = document.createElement('img');
                    let id = document.createElement('h2');
                    let nombre = document.createElement('h1');
                    let descripcion = document.createElement('h3');
                    let lugar = document.createElement('h3');
                    let fecha = document.createElement('h3');
                    let precio = document.createElement('h2');
                    let botonVerMas = document.createElement('a');

                    if (cont == 4) {
                        cont = 0;
                    }

                    switch (cont) {
                        case 0:
                            card.className = 'cardNaranja';
                            botonVerMas.className = 'buttonVerMasNaranja'
                            break;
                        case 1:
                            card.className = 'cardAzul';
                            botonVerMas.className = 'buttonVerMasAzul'
                            break;
                        case 2:
                            card.className = 'cardVerde';
                            botonVerMas.className = 'buttonVerMasVerde'
                            break;
                        case 3:
                            card.className = 'cardRojo';
                            botonVerMas.className = 'buttonVerMasRojo'
                    }

                    elementoFoto.className = 'fotos';
                    nombre.className = 'nombre';
                    descripcion.className = 'descripcion';
                    lugar.className = 'lugar';
                    fecha.className = 'fecha';
                    precio.className = 'precio';


                    let fotos = listaActividades[i]['fotos'];
                    let posicion = fotos.indexOf(',');

                    if (!(posicion == -1)) {
                        fotos = fotos.slice(0, posicion);
                    }
                    if (fotos == '') {
                        fotos = 'imgs/foto.png';
                    }

                    let idActividad = listaActividades[i]['_id'];
                    let nombreActividad = listaActividades[i]['nombre'];
                    let descripcionActividad = listaActividades[i]['descripcion'];
                    let lugarActividad = listaActividades[i]['lugar'];
                    let fechaActividad = listaActividades[i]['fecha'];
                    let actividadGratis = listaActividades[i]['actividadGratis'];
                    let precioActividad = listaActividades[i]['precio'];
                    let tipoMoneda = listaActividades[i]['tipoMoneda'];



                    if (actividadGratis == 'Gratis') {
                        precioActividad = actividadGratis;
                    } else {
                        precioActividad = tipoMoneda + precioActividad;
                    }

                    elementoFoto.src = fotos;
                    nombre.innerHTML = nombreActividad;
                    descripcion.innerHTML = descripcionActividad;
                    lugar.innerHTML = lugarActividad;
                    fecha.innerHTML = fechaActividad;
                    precio.innerHTML = precioActividad;
                    botonVerMas.innerHTML = 'Ver actividad';

                    cards.appendChild(card);
                    card.appendChild(elementoFoto);
                    card.appendChild(nombre);
                    card.appendChild(descripcion);
                    card.appendChild(lugar);
                    card.appendChild(fecha);
                    card.appendChild(precio);
                    card.appendChild(botonVerMas);

                    botonVerMas.addEventListener('click', function(){
                        swal({
                            title: 'No se puede visualizar la actividad',
                            text: 'Por favor inicie sesión',
                            type: 'warning',
                            confirmButtonText: 'Entendido'
                        });
                    });


                    cont++;
                }

            }
            }
        }else if(document.querySelector('#ActividadesGratis').checked== true && fechaMin.value === ''  && fechaMaxima.value === ''){
            if (listaActividades[i]['actividadGratis'] == "Gratis" && listaActividades[i]['estado'] == 'true' && listaActividades[i]['ban'] == 'false') {
                if (listaActividades[i]['nombre'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['descripcion'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['fecha'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['actividadGratis'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['lugar'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase()) || listaActividades[i]['etiquetas'].toLowerCase().includes(inputBuscarActividades.value.toLowerCase())) {
    
                    let card = document.createElement('div');
                    let elementoFoto = document.createElement('img');
                    let id = document.createElement('h2');
                    let nombre = document.createElement('h1');
                    let descripcion = document.createElement('h3');
                    let lugar = document.createElement('h3');
                    let fecha = document.createElement('h3');
                    let precio = document.createElement('h2');
                    let botonVerMas = document.createElement('a');
    
                    if (cont == 4) {
                        cont = 0;
                    }
    
                    switch (cont) {
                        case 0:
                            card.className = 'cardNaranja';
                            botonVerMas.className = 'buttonVerMasNaranja';
                            break;
                        case 1:
                            card.className = 'cardAzul';
                            botonVerMas.className = 'buttonVerMasAzul';
                            break;
                        case 2:
                            card.className = 'cardVerde';
                            botonVerMas.className = 'buttonVerMasVerde';
                            break;
                        case 3:
                            card.className = 'cardRojo';
                            botonVerMas.className = 'buttonVerMasRojo';
                    }
    
                    elementoFoto.className = 'fotos';
                    nombre.className = 'nombre';
                    descripcion.className = 'descripcion';
                    lugar.className = 'lugar';
                    fecha.className = 'fecha';
                    precio.className = 'precio';
    
    
                    let fotos = listaActividades[i]['fotos'];
                    let posicion = fotos.indexOf(',');
    
                    if (!(posicion == -1)) {
                        fotos = fotos.slice(0, posicion);
                    }
                    if (fotos == '') {
                        fotos = 'imgs/foto.png';
                    }
    
                    let idActividad = listaActividades[i]['_id'];
                    let nombreActividad = listaActividades[i]['nombre'];
                    let descripcionActividad = listaActividades[i]['descripcion'];
                    let lugarActividad = listaActividades[i]['lugar'];
                    let fechaActividad = listaActividades[i]['fecha'];
                    let actividadGratis = listaActividades[i]['actividadGratis'];
                    let precioActividad = listaActividades[i]['precio'];
                    let tipoMoneda = listaActividades[i]['tipoMoneda'];
    
    
    
                    if (actividadGratis == 'Gratis') {
                        precioActividad = actividadGratis;
                    } else {
                        precioActividad = tipoMoneda + precioActividad;
                    }
    
                    elementoFoto.src = fotos;
                    nombre.innerHTML = nombreActividad;
                    descripcion.innerHTML = descripcionActividad;
                    lugar.innerHTML = lugarActividad;
                    fecha.innerHTML = fechaActividad;
                    precio.innerHTML = precioActividad;
                    botonVerMas.innerHTML = 'Ver actividad';
    
                    cards.appendChild(card);
                    card.appendChild(elementoFoto);
                    card.appendChild(nombre);
                    card.appendChild(descripcion);
                    card.appendChild(lugar);
                    card.appendChild(fecha);
                    card.appendChild(precio);
                    card.appendChild(botonVerMas);
    
                    botonVerMas.addEventListener('click', function(){
                        swal({
                            title: 'No se puede visualizar la actividad',
                            text: 'Por favor inicie sesión',
                            type: 'warning',
                            confirmButtonText: 'Entendido'
                        });
                    });
    
    
                    cont++;
    
                }
            }
        }else if(document.querySelector('#ActividadesGratis').checked== false && fechaMin.value === ''  && fechaMaxima.value === ''){
            imprimirBusquedaDeActividades();
        }
    }
};

function removerFechas(){
    fechaMaxima.value= '';
    fechaMin.value= '';
    imprimirBusquedaDeActividadesFiltradas();
}