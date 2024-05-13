const mongoose = require('mongoose');

const EspacioSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    tamanio: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    maxOcupantes: {
        type: Number,
        required: true
    },
    informacion: {
        type: String,
        required: true
    },
    reservable: {
        type: Boolean,
        required: true
    },
    categoria: {
        type: String
    },
    porcentajeOcupacion: {
        type: Number
    },
    planta: {
        type: Number,
        required: true
    },
    asignadoA: {
        type: String
    }
});

const EspacioModelo = mongoose.model('Espacio', EspacioSchema);

module.exports = EspacioModelo;
