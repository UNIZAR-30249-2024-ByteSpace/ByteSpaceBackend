const mongoose = require('mongoose');

const ReservaSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    horaInicio: {
        type: Number,
        required: true
    },
    horaFin: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    idPersona: {
        type: String,
        ref: 'Usuario',
        required: true
    },
    idEspacio: {
        type: String,
        ref: 'Espacio',
        required: true
    },
    potencialInvalida: {
        type: Boolean,
        required: true
    }
});

const ReservaModelo = mongoose.model('Reserva', ReservaSchema);

module.exports = ReservaModelo;
