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
    duracion: {
        type: Number,
        required: true
    },
    dia: {
        type: Number,
        required: true
    },
    mes: {
        type: Number,
        required: true
    },
    año: {
        type: Number,
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
    }
});

const ReservaModelo = mongoose.model('Reserva', ReservaSchema);

module.exports = ReservaModelo;
