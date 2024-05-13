const mongoose = require('mongoose');

const ReservaSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    horaInicio: {
        type: Number,
        required: true
    },
    duracion: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    idPersona: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    idEspacio: {
        type: mongoose.Schema.Types.ObjectId,
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
