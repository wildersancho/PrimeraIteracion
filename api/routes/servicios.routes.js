'use strict';

const express = require('express');

const router = express.Router();
const servicio = require('../models/servicios.models');

//Endpoint para registrar servicios
router.post('/registrar-servicio', (req, res) => {
    let nuevo_servicio = new servicio({
        nombreUsuario: req.body.nombreUsuario,
        nombreProveedor: req.body.nombreProveedor,
        tel: req.body.tel,
        Provincia: req.body.Provincia,
        Canton: req.body.Canton,
        Distrito: req.body.Distrito,
        Servicio: req.body.Servicio,
        nombreMascota: req.body.nombreMascota,
        Observaciones: req.body.Observaciones,
        fecha: req.body.fecha,
        status: req.body.status,
        banned: req.body.banned
    });
    nuevo_servicio.save((err, servicio_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el servicio",
                err
            });
        } else {
            res.json({
                msj: "El servicio se registró exitosamente.",
                servicio_db
            })
        }
    });
});


module.exports = router;