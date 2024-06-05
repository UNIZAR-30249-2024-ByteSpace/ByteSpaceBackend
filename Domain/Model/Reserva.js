// domain/entities/Reserva.js
class Reserva {
    constructor({ id, idPersona, fecha, hora, potencialInvalida }) {
        this.id = id;
        this.idPersona = idPersona;
        this.fecha = fecha;
        this.hora = hora;
        this.potencialInvalida = potencialInvalida;
    }

    cancelar() {
        // Lógica de negocio para cancelar una reserva
    }

    aceptar() {
        this.potencialInvalida = false;
    }
}

module.exports = Reserva;
