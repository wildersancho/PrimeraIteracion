'use strict';

const mongoose = require('mongoose');

const schema_registroServicios = mongoose.Schema({
    usuario: { type: String, required: true, unique: false },
    nombreProveedor: { type: String, required: true, unique: false },
    tel: { type: String, required: true, unique: true },
    Provincia: { type: String, required: true, unique: true },
    Canton: { type: String, required: true, unique: false },
    Distrito: { type: String, required: false, unique: false },
    servicio: { type: String, required: true, unique: false },
    nombreMascota: { type: String, required: false, unique: false },
    Observaciones: { type: String, required: true, unique: true },
    fecha: { type: String, required: true, unique: false },
    status: { type: String, required: true, unique: false },
    banned: { type: Boolean, required: true, unique: false }
});

module.exports = mongoose.model('servicio', schema_registroServicios, 'Servicios');