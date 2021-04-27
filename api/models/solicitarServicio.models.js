'use strict';

const mongoose = require('mongoose')

const schema_solicitar_Servicio = new mongoose.Schema({
    tipoServicio: { type: String, required: true, unique: false },
    fechaServicio: { type: String, required: true, unique: false },
    nombreUsuario: { type: String, required: true, unique: false },
    provincia: { type: String, required: true, unique: false },
    canton: { type: String, required: true, unique: false },
    distrito: { type: String, required: true, unique: false },
    mascotas: { type: String, required: true, unique: false },
    telefono: { type: String, required: true, unique: false },
    observaciones: { type: String, required: true, unique: false },



});
module.exports = mongoose.model('SolicitarServicios', schema_solicitar_Servicio, 'solicitarServicio');