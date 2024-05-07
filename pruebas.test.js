const {
    obtenerEspacioPorId,
    obtenerEspaciosReservables,
    verificarReserva
} = require('./reglas/gestorEspacios.js');

describe('obtenerEspacioPorId', () => {
    it('debería devolver el espacio correspondiente cuando se proporciona un ID válido', async () => {
        const espacio = await obtenerEspacioPorId('idDelEspacioExistente');
        expect(espacio).toBeDefined();
        // Agregar más expectativas según sea necesario
    });

    it('debería devolver null cuando se proporciona un ID inexistente', async () => {
        const espacio = await obtenerEspacioPorId('idInexistente');
        expect(espacio).toBeNull();
    });
});

describe('obtenerEspaciosReservables', () => {
    it('debería devolver una lista de espacios reservables', async () => {
        const espacios = await obtenerEspaciosReservables();
        expect(espacios).toBeInstanceOf(Array);
        // Agregar más expectativas según sea necesario
    });
});

describe('verificarReserva', () => {
    it('debería devolver "Apto para reservar" cuando el espacio está disponible y el usuario tiene permiso', async () => {
        const resultado = await verificarReserva(/* proporcionar datos válidos */);
        expect(resultado).toBe('Apto para reservar');
    });

    it('debería devolver un mensaje de error cuando el espacio está reservado en el horario especificado', async () => {
        const resultado = await verificarReserva(/* proporcionar datos con espacio reservado */);
        expect(resultado).toMatch(/Potencialmente inválido/);
    });

    // Agregar más pruebas para otros casos de uso según sea necesario
});
