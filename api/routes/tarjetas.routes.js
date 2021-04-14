'use strict';

const express = require('express');

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

//Endpoint para registrar hoteles
router.post('/registrar-tarjeta', (req, res) => {
    //const salt = bcrypt.genSaltSync(saltRounds);
    //const hash = bcrypt.hashSync(req.body.numeroCode, salt);
    let nueva_tarjeta = new tarjeta({
        usuario: req.body.usuario,
        tarjeta: req.body.numeroTarjeta,
        nombreTarjeta: req.body.tarjeta,
        fechaTarjeta: req.body.fechaTarjeta,
        codSeguridad: req.body.codSeguridad,
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

module.exports = router;