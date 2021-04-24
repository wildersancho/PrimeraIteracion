'use strict;';

const mongoose = require('mongoose');

const schema_registro = new mongoose.Schema({
    tipoMascota: { type: String, required: true, unique: false },
    nombreMascota: { type: String, required: true, unique: false },
    Raza: { type: String, required: true, unique: false },
    Padecimientos: { type: String, required: true, unique: false },
    Vacunas: { type: String, required: true, unique: false },
    FotoMascota: { type: String, required: false, unique: false },
    Numero: { type: String, required: true, unique: false },
    Comentario: { type: String, required: false, unique: false },
    FechaReg: { type: Number, required: true, unique: false }

});

module.exports = mongoose.model('Mascota', schema_registro, 'Mascotas');