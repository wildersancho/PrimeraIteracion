'use strict';
// utilizamos la dependencia express
const express = require('express');
//pedimos un rauter a express, para redireccionar el trafico
const router = express.Router();
//utilizamos el modelo creado
const Solicitud = require('../models/solicitarServicio.models');

//req --> request o peticion.
//res -> response o respuesta.
router.get('/listar-solicitud-servicio', (req, res) => {
    Solicitud.find((err, lista_solicitud_servicio) => {
        if (err) {
            res.json({
                msj: "No se pudo listar las solicitudes",
                err
            });
        } else {
            res.json({ lista_solicitud_servicio });
        }
    });
});
router.post('/registrar-solicitud-servicio', (req, res) => {
    let nuevo_solicitud_servicio = new Solicitud({
        tipoServicio: req.body.tipoServicio,
        fechaServicio: req.body.fechaServicio,
        nombreUsuario: req.body.nombreUsuario,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        mascotas: req.body.mascotas,
        telefono: req.body.telefono,
        observaciones: req.body.observaciones


    });

    nuevo_solicitud_servicio.save((err, solicitud_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el servicio",
                err
            });
        } else {
            res.json({
                msj: "El servicio se registró exitosamente.",
                solicitud_db
            })
        }
    });
});

module.exports = router;