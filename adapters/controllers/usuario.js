const UsuarioService = require('../services/usuarioService');

async function iniciarSesion(req, res) {
    try {
        const { username, password } = req.body;
        const usuario = await UsuarioService.iniciarSesion(username, password);

        if (usuario.error) {
            return res.status(401).json({ message: usuario.error });
        }

        return res.status(200).json(usuario);
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        return res.status(500).send('Error interno del servidor');
    }
}

async function cambiarRol(req, res) {
    try {
        const { email, nuevoRol, nuevoDepartamento } = req.body;
        const resultado = await UsuarioService.cambiarRol(email, nuevoRol, nuevoDepartamento);

        if (resultado.error) {
            return res.status(400).json({ message: resultado.error });
        }

        return res.status(200).json(resultado);
    } catch (err) {
        console.error('Error al cambiar el rol:', err);
        return res.status(500).send('Error interno del servidor');
    }
}

module.exports = {
    iniciarSesion,
    cambiarRol,
};
