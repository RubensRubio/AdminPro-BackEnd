require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./db/config');

//Crear servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Carpeta publica
app.use(express.static('public'));

//Lectura y parse del body
app.use(express.json());

//Base de datos
dbConnection();

console.log(process.env);

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));


app.listen(process.env.port, () => {
    console.log('Servidor corriendo en puerto : ' + process.env.port);
})