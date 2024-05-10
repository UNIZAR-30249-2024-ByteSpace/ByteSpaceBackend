// Importar modulo Express
const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('./modelos/index.js')
const  cors =require('cors')
const {agregarEspaciosDePrueba} = require('./pruebas.js')
const {obtenerEspacioPorId,obtenerEspaciosReservables} = require('./reglas/gestorEspacios.js')

const API_PORT = process.env.PORT || 8080
//Configuraciones
app.set('port',  API_PORT );
app.set('json spaces', 2)
app.disable('etag')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Logging middleware
morgan.token('body', (req, _res) => JSON.stringify(req.body))
app.use(morgan(':method :url :body - :status'))

app.get('/', (req, res) => {
    return res.status(200).json({"Esta corriendo" : 'la api' })
})
//Routes
app.use('/api',require('./rutas/index.js'));


// Modelo para el manejo de Sockets.
const server = require("http").Server(app);
const Socket = require('./sockets/index');
// Sockets: inicia una conexión socket.io en el servidor.
Socket.start(server)

db.mongoose
    .connect(db.uri)
    .then(() => {
        console.log('Connected to the database')
    })
    .catch((err) => {
        console.log('Cannot connect to the database! \n', err)
        process.exit()
    })
    
//Iniciando el servidor
server.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});

obtenerEspacioPorId('663d0898332570e5549f2bc3');
obtenerEspaciosReservables();