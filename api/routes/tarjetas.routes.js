'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const tarjeta = require('../models/tarjetas.models');
const usuario = require('../models/tarjetas.models');

//req --> Peticion
//res --> respuesta
router.get('/listar-tarjetas', (req, res) => {
    tarjeta.find((err, lista_tarjetas) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los comentarios",
                err
            });
        } else {
            res.json({ lista_tarjetas })
        }
    })
});

//encriptar()
//Endpoint para registrar hoteles
router.post('/registrar-tarjeta', (req, res) => {
    let nueva_tarjeta = new tarjeta({
        usuario: req.body.usuario,
        tarjeta: req.body.numeroTarjeta,
        nombreTarjeta: req.body.nombreTarjeta,
        fechaTarjeta: req.body.fechaTarjeta,
        codSeguridad: req.body.codSeguridad, //req.body.codSeguridad,
        tipoTarjeta: req.body.tipoTarjeta
    });

    nueva_tarjeta.save((err, tarjeta_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar la tarjeta",
                err
            });
        } else {
            res.json({
                msj: "El tarjeta se registró exitosamente.",
                tarjeta_db
            })
        }
    });
});

router.get('/listar-tarjetas', (req, res) => {
    tarjeta.find((err, lista_tarjetas) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar las tarjetas",
                err
            });
        } else {
            res.json({ lista_tarjetas })
        }
    })
});

router.get('/listar-tarjetas2', (req, res) => {
    let usuario = req.query.usuario;
    //console.log(usuario);
    tarjeta.find({ usuario: usuario }, (err, lista_tarjetas) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar las tarjetas",
                err
            });
        } else {
            res.json({ lista_tarjetas })
        }
    })
});

//eliminar
router.delete('/eliminar-tarjeta', (req, res) => {
    let _id = req.body._id;
    tarjeta.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar la tarjeta',
                err
            });
        } else {
            res.json({
                msj: 'La tarjeta se eliminó correctamente'
            });
        }
    });
});

/*const saltRounds = 10;

function encriptar(valor) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(valor, salt, function(err, hash) {
            valor = salt.toString();
            console.log(valor);
        });
    });
    return valor;
}
*/
module.exports = router;