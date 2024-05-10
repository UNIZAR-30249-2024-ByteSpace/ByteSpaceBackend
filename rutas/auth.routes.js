
const { Router } = require('express')

const AuthRouter = Router()

const Session = require('../controladores/controlador.sesion.js')

AuthRouter.post('/login', Session.create)

module.exports =  AuthRouter;