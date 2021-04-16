'use strict';

const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const tarjeta = require('../models/tarjetas.models');

//req --> Peticion
//res --> respuesta
router.get('/listar-tarjetas', (req, res) => {
    hotel.find((err, lista_tarjetas) => {
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

encriptar()
    //Endpoint para registrar hoteles
router.post('/registrar-tarjeta', (req, res) => {
    let nueva_tarjeta = new tarjeta({
        usuario: req.body.usuario,
        tarjeta: req.body.numeroTarjeta,
        nombreTarjeta: req.body.nombreTarjeta,
        fechaTarjeta: req.body.fechaTarjeta,
        codSeguridad: encriptar(req.body.codSeguridad), //req.body.codSeguridad,
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

router.get('/listar-tarjetas2', (req, res) => {
    let codigo = req.query.usuario;
    hotel.find({ usuario: codigo }, (err, lista_tarjetas) => {
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

const saltRounds = 10;

function encriptar(valor) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(valor, salt, function(err, hash) {
            valor = salt.toString();
            console.log(valor);
        });
    });
    return valor;
}

module.exports = router;