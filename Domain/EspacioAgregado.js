// Agregado con raíz entidad Espacio

// Entidad raíz
const Espacio = require('./Espacio');

// Objetos valor
const TipoEspacio = require('./TipoEspacio');
const Departamento = require('./Departamento');

class EspacioAgregado {
    constructor(espacio) {
        this._espacio = new Espacio(espacio);
        console.log("espacio._categoria:" + espacio.categoria)
        this._categoria = new TipoEspacio(espacio.categoria).getNombre();
        this._tipo = new TipoEspacio(espacio.tipo).getNombre();
        if (espacio.asignadoA === 'EINA') {
            this._asignadoA = espacio.asignadoA;
        } else {
            this._asignadoA = new Departamento(espacio.asignadoA).getNombre();
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

    toSpaceDTO() {
        return {
            _id: this.espacio.id,
            _categoria: this.categoria,
            _tipo: this.tipo,
            _asignadoA: this.asignadoA,
            _id : this.espacio.id,
            _reservable : this.espacio.reservable,
            _porcentajeOcupacion : this.espacio.porcentajeOcupacion,
            _tamanio : this.espacio.tamanio,
            _maxOcupantes : this.espacio.maxOcupantes,
            _informacion : this.espacio.informacion,
            _planta : this.espacio.planta,
            _horaInicio : this.espacio.horaInicio,
            _horaFin : this.espacio.horaFin,
        };
    }

    set asignadoA(newAsignadoA) {
        this._asignadoA = newAsignadoA;
    }
}

module.exports = EspacioAgregado;
