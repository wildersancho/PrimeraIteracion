const express = require('express');
const Mail = require('nodemailer/lib/mailer');


const router = express.Router();


const formModelo = require('../models/registro-clientes.model');
const emailer = require('../templates/registro-correo');


router.post('/registrar-clientes', (req, res) => {
    let nuevo_form = new formModelo({

        tipo_ID: req.body.tipo_ID,
        num_ID: req.body.num_ID,
        correo: req.body.correo,
        usuario: req.body.usuario,
        nombre: req.body.nombre,
        fechaEdad: req.body.fechaEdad,
        num_edad: req.body.num_edad,
        cant_mascotas: req.body.cant_mascotas,
        foto_perfil: req.body.foto_perfil,
        password: randomPassword(),
        estado_cuenta: req.body.estado_cuenta,
        FechaReg: new Date()

    });

    nuevo_form.save((err, form_db) => {
        if (err) {
            res.json({
                msj: 'No se pudo registrar el cliente',
                err
            });
        } else {
            res.json({
                msj: 'El cliente se guardo exitosamente',
                form_db

            });
            emailer.send_email(form_db.nombre, form_db.usuario, form_db.correo);
        }
    })
});


//Valor para password random dentro de reg cliente

const randomPassword = () => {
    var passwordContainer = '';

    var possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz' + '0123456789@#$';

    let randomNum;
    for (let i = 1; i <= 8; i++) {

        randomNum = Math.random();

        var posicion_caracter = Math.floor(randomNum *
            possibleChars.length + 1);


        passwordContainer += possibleChars.charAt(posicion_caracter)
    }

    return passwordContainer;
}


router.get('/listar-clientes', (req, res) => {

    formModelo.find((err, lista_clientes) => {
        if (err) {
            res.json({
                msj: 'No se pudo registrar los clientes',
                err
            });
        } else {
            res.json({ lista_clientes });
        }
    })
});



router.delete('/eliminar-cliente', (req, res) => {
    let _id = req.body._id;
    formModelo.findOneAndRemove({
        _id: _id
    }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo borrar el cliente',
                err
            });
        } else {
            res.json({
                msj: 'el cliente se borro exitosamente'
            });
        }
    });

});

router.put('/habilitar-cliente', (req, res) => {
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
                    msj: 'No se pudo abilitar el cliente',
                    err
                });
            } else {
                res.json({
                    msj: 'el cliente se abilitar exitosamente'
                });
            }
        });

});


router.put('/deshabilitar-cliente', (req, res) => {
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
                    msj: 'No se pudo deshabiltar el cliente',
                    err
                });
            } else {
                res.json({
                    msj: 'el cliente se deshabiltar exitosamente'
                });
            }
        });

});

router.put('/modificar-cliente', (req, res) => {
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


router.put('/modificar-perfil', (req, res) => {
    formModelo.updateOne({
        usuario: req.body.usuario
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






router.get('/perfil', (req, res) => {
    let usuario = req.query.usuario;
    formModelo.find({ usuario: usuario }, (err, lista_clientes) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los usuarios",
                err
            });
        } else {
            res.json({ lista_clientes })
        }
    })
});





router.put('/modificar-password', (req, res) => {
    formModelo.updateOne({
        _id: req.body._id
    }, {
        $set: {
            password: req.body.password,
            estado_cuenta: 'Habilitado'
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar la contraseña del usuario",
                err
            });
        } else {
            res.json({
                msj: "La contraseña fue modificada exitosamente",
                info
            })
        }
    });
});



router.get('/get-username', (req, res) => {
    let usuario = req.query.usuario;
    formModelo.findOne({ usuario: usuario }, (err, usuario_db) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los usuarios",
                err
            });
        } else {
            res.json({ usuario_db })
        }
    })
});

module.exports = router;