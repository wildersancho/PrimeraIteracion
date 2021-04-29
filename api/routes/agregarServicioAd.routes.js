'use strict';
// utilizamos la dependencia express
const express = require('express');
//pedimos un rauter a express, para redireccionar el trafico
const router = express.Router();
//utilizamos el modelo creado
const Servicio = require('../models/agregarServicioAd.models');

//req --> request o peticion.
//res -> response o respuesta.
router.get('/listar-servicios_2', (req, res) => {
    Servicio.find((err, lista_servicios) => {
        if (err) {
            res.json({
                msj: "No se pudo listar los servicios",
                err
            });
        } else {
            res.json({ lista_servicios });
        }
    });
});
router.post('/registrar-servicio_2', (req, res) => {
    let nuevo_servicios = new Servicio({

        nombreServicio: req.body.nombreServicio,


    });

    nuevo_servicios.save((err, servicio_db) => {
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

router.put('/modificar-servicio_2', (req, res) => {
    Servicio.updateOne({
        _id: req.body._id
    }, {
        $set: req.body
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el el Servicio",
                err
            });
        } else {
            res.json({
                msj: "El Servicio fue modificada exitosamente",
                info
            })
        }
    });
});
router.delete('/eliminar-servicio_2', (req, res) => {
    let _id = req.body._id;
    Servicio.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar el Servicio',
                err
            });
        } else {
            res.json({
                msj: 'El Servicio se eliminó correctamente'
            });
        }
    });
});

module.exports = router;