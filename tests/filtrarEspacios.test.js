const { filtrarEspacios } = require('../controladores/controlador.espacios');
const EspacioModelo = require('../modelos/modelo.espacio');

describe('Pruebas para la función filtrarEspacios', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería filtrar espacios correctamente', async () => {
    const req = {
      query: {
        categoria: 'Oficina',
        planta: '1',
        capacidad: '5',
        id: ''
      }
    };

    const espaciosFiltrados = [{
      id: 'espacio-id',
      tamanio: 10,
      tipo: 'Oficina',
      maxOcupantes: 5,
      planta: 1,
      categoria: 'Oficina',
      reservable: true
    }];

    EspacioModelo.find = jest.fn().mockResolvedValue(espaciosFiltrados);

    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await filtrarEspacios(req, res);

    expect(EspacioModelo.find).toHaveBeenCalledWith({
      categoria: 'Oficina',
      planta: 1,
      maxOcupantes: { $gt: 5 }
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(espaciosFiltrados);
  });

  it('debería manejar adecuadamente los errores', async () => {
    const req = {
      query: {}
    };

    EspacioModelo.find = jest.fn().mockRejectedValue(new Error('Error al filtrar los espacios'));

    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await filtrarEspacios(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al filtrar los espacios' });
  });
});
