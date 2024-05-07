const EspacioModelo = require('../modelos/modelo.espacio.js');

async function obtenerEspaciosReservables() {
    try {
        // Buscar espacios reservables en la misma planta
        const espacios = await EspacioModelo.find({ reservable: true });
        return espacios;
    } catch (error) {
        console.error('Error al obtener espacios reservables por planta:', error);
        throw error;
    }
}

async function obtenerEspacioPorId(idEspacio) {
    try {
        const espacio = await EspacioModelo.findById(idEspacio);
        return espacio;
    } catch (error) {
        console.error('Error al obtener el espacio:', error);
        throw error;
    }
}

module.exports = {
    obtenerEspacioPorId,
    obtenerEspaciosReservables

};

