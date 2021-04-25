const express = require('express');


const router = express.Router();


const formModelo = require('../models/registro-mascotas.model');


router.get('/listar-mascotas', (req, res) => {
    let usuario = req.query.usuario;
    formModelo.find({ usuario: usuario }, (err, lista_mascota) => {
        if (err) {
            res.json({
                msj: 'No se pudo registrar la mascota',
                err
            });
        } else {
            res.json({ lista_mascota });
        }
    })
});




router.post('/registrar-mascota', (req, res) => {
    let nuevo_form = new formModelo({
        usuario: req.body.usuario,
        tipoMascota: req.body.tipoMascota,
        nombreMascota: req.body.nombreMascota,
        Raza: req.body.Raza,
        Padecimientos: req.body.Padecimientos,
        Vacunas: req.body.Vacunas,
        FotoMascota: req.body.FotoMascota,
        Numero: req.body.Numero,
        Comentario: req.body.Comentario,
        FechaReg: new Date()

    });

    nuevo_form.save((err, form_db) => {
        if (err) {
            res.json({
                msj: 'No se pudo registrar la mascota',
                err
            });
        } else {
            res.json({
                msj: 'La mascota se guardo exitosamente',
                form_db
            });
        }
    })
});


router.delete('/eliminar-mascota', (req, res) => {
    let _id = req.body._id;
    formModelo.findOneAndRemove({
        _id: _id
    }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo borrar la mascota',
                err
            });
        } else {
            res.json({
                msj: 'La mascota se borro exitosamente'
            });
        }
    });

});


router.get('/perfil-mascota', (req, res) => {
    let _id = req.body._id;
    formModelo.find({
        _id: _id
    }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo borrar el perfil',
                err
            });
        } else {
            res.json({
                lista_mascota
            });
        }
    });

});


router.put('/modificar-mascotas', (req, res) => {
    formModelo.updateOne({
        _id: req.body._id
    }, {
        $set: req.body
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar la mascota",
                err
            });
        } else {
            res.json({
                msj: "La mascotaue modificada exitosamente",
                info
            })
        }
    });
});

module.exports = router;