

// función para iniciar sesión en el sistema
async function iniciarSesion(req, res){
	logger.info("user.controller:iniciar sesion");
	try {
		// comprobamos que el email introducido es válido
		if(!validarEmail(req.body.email)){
			logger.error("user.controller:formato de email no valido");
			return res.status(400).send('Formato de email no válido.');
		}

		// comprobamos si ya existe un usuario registrado con ese correo electrónico
		const comprobarUsuario = await Usuario.findOne({
			email: req.body.email,
		});
		if (comprobarUsuario) {
			// gestionamos si el usuario está baneado

			if(comprobarUsuario.baneado){
				logger.error("user.controller: el usuario esta baneado. No puede iniciar sesion");
				res.status(403).send('El usuario está baneado. No puede iniciar sesión')
			}

			// completamos la petición en caso de que la contraseña introducida coincida con la guardada
			if(comprobarUsuario.password !== req.body.password){
				logger.error("user.controller:El email o la contraseña no son correctas");
				return res.status(400).send('El email o la contraseña no son correctas');
			}


			else {
				
				const jwtToken = await jwt.sign({idUsuario: comprobarUsuario._id}, 'clavesecreta');

				console.log(jwtToken)

				return res.status(201).json({
					name: comprobarUsuario.username,
					email: comprobarUsuario.email,
					token: jwtToken
				});
			}
		}
		else{
			logger.error("user.controller:usuario no existente");
			res.status(404).send('Usuario no existente');
		}
		
	} catch (err) {
		logger.error("user.controller:usuario no existente");
    	res.status(404).send('Usuario no existente');
	}
}

module.exports = {
    iniciarSesion
};