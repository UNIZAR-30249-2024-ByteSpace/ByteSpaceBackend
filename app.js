// Importar modulo Express
const express = require('express');
const app = express();
var mongoose = require("mongoose");

const API_PORT = process.env.PORT || 3000
//Configuraciones
app.set('port',  API_PORT );
app.set('json spaces', 2)
app.disable('etag')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    return res.status(200).json({"Esta corriendo" : 'la api' })
})
//Routes
var spacesRouter = require("./rutas/espacios");
var reserveRouter = require("./rutas/reservas");
var usersRouter = require("./rutas/user");
require('./reservasCron');
app.use("/api/users", usersRouter);
app.use("/api/reserve", reserveRouter);
app.use("/api/spaces", spacesRouter);


const server = require("http").Server(app);

mongoose
    .connect('mongodb+srv://bytespace:oWhNJuKouGNocXLS@cluster0.gvk8lx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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

//addSpacesFromCSV();
//agregarEspaciosDePrueba()