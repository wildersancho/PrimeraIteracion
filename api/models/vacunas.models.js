'use strict';

const mongoose = require('mongoose');

const schema_registroVacuna = mongoose.Schema({
    vacuna: { type: String, required: true, unique: false },
    tipoMascota: { type: String, required: true, unique: false }
});

module.exports = mongoose.model('vacuna', schema_registroVacuna, 'vacunas');