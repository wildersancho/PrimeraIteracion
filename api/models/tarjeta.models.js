'use strict';

const mongoose = require('mongoose');

const schema_registroTarjeta = mongoose.Schema({
    tarjeta: { type: Number, required: true, unique: false },
    nombretarjeta: { type: String, required: true, unique: false },
    fechaVencimiento: { type: String, required: true, unique: false },
    codSeguridad: { type: String, required: true, unique: false },
    fecha: { type: Date, required: true, unique: false }
});

module.exports = mongoose.model('Tarjeta', schema_registroTarjeta, 'Tarjetas');