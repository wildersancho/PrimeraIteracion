'use strict';

const mongoose = require('mongoose')

const schema_servicios_proveedor = new mongoose.Schema({
    Proveedor: { type: String, required: true, unique: false },
    nombreServicio: { type: String, required: true, unique: false },
    tipoMascota: { type: String, required: true, unique: false },
    precio: { type: String, required: true, unique: false }
});

module.exports = mongoose.model('ServiciosP', schema_servicios_proveedor, 'servicioP');