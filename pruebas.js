const EspacioModelo = require('./modelos/modelo.espacio.js');
const UserModelo = require('./modelos/modelo.usuario.js');

  

async function agregarEspaciosDePrueba() {
    try {

        const usuario1 = new UserModelo({
            id: 'usuario1',
            username: 'usuario1',
            email: 'usuario1@example.com',
            password: 'password123',
            rol: 'estudiante',
            departamento: 'departamento1'
        });
        await usuario1.save();

        const usuario2 = new UserModelo({
            id: 'usuario2',
            username: 'usuario2',
            email: 'usuario2@example.com',
            password: 'password456',
            rol: 'docente investigador',
            departamento: 'departamento2'
        });
        await usuario2.save();
        // Crear espacios de prueba
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

        const espacio2 = new EspacioModelo({
            id: 'espacio2',
            tamanio: 100,
            tipo: 'despacho',
            maxOcupantes: 1,
            informacion: 'Espacio de prueba 2',
            reservable: true,
            categoria: 'categoria2',
            porcentajeOcupacion: 0,
            planta: 1,
            asignadoA: 'usuario1'
        });

        // Guardar espacios en la base de datos
        await espacio1.save();
        await espacio2.save();

        console.log('Espacios de prueba añadidos correctamente.');
    } catch (error) {
        console.error('Error al añadir espacios de prueba:', error);
    }
}

module.exports = { agregarEspaciosDePrueba };

