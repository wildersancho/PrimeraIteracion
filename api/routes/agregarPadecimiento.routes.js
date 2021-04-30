'use strict';
// utilizamos la dependencia express
const express = require('express');
//pedimos un rauter a express, para redireccionar el trafico
const router = express.Router();
//utilizamos el modelo creado
const Padecimiento = require('../models/agregarPadecimiento.models');

//req --> request o peticion.
//res -> response o respuesta.
router.get('/listar-padecimientos', (req, res) => {
    Padecimiento.find((err, lista_padecimientos) => {
        if (err) {
            res.json({
                msj: "No se pudo listar los padecimientos",
                err
            });
        } else {
            res.json({ lista_padecimientos });
        }
    });
});
router.post('/registrar-padecimiento', (req, res) => {
    let nuevo_padecimiento = new Padecimiento({
        nombrePadecimiento: req.body.nombrePadecimiento
    });
    nuevo_padecimiento.save((err, padecimiento_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el padecimiento",
                err
            });
        } else {
            res.json({
                msj: "El padecimiento se registró exitosamente.",
                padecimiento_db
            })
        }
    });
});

router.put('/modificar-padecimiento', (req, res) => {
    Padecimiento.updateOne({
        _id: req.body._id
    }, {
        $set: req.body
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el el padecimiento",
                err
            });
        } else {
            res.json({
                msj: "El padecimiento fue modificada exitosamente",
                info
            })
        }
    });
});
router.delete('/eliminar-padecimiento', (req, res) => {
    let _id = req.body._id;
    Padecimiento.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar el padecimiento',
                err
            });
        } else {
            res.json({
                msj: 'El padecimiento se eliminó correctamente'
            });
        }
    });
});


module.exports = router;