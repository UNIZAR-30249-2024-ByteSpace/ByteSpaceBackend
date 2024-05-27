const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/modelo.usuario');

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


    // Comprobamos que el email introducido es válido
    if (!validarEmail(username)) { // Cambiar a 'username'
      return res.status(400).send('Formato de email no válido.');
    }

    // Comprobamos si ya existe un usuario registrado con ese correo electrónico
    const comprobarUsuario = await Usuario.findOne({ email: username }); // Cambiar a 'username'

    if (!comprobarUsuario) {
      return res.status(404).send('Usuario no existente');
    }

    // Verificamos si la contraseña introducida coincide con la guardada
    if (comprobarUsuario.password !== password) {
      return res.status(400).send('El email o la contraseña no son correctas');
    }

    // Generación del token JWT con el ID y el correo electrónico del usuario en el payload
    const jwtToken = await jwt.sign(
      { idUsuario: comprobarUsuario.id, email: comprobarUsuario.email },
      'clavesecreta',
      { expiresIn: '1h' }
    );


    return res.status(200).json({
      username: comprobarUsuario.username,
      email: comprobarUsuario.email,
      id: comprobarUsuario.id,
      rol: comprobarUsuario.rol,
      departamento: comprobarUsuario.departamento,
      token: jwtToken,
    });
    
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    return res.status(500).send('Error interno del servidor');
  }
}

// Función para cambiar el rol de un usuario
// Se requiere el email del usuario, el nuevo rol y el nuevo departamento en caso de ser necesario
// Si se proporciona el mismo rol, la función actua como cambio de departamento
async function cambiarRol(req, res) {
  try {
    const { email, nuevoRol, nuevoDepartamento } = req.body;


    // Comprobamos que el email introducido es válido
    if (!validarEmail(email)) {
      return res.status(400).send('Formato de email no válido.');
    }

    // Comprobamos si el usuario existe
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).send('Usuario no existente');
    }

    // Eliminar el valor de 'departamento' si el nuevo rol es 'estudiante', 'conserje', o 'gerente'
    if (['estudiante', 'conserje', 'gerente'].includes(nuevoRol)) {
      usuario.rol = nuevoRol;
      usuario.departamento = undefined;
    } else if (nuevoDepartamento !== undefined) {
      // Verificamos que el nuevo departamento sea válido
      if (nuevoDepartamento !== 'informatica' && nuevoDepartamento !== 'ingenieria de sistemas') {
        return res.status(400).send('El nuevo departamento es invalido.');
      }
      usuario.rol = nuevoRol;
      usuario.departamento = nuevoDepartamento;
    } else {
      return res.status(400).send('Este cambio de rol requiere de un nuevo departamento.');
    }

    await usuario.save();


    return res.status(200).json({
      message: 'Rol y departamento actualizados con éxito',
      email: usuario.email,
      nuevoRol: usuario.rol,
      nuevoDepartamento: usuario.departamento,
    });
    
  } catch (err) {
    console.error('Error al cambiar el rol:', err);
    return res.status(500).send('Error interno del servidor');
  }
}


module.exports = {
  iniciarSesion,
  cambiarRol,
};
