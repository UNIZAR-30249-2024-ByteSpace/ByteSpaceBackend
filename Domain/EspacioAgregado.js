// Agregado con raíz entidad Espacio

// Entidad raíz
const Espacio = require('./Espacio');

// Objetos valor
const TipoEspacio = require('./TipoEspacio');
const Departamento = require('./Departamento');

class EspacioAgregado {
    constructor({ espacio, categoria, tipo, asignadoA }) {
        this._espacio = new Espacio(espacio);
        this._categoria = new TipoEspacio(categoria).getNombre();
        this._tipo = new TipoEspacio(tipo).getNombre();
        if (asignadoA === 'EINA') {
            this._asignadoA = asignadoA;
        } else {
            this._asignadoA = new Departamento(asignadoA).getNombre();
        }

    }

    // Métodos getter
    get id() {
        return this._espacio._id;
    }

    get reservable() {
        return this._espacio._reservable;
    }

    get porcentajeOcupacion() {
        return this._espacio._porcentajeOcupacion;
    }

    get tamanio() {
        return this._espacio._tamanio;
    }


    get maxOcupantes() {
        return this._espacio._maxOcupantes;
    }

    get informacion() {
        return this._espacio._informacion;
    }

    get planta() {
        return this._espacio._planta;
    }

    get maxOcupantes() {
        return this._espacio._maxOcupantes;
    }

    get horaInicio() {
        return this._espacio._horaInicio;
    }

    get horaFin() {
        return this._espacio._horaFin;
    }

    get espacio() {
        return this._espacio;
    }

    get categoria() {
        return this._categoria;
    }

    get tipo() {
        return this._tipo;
    }
    
    get asignadoA() {
        return this._asignadoA;
    }

    // Métodos setter

    // Métodos setter
    set id(newId) {
        this._espacio._id = newId;
    }

    set reservable(newReservable) {
        this._espacio._reservable = newReservable;
    }

    set porcentajeOcupacion(newPorcentajeOcupacion) {
        this._espacio._porcentajeOcupacion = newPorcentajeOcupacion;
    }

    set tamanio(newTamanio) {
        this._espacio._tamanio = newTamanio;
    }

    set maxOcupantes(newMaxOcupantes) {
        this._espacio._maxOcupantes = newMaxOcupantes;
    }

    set informacion(newInformacion) {
        this._espacio._informacion = newInformacion;
    }

    set planta(newPlanta) {
        this._espacio._planta = newPlanta;
    }

    set horaInicio(newHoraInicio) {
        this._espacio._horaInicio = newHoraInicio;
    }

    set horaFin(newHoraFin) {
        this._espacio._horaFin = newHoraFin;
    }

    set espacio(newEspacio) {
        this._espacio = newEspacio;
    }

    set categoria(newCategoria) {
        this._categoria = newCategoria;
    }

    set tipo(newTipo) {
        this._tipo = newTipo;
    }

    getTipo() {
        return this.tipo.getNombre();
    }

    set asignadoA(newAsignadoA) {
        this._asignadoA = newAsignadoA;
    }
}

module.exports = EspacioAgregado;
