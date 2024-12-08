const mongoose = require('mongoose');

const archivoSchema = new mongoose.Schema({
    fileId: String,
    nombre: String,
    tipo: String,
    tamaño: Number,
    fechaSubida: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Archivo', archivoSchema);
