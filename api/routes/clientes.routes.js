'use strict';

const express = require('express');

const router = express.Router();
const cliente = require('../models/clientes.models');

//req --> Peticion
//res --> respuesta
router.get('/listar-clientes', (req, res) => {
    cliente.find((err, lista_clientes) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los clientes",
                err
            });
        } else {
            res.json({ lista_clientes })
        }
    })
});

//Endpoint para registrar clientes
router.post('/registrar-cliente', (req, res) => {
    let nuevo_cliente = new cliente({
        tipoIDCliente: req.body.tipoIDCliente,
        identificacionCliente: req.body.identificacionCliente,
        nombreUsuario: req.body.nombreUsuario,
        nombreCliente: req.body.nombreCliente,
        segundoNombreCliente: req.body.segundoNombreCliente,
        primerApellidoCliente: req.body.primerApellidoCliente,
        segundoApellidoCliente: req.body.segundoApellidoCliente,
        email: req.body.email,
        edadCliente: req.body.edadCliente,
        cantidadMascotas: req.body.cantidadMascotas,
        fecha: new Date()
    });
    nuevo_cliente.save((err, cliente_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el cliente",
                err
            });
        } else {
            res.json({
                msj: "El cliente se registró exitosamente.",
                cliente_db
            })
        }
    });
});


module.exports = router;