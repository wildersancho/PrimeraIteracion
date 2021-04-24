'use strict';

const express = require('express');

const router = express.Router();
const servicio = require('../models/servicios.models');

//Endpoint para registrar servicios
router.post('/registrar-servicio', (req, res) => {
    let nuevo_servicio = new servicio({
        usuario: req.body.usuario,
        nombreProveedor: req.body.nombreProveedor,
        tel: req.body.tel,
        Provincia: req.body.Provincia,
        Canton: req.body.Canton,
        Distrito: req.body.Distrito,
        servicio: req.body.servicio,
        nombreMascota: req.body.nombreMascota,
        Observaciones: req.body.Observaciones,
        fecha: req.body.fecha,
        status: req.body.status,
        banned: req.body.banned,
        comentarios: req.body.comentarios
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


router.get('/listar-servicios', (req, res) => {
    let usuario = req.query.usuario;
    servicio.find({ usuario: usuario }, (err, lista_servicios) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar las servicios",
                err
            });
        } else {
            res.json({ lista_servicios })
        }
    })
});

//eliminar
router.put('/cancelar-servicio', (req, res) => {
    servicio.updateOne({
        _id: req.body._id
    }, {
        $set: {
            status: req.body.status,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo banear el servicio",
                err
            });
        } else {
            res.json({
                msj: "El servicio fue baneado exitosamente",
                info
            })
        }
    });
});

router.put('/bannear-servicio', (req, res) => {
    servicio.updateOne({
        _id: req.body._id
    }, {
        $set: {
            banned: req.body.banned,
            comentarios: req.body.comentarios
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo reportar el servicio",
                err
            });
        } else {
            res.json({
                msj: "El servicio fue reportado exitosamente",
                info
            })
        }
    });
});

module.exports = router;