'use strict';

const express = require('express');
const router = express.Router();
const Comentario = require('../models/comentarios.model');

//req  --> Peticion
//res --> respuesta
router.get('/listar-comentarios', (req, res) => {
    Comentario.find((err, lista_comentarios) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los comentarios",
                err
            });
        } else {
            res.json({ lista_comentarios })
        }
    })
});

module.exports = router;