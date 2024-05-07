const EspacioModelo = require('./modelos/modelo.espacio.js');
const UserModelo = require('./modelos/modelo.usuario.js');
const ReservaModelo = require('./modelos/modelo.reserva.js');

async function agregarUsuariosYEspaciosDePrueba() {
    try {
        // Agregar usuarios de prueba
        const usuario1 = new UserModelo({
            username: 'usuario1',
            email: 'usuario1@example.com',
            password: 'password123',
            rol: 'estudiante',
            departamento: 'departamento1'
        });
        await usuario1.save();

        const usuario2 = new UserModelo({
            username: 'usuario2',
            email: 'usuario2@example.com',
            password: 'password456',
            rol: 'docente investigador',
            departamento: 'departamento2'
        });
        await usuario2.save();

        // Agregar espacios de prueba
        const espacio1 = new EspacioModelo({
            id: 'espacio1',
            tamanio: 50,
            tipo: 'sala comun',
            maxOcupantes: 20,
            informacion: 'Espacio de prueba 1',
            reservable: true,
            categoria: 'categoria1',
            porcentajeOcupacion: 0,
            planta: 1,
            asignadoA: ''
        });
        await espacio1.save();

        const espacio2 = new EspacioModelo({
            id: 'espacio2',
            tamanio: 100,
            tipo: 'aula',
            maxOcupantes: 40,
            informacion: 'Espacio de prueba 2',
            reservable: true,
            categoria: 'categoria2',
            porcentajeOcupacion: 0,
            planta: 2,
            asignadoA: ''
        });
        await espacio2.save();

        console.log('Usuarios y espacios de prueba agregados correctamente.');
    } catch (error) {
        console.error('Error al agregar usuarios y espacios de prueba:', error);
        throw error;
    }
}

module.exports = {
    agregarUsuariosYEspaciosDePrueba
};
