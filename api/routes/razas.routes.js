'use strict';

const express = require('express');

const router = express.Router();
const raza = require('../models/razas.models');

//req --> Peticion
//res --> respuesta
router.get('/listar-razas', (req, res) => {
    raza.find((err, lista_razas) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los razas",
                err
            });
        } else {
            res.json({ lista_razas })
        }
    })
});

//Endpoint para registrar razas
router.post('/registrar-raza', (req, res) => {
    let nuevo_raza = new raza({
        raza: req.body.raza,
        tipoMascota: req.body.tipoMascota
    });

    nuevo_raza.save((err, raza_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el raza",
                err
            });
        } else {
            res.json({
                msj: "El raza se registró exitosamente.",
                raza_db
            })
        }
    });
});

module.exports = router;