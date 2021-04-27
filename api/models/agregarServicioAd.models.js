'use strict';

const mongoose = require('mongoose')

const schema_servicios_administrador = new mongoose.Schema({
    nombreServicio: { type: String, required: true, unique: false },


});
module.exports = mongoose.model('ServiciosA', schema_servicios_administrador, 'servicioA');