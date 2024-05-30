const { obtenerEspaciosReservables } = require('../controladores/controlador.espacios');
const EspacioModelo = require('../modelos/modelo.espacio');

// Mock para simular una solicitud
const req = {};
// Mock para simular una respuesta
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

// Mock para la función find de Mongoose
EspacioModelo.find = jest.fn().mockResolvedValue([
  { id: 'espacio-id-1', reservable: true },
  { id: 'espacio-id-2', reservable: true },
]);

describe('Pruebas para la función obtenerEspaciosReservables', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería obtener espacios reservables correctamente', async () => {
    await obtenerEspaciosReservables(req, res);
    expect(EspacioModelo.find).toHaveBeenCalledWith({ reservable: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: 'espacio-id-1', reservable: true },
      { id: 'espacio-id-2', reservable: true },
    ]);
  });

  it('debería manejar adecuadamente los errores', async () => {
    // Simular un error al obtener espacios reservables
    EspacioModelo.find = jest.fn().mockRejectedValue(new Error('Error al obtener espacios'));
    await obtenerEspaciosReservables(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener espacios reservables por planta' });
  });
});
