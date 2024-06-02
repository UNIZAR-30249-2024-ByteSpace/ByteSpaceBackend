// controlador.usuario.js

const UsuarioService = require('../../application/services/usuario.js');

async function iniciarSesion(req, res) {
  try {
    const { username, password } = req.body;

    const usuarioService = new UsuarioService();
    
    // Invoca el servicio para iniciar sesión
    const usuario = await usuarioService.iniciarSesion(username, password);

    // Devuelve el usuario como respuesta
    return res.status(200).json(usuario);
    
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    // En caso de error, devuelve un mensaje genérico al cliente
    return res.status(500).send('Error interno del servidor');
  }
}

async function cambiarRol(req, res) {
  try {
    const { email, nuevoRol, nuevoDepartamento } = req.body;

    const usuarioService = new UsuarioService();
    
    // Invoca el servicio para cambiar el rol
    const resultado = await usuarioService.cambiarRol(email, nuevoRol, nuevoDepartamento);

    // Devuelve el resultado como respuesta
    return res.status(200).json(resultado);
    
  } catch (err) {
    console.error('Error al cambiar el rol:', err);
    // En caso de error, devuelve un mensaje genérico al cliente
    return res.status(500).send('Error interno del servidor');
  }
}

module.exports = {
  iniciarSesion,
  cambiarRol,
};
