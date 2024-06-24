// Entidad espacio
class Espacio {
    constructor({ id, reservable, porcentajeOcupacion, tamanio, maxOcupantes, informacion, planta, horaInicio, horaFin }) {
        this._id = id;
        this._reservable = reservable;
        this._porcentajeOcupacion = porcentajeOcupacion;
        this._tamanio = tamanio;
        this._maxOcupantes = maxOcupantes;
        this._informacion = informacion;
        this._planta = planta;
        this._horaInicio = horaInicio;
        this._horaFin = horaFin;


    }

    // Métodos getter
    get id() {
        return this._id;
    }

    get reservable() {
        return this._reservable;
    }

    get porcentajeOcupacion() {
        return this._porcentajeOcupacion;
    }

    get tamanio() {
        return this._tamanio;
    }


    get maxOcupantes() {
        return this._maxOcupantes;
    }

    get informacion() {
        return this._informacion;
    }

    get planta() {
        return this._planta;
    }

    get maxOcupantes() {
        return this._maxOcupantes;
    }

    get horaInicio() {
        return this._horaInicio;
    }

    get horaFin() {
        return this._horaFin;
    }

    // Métodos setter
    set id(newId) {
        this._id = newId;
    }

    set reservable(newReservable) {
        this._reservable = newReservable;
    }

    set porcentajeOcupacion(newPorcentajeOcupacion) {
        this._porcentajeOcupacion = newPorcentajeOcupacion;
    }

    set tamanio(newTamanio) {
        this._tamanio = newTamanio;
    }

    set maxOcupantes(newMaxOcupantes) {
        this._maxOcupantes = newMaxOcupantes;
    }

    set informacion(newInformacion) {
        this._informacion = newInformacion;
    }

    set planta(newPlanta) {
        this._planta = newPlanta;
    }

    set horaInicio(newHoraInicio) {
        this._horaInicio = newHoraInicio;
    }

    set horaFin(newHoraFin) {
        this._horaFin = newHoraFin;
    }

}

module.exports = Espacio;
