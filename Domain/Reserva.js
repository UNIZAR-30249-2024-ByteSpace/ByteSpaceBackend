// Entidad reserva
class Reserva {
    constructor({ id, horaInicio, horaFin, fecha, idPersona, idEspacio, potencialInvalida, asistentes, timestamp }) {
        this._id = id;
        this._horaInicio = horaInicio;
        this._horaFin = horaFin;
        this._fecha = fecha;
        this._idPersona = idPersona;
        this._idEspacio = idEspacio;
        this._potencialInvalida = potencialInvalida;
        this._asistentes = asistentes;
        this._timestamp = timestamp;
    }

    // Métodos getter
    get id() {
        return this._id;
    }

    get horaInicio() {
        return this._horaInicio;
    }

    get horaFin() {
        return this._horaFin;
    }

    get fecha() {
        return this._fecha;
    }

    get idPersona() {
        return this._idPersona;
    }

    get idEspacio() {
        return this._idEspacio;
    }

    get potencialInvalida() {
        return this._potencialInvalida;
    }

    get asistentes() {
        return this._asistentes;
    }

    get timestamp() {
        return this._timestamp;
    }

    // Métodos setter
    set id(newId) {
        this._id = newId;
    }

    set horaInicio(newHoraInicio) {
        this._horaInicio = newHoraInicio;
    }

    set horaFin(newHoraFin) {
        this._horaFin = newHoraFin;
    }

    set fecha(newFecha) {
        this._fecha = newFecha;
    }

    set idPersona(newIdPersona) {
        this._idPersona = newIdPersona;
    }

    set idEspacio(newIdEspacio) {
        this._idEspacio = newIdEspacio;
    }

    set potencialInvalida(newPotencialInvalida) {
        this._potencialInvalida = newPotencialInvalida;
    }

    set asistentes(newAsistentes) {
        this._asistentes = newAsistentes;
    }

    set timestamp(newTimestamp) {
        this._timestamp = newTimestamp;
    }
}

module.exports = Reserva;
