const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/modelo.usuario'); // Asegúrate de ajustar la ruta al modelo de usuario

// Función para validar el formato del email
const validarEmail = (email) => {
  return email.match(
    /^(([^<>()\[\]\.,;:\s@"]+(.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Función para iniciar sesión en el sistema
async function iniciarSesion(req, res) {
  try {
    const { username, password } = req.body; // Cambiar a 'username'

    console.log('Datos recibidos:', { username, password });

    // Comprobamos que el email introducido es válido
    if (!validarEmail(username)) { // Cambiar a 'username'
      console.log('Formato de email no válido:', username);
      return res.status(400).send('Formato de email no válido.');
    }

    // Comprobamos si ya existe un usuario registrado con ese correo electrónico
    const comprobarUsuario = await Usuario.findOne({ email: username }); // Cambiar a 'username'

    if (!comprobarUsuario) {
      console.log('Usuario no existente:', username);
      return res.status(404).send('Usuario no existente');
    }

    // Verificamos si la contraseña introducida coincide con la guardada
    if (comprobarUsuario.password !== password) {
      console.log('Contraseña incorrecta para el email:', username);
      return res.status(400).send('El email o la contraseña no son correctas');
    }

    // Generación del token JWT
    const jwtToken = await jwt.sign({ idUsuario: comprobarUsuario.id }, 'clavesecreta', { expiresIn: '1h' });

    console.log('Token JWT generado:', jwtToken);

    return res.status(200).json({
      name: comprobarUsuario.username,
      email: comprobarUsuario.email,
      token: jwtToken,
    });
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    return res.status(500).send('Error interno del servidor');
  }
}

module.exports = {
  iniciarSesion,
};