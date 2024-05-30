const { obtenerEspacioPorId } = require('../controladores/controlador.espacios');
const EspacioModelo = require('../modelos/modelo.espacio');

// Mock para simular una solicitud con un parámetro de ID
const req = {
  params: {
    id: 'espacio-id',
  },
};

// Mock para simular una respuesta
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

// Mock para el espacio encontrado en la base de datos
const espacioEncontrado = { id: 'espacio-id', tamanio: 10, tipo: 'Oficina', maxOcupantes: 5 };

describe('Pruebas para la función obtenerEspacioPorId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería obtener el espacio por ID correctamente', async () => {
    // Mockear la función find para devolver el espacio encontrado dentro de un array
    EspacioModelo.find = jest.fn().mockResolvedValue([espacioEncontrado]);
    await obtenerEspacioPorId(req, res);
    expect(EspacioModelo.find).toHaveBeenCalledWith({ id: 'espacio-id' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([espacioEncontrado]); // Espacio encontrado debe estar dentro de un array
  });


  it('debería manejar adecuadamente los errores', async () => {
    // Simular un error al obtener el espacio
    EspacioModelo.find = jest.fn().mockRejectedValue(new Error('Error al obtener el espacio'));
    await obtenerEspacioPorId(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener el espacio' });
  });
});
