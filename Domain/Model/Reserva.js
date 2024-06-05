// domain/entities/Reserva.js
class Reserva {
    constructor({ id, horaInicio, horaFin, fecha, idPersona, idEspacio, potencialInvalida, asistentes, timestamp }) {
        this.id = id;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.fecha = fecha;
        this.idPersona = idPersona;
        this.idEspacio = idEspacio;
        this.potencialInvalida = potencialInvalida;
        this.asistentes = asistentes;
        this.timestamp = timestamp;
    }

    cancelar() {
        // Lógica de negocio para cancelar una reserva
    }

    aceptar() {
        this.potencialInvalida = false;
    }
}

module.exports = Reserva;
