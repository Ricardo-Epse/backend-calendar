const express = require('express');
require('dotenv').config(); // instalar
const cors = require('cors')
const { dbConnection } = require('./database/config');

const app = express();


//base de datos
dbConnection();

app.use(cors())


//dir publico
app.use(express.static('public'));

//lectura y parseo del body

app.use( express.json() );

// Rutas

app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));

//directorio publico 





app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
});
