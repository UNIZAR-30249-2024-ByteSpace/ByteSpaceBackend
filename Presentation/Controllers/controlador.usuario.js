const UsuarioService = require('../../Domain/Service/ServicioUsuario');

const services = new UsuarioService();

class UsuarioController {
    constructor() {
        this.usuarioService = new UsuarioService();
        console.log("this.usuarioService: " + this.usuarioService)
    }

    iniciarSesion = async (req, res) => {
        console.log('Iniciar sesión controlador:', req.body);
        try {
            console.log("Entro")
            const { username, password } = req.body;
            console.log("Username: "+ username)
            console.log("Password: "+ password)
            const resultado = await this.usuarioService.iniciarSesion(username, password);
            console.log('Resultado de iniciar sesión:', resultado);
            return res.status(200).json(resultado);
        } catch (error) {
            console.log('Error al iniciar sesión:', error.message);
            return res.status(400).send(error.message);
        }
    }

    cambiarRol = async (req, res) => { 
        console.log('Cambiar rol controlador:', req.body);
        try {
            const { email, nuevoRol, nuevoDepartamento } = req.body;
            const resultado = await this.usuarioService.cambiarRol(email, nuevoRol, nuevoDepartamento);
            console.log('Resultado de cambiar rol:', resultado);
            return res.status(200).json(resultado);
        } catch (error) {
            console.log('Error al cambiar rol:', error.message);
            return res.status(400).send(error.message);
        }
    }
}

module.exports = new UsuarioController();
