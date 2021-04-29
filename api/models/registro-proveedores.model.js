'use strict;';

const mongoose = require('mongoose');

const schema_proveedor = new mongoose.Schema({
    tipo_ID: { type: String, required: true, unique: false },
    num_ID: { type: String, required: true, unique: false },
    correo: { type: String, required: true, unique: false },
    password: { type: String, required: true, unique: false },
    tipoServicio: { type: String, required: true, unique: false },
    usuario: { type: String, required: true, unique: false },
    nombre: { type: String, required: true, unique: false },
    fechaEdad: { type: Date, required: true, unique: false },
    num_edad: { type: Number, required: true, unique: false },
    foto_perfil: { type: String, required: false, unique: false },
    estado_cuenta: { type: String, required: true, unique: false },
    FechaReg: { type: Date, required: true, unique: false },
    solicitud: { type: String, required: true, unique: false },
    provincia: { type: String, required: true, unique: false },
    canton: { type: String, required: true, unique: false },
    distrito: { type: String, required: true, unique: false },
    direccion: { type: String, required: true, unique: false }


});

module.exports = mongoose.model('Proveedor', schema_proveedor, 'Proveedores');