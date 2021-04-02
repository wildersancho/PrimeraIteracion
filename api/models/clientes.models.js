'use strict';

const mongoose = require('mongoose');

const schema_registroCliente = mongoose.Schema({
    tipoIDCliente: { type: String, required: true, unique: false },
    identificacionCliente: { type: String, required: true, unique: true },
    nombreUsuario: { type: String, required: true, unique: true },
    nombreCliente: { type: String, required: true, unique: false },
    segundoNombreCliente: { type: String, required: false, unique: false },
    primerApellidoCliente: { type: String, required: true, unique: false },
    segundoApellidoCliente: { type: String, required: false, unique: false },
    email: { type: String, required: true, unique: true },
    edadCliente: { type: Number, required: true, unique: false },
    cantidadMascotas: { type: Number, required: true, unique: false },
    fecha: { type: Date, required: true, unique: false }
});

module.exports = mongoose.model('Cliente', schema_registroCliente, 'Clientes');