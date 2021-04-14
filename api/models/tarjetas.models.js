'use strict';

const mongoose = require('mongoose');

const schema_registroTarjeta = mongoose.Schema({
    usuario: { type: String, required: true, unique: false },
    tarjeta: { type: String, required: true, unique: false },
    nombreTarjeta: { type: String, required: true, unique: false },
    fechaTarjeta: { type: String, required: true, unique: false },
    codSeguridad: { type: String, required: true, unique: false },
    tipoTarjeta: { type: String, required: true, unique: false },
});

module.exports = mongoose.model('tarjeta', schema_registroTarjeta, 'Tarjetas');