'use strict';

const mongoose = require('mongoose');

const schema_registroHotel = mongoose.Schema({
    codigoHotel: { type: Number, required: true, unique: false },
    nombreHotel: { type: String, required: true, unique: false },
    ubicacion: { type: String, required: true, unique: false },
    provincia: { type: String, required: true, unique: false },
    canton: { type: String, required: true, unique: false },
    telefono: { type: String, required: true, unique: false },
    correo: { type: String, required: true, unique: false },
    direccion: { type: String, required: true, unique: false },
    calificacion: { type: Number, required: true, unique: false },
    totalHabitaciones: { type: Number, required: true, unique: false },
    logoHotel: { type: String, required: true, unique: false },
    fecha: { type: Date, required: true, unique: false }
});

module.exports = mongoose.model('Hotel', schema_registroHotel, 'Hoteles');