'use strict';

const mongoose = require('mongoose')

const schema_padecimiento = new mongoose.Schema({

    nombrePadecimiento: { type: String, required: true, unique: true },

});
module.exports = mongoose.model('Padecimientos', schema_padecimiento, 'padecimiento');