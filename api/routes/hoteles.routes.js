'use strict';

const express = require('express');

const router = express.Router();
const hotel = require('../models/hotel.models');

//req --> Peticion
//res --> respuesta
router.get('/listar-hoteles', (req, res) => {
    hotel.find((err, lista_hoteles) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los comentarios",
                err
            });
        } else {
            res.json({ lista_hoteles })
        }
    })
});

//Endpoint para registrar hoteles
router.post('/registrar-hotel', (req, res) => {
    let nuevo_hotel = new hotel({
        codigoHotel: req.body.codigoHotel,
        nombreHotel: req.body.nombreHotel,
        ubicacion: req.body.ubicacion,
        provincia: req.body.provincia,
        canton: req.body.canton,
        telefono: req.body.telefono,
        correo: req.body.correo,
        direccion: req.body.direccion,
        calificacion: req.body.calificacion,
        totalHabitaciones: req.body.totalHabitaciones,
        logoHotel: req.body.logoHotel,
        fecha: new Date()
    });

    nuevo_hotel.save((err, hotel_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el comentario",
                err
            });
        } else {
            res.json({
                msj: "El hotel se registró exitosamente.",
                hotel_db
            })
        }
    });
});

router.get('/listar-hoteles2', (req, res) => {
    let codigo = req.query.codigoHotel;
    hotel.find({ codigoHotel: codigo }, (err, lista_hoteles) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los comentarios",
                err
            });
        } else {
            res.json({ lista_hoteles })
        }
    })
});

module.exports = router;