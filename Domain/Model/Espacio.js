// domain/entities/Espacio.js
const TipoEspacio = require('../Value_objects/TipoEspacio');

class Espacio {
    constructor({ id, reservable, categoria, asignadoA, porcentajeOcupacion, tamanio, tipo, maxOcupantes, informacion, planta, horaInicio, horaFin }) {
        this._id = id;
        this._reservable = reservable;
        this._categoria = new TipoEspacio(categoria).getNombre();;
        this._asignadoA = asignadoA;
        this._porcentajeOcupacion = porcentajeOcupacion;
        this._tamanio = tamanio;
        this._maxOcupantes = maxOcupantes;
        this._tipo = new TipoEspacio(tipo).getNombre();
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

    get categoria() {
        return this._categoria;
    }

    get asignadoA() {
        return this._asignadoA;
    }

    get porcentajeOcupacion() {
        return this._porcentajeOcupacion;
    }

    get tamanio() {
        return this._tamanio;
    }

    get tipo() {
        return this._tipo;
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

    set categoria(newCategoria) {
        this._categoria = newCategoria;
    }

    set asignadoA(newAsignadoA) {
        this._asignadoA = newAsignadoA;
    }

    set porcentajeOcupacion(newPorcentajeOcupacion) {
        this._porcentajeOcupacion = newPorcentajeOcupacion;
    }

    set tamanio(newTamanio) {
        this._tamanio = newTamanio;
    }

    set tipo(newTipo) {
        this._tipo = newTipo;
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


    getTipo() {
        return this.tipo.getNombre();
    }
}

module.exports = Espacio;
