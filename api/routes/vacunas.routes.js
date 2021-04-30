'use strict';

const express = require('express');

const router = express.Router();
const vacuna = require('../models/vacunas.models');

//req --> Peticion
//res --> respuesta
router.get('/listar-vacunas', (req, res) => {
    vacuna.find((err, lista_vacunas) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los vacunas",
                err
            });
        } else {
            res.json({ lista_vacunas })
        }
    })
});


router.get('/listar-vacuna-mascota', (req, res) => {
    let mascota = req.query.mascota;
    formModelo.find({ mascota: mascota }, (err, lista_vacunas) => {
        if (err) {
            res.json({
                msj: 'No se pudo registrar la mascota',
                err
            });
        } else {
            res.json({ lista_vacunas });
        }
    })
});


//Endpoint para registrar vacunas
router.post('/registrar-vacuna', (req, res) => {
    let nuevo_vacuna = new vacuna({
        vacuna: req.body.vacuna,
        tipoMascota: req.body.tipoMascota
    });

    nuevo_vacuna.save((err, vacuna_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el vacuna",
                err
            });
        } else {
            res.json({
                msj: "El vacuna se registró exitosamente.",
                vacuna_db
            })
        }
    });
});

//eliminar
router.delete('/eliminar-vacuna', (req, res) => {
    let _id = req.body._id;
    vacuna.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar la vacuna',
                err
            });
        } else {
            res.json({
                msj: 'La vacuna se eliminó correctamente'
            });
        }
    });
});

module.exports = router;