'use strict;';

const mongoose = require('mongoose');

const schema_cliente = new mongoose.Schema({
    tipo_ID: { type: String, required: true, unique: false },
    num_ID: { type: String, required: true, unique: true },
    correo: { type: String, required: true, unique: false },
    usuario: { type: String, required: true, unique: true },
    nombre: { type: String, required: true, unique: false },
    fechaEdad: { type: Date, required: true, unique: false },
    num_edad: { type: Number, required: true, unique: false },
    cant_mascotas: { type: Number, required: true, unique: false },
    foto_perfil: { type: String, required: false, unique: false },
    password: { type: String, required: false, unique: false },
    estado_cuenta: { type: String, required: true, unique: false },
    FechaReg: { type: Date, required: true, unique: false }

});

module.exports = mongoose.model('Cliente', schema_cliente, 'Clientes');