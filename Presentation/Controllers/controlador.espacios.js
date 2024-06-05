// controladores/EspacioController.js
const EspacioService = require('../../Domain/Service/ServicioEspacio');
const espacioService = new EspacioService();

class EspacioController {
    obtenerEspaciosReservables = async (req, res) => {
        try {
            const espacios = await espacioService.obtenerEspaciosReservables();
            res.status(200).json(espacios);
        } catch (error) {
            console.error('Error al obtener espacios reservables por planta:', error.message);
            res.status(500).json({ error: 'Error al obtener espacios reservables por planta' });
        }
    }

    obtenerEspacioPorId = async (req, res) => {
        try {
            const { id } = req.params;
            const espacio = await espacioService.obtenerEspacioPorId(id);
            res.status(200).json(espacio);
        } catch (error) {
            console.error('Error al obtener el espacio:', error.message);
            res.status(500).json({ error: 'Error al obtener el espacio' });
        }
    }

    filtrarEspacios = async (req, res) => {
        try {
            const { id, categoria, planta, capacidad } = req.query;
            const espaciosFiltrados = await espacioService.filtrarEspacios({ id, categoria, planta, capacidad });
            res.status(200).json(espaciosFiltrados);
        } catch (error) {
            console.error('Error al filtrar los espacios:', error.message);
            res.status(500).json({ error: 'Error al filtrar los espacios' });
        }
    }

    actualizarEspacio = async (req, res) => {
        try {
            const updatedData = req.body;
            const updatedEspacio = await espacioService.actualizarEspacio(updatedData);
            res.status(200).json(updatedEspacio);
        } catch (error) {
            console.error('Error al actualizar el espacio:', error.message);
            res.status(500).json({ error: 'Error al actualizar el espacio' });
        }
    }
}

module.exports = new EspacioController();
