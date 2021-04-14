'use strict';

const mongoose = require('mongoose');

const schema_registroRaza = mongoose.Schema({
    raza: { type: String, required: true, unique: false },
    tipoMascota: { type: String, required: true, unique: false },
});

module.exports = mongoose.model('Raza', schema_registroRaza, 'Razas');