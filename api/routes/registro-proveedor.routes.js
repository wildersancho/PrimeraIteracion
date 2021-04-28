const express = require('express');


const router = express.Router();


const formModelo = require('../models/registro-proveedores.model');


router.get('/listar-proveedores', (req, res) => {

    formModelo.find((err, lista_proveedores) => {
        if (err) {
            res.json({
                msj: 'No se pudo registrar los proveedores',
                err
            });
        } else {
            res.json({ lista_proveedores });
        }
    })
});




router.post('/registrar-proveedores', (req, res) => {
    let nuevo_form = new formModelo({

        tipo_ID: req.body.tipo_ID,
        num_ID: req.body.num_ID,
        correo: req.body.correo,
        usuario: req.body.usuario,
        nombre: req.body.nombre,
        fechaEdad: req.body.fechaEdad,
        num_edad: req.body.num_edad,
        cant_servicios: req.body.cant_servicios,
        foto_perfil: req.body.foto_perfil,
        estado_cuenta: req.body.estado_cuenta,
        FechaReg: new Date(),
        solicitud: "Pendiente",
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        direccion: req.body.direccion

    });

    nuevo_form.save((err, form_db) => {
        if (err) {
            res.json({
                msj: 'No se pudo registrar el proveedor',
                err
            });
        } else {
            res.json({
                msj: 'El proveedor se guardo exitosamente',
                form_db
            });
        }
    })
});


router.delete('/eliminar-proveedor', (req, res) => {
    let _id = req.body._id;
    formModelo.findOneAndRemove({
        _id: _id
    }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo borrar el proveedor',
                err
            });
        } else {
            res.json({
                msj: 'el proveedor se borro exitosamente'
            });
        }
    });

});

router.put('/habilitar-proveedor', (req, res) => {
    let _id = req.body._id;
    formModelo.updateOne({
            _id: req.body._id
        }, {
            $set: {
                estado_cuenta: "Habilitado"
            }
        },
        (err) => {
            if (err) {
                res.json({
                    msj: 'No se pudo abilitar el proveedor',
                    err
                });
            } else {
                res.json({
                    msj: 'el proveedor se abilitar exitosamente'
                });
            }
        });


});


router.put('/deshabilitar-proveedor', (req, res) => {
    let _id = req.body._id;
    formModelo.updateOne({
            _id: req.body._id
        }, {
            $set: {
                estado_cuenta: "Deshabilitado"
            }
        },
        (err) => {
            if (err) {
                res.json({
                    msj: 'No se pudo deshabiltar el proveedor',
                    err
                });
            } else {
                res.json({
                    msj: 'el proveedor se deshabiltar exitosamente'
                });
            }
        });

});

router.put('/aprobar-proveedor', (req, res) => {
    let _id = req.body._id;
    formModelo.updateOne({
            _id: req.body._id
        }, {
            $set: {
                solicitud: "Aprobado"
            }
        },
        (err) => {
            if (err) {
                res.json({
                    msj: 'No se pudo aprobar el proveedor',
                    err
                });
            } else {
                res.json({
                    msj: 'el proveedor se aprobó exitosamente'
                });
            }
        });


});


router.put('/rechazar-proveedor', (req, res) => {
    let _id = req.body._id;
    formModelo.updateOne({
            _id: req.body._id
        }, {
            $set: {
                solicitud: "Rechazado"
            }
        },
        (err) => {
            if (err) {
                res.json({
                    msj: 'No se pudo rechazar el proveedor',
                    err
                });
            } else {
                res.json({
                    msj: 'el proveedor se rechazó exitosamente'
                });
            }
        });

});

router.put('/modificar-proveedor', (req, res) => {
    formModelo.updateOne({
        _id: req.body._id
    }, {
        $set: req.body
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar la cuenta",
                err
            });
        } else {
            res.json({
                msj: "La cuenta fue modificada exitosamente",
                info
            })
        }
    });
});


module.exports = router;