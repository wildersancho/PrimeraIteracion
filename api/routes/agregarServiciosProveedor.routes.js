'use strict';
// utilizamos la dependencia express
const express = require('express');
//pedimos un rauter a express, para redireccionar el trafico
const router = express.Router();
//utilizamos el modelo creado
const servicioP = require('../models/agregarServiciosProveedor.models');

//req --> request o peticion.
//res -> response o respuesta.
router.get('/listar-serviciosp', (req, res) => {
    servicioP.find((err, lista_servicios_proveedor) => {
        if (err) {
            res.json({
                msj: "No se pudo listar los servicios",
                err
            });
        } else {
            res.json({ lista_servicios_proveedor });
        }
    });
});

router.get('/listar-serviciosp2', (req, res) => {
    let usuario = req.query.usuario;
    servicioP.find({ usuario: usuario }, (err, lista_servicios_proveedor) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los usuarios",
                err
            });
        } else {
            res.json({ lista_servicios_proveedor })
        }
    })
});


router.post('/registrar-serviciop', (req, res) => {
    let nuevo_servicios_proveedor = new servicioP({
        Proveedor: req.body.Proveedor,
        nombreServicio: req.body.nombreServicio,
        tipoMascota: req.body.tipoMascota,
        precio: req.body.precio
    });
    nuevo_servicios_proveedor.save((err, servicioP_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el servicio",
                err
            })
        } else {
            res.json({
                msj: "El servicio se registró exitosamente.",
                servicioP_db
            })
        }
    });
});

router.put('/modificar-serviciop', (req, res) => {
    servicioP.updateOne({
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
router.delete('/eliminar-serviciop', (req, res) => {
    let _id = req.body._id;
    servicioP.findOneAndRemove({ _id: _id }, (err) => {
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