'use strict';

const mongoose = require('mongoose')

const schema_servicios_administrador = new mongoose.Schema({
    codigoServicio: { type: String, required: true, unique: true },
    nombreServicio: { type: String, required: true, unique: true },


});
module.exports = mongoose.model('Servicios', schema_servicios_administrador, 'servicio');