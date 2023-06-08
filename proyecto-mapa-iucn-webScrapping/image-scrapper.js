const express = require('express');
const cors = require('cors'); 
const suscriptionRouter = require('./routes/suscriptions');
const photosGoogleRouter = require('./routes/photosGoogle');
const photosIucnRouter = require('./routes/photosIUCN');
const animalsDbRouter = require('./routes/animalsDatabase');

const connectionMongoDB = require('./database/connectionMongoDB');
const {MONGODB_URL}=require('./enviroment/env');

const app = express();
app.use(express.json());
app.use(cors());


app.use('/suscription', suscriptionRouter);
app.use('/photo-google', photosGoogleRouter);
app.use('/photo', photosIucnRouter);
app.use('/animals', animalsDbRouter);

const startServer = async () => {
    try {
      // Establece la conexión con la base de datos MongoDB utilizando la función connectDB importada anteriormente.
      // La URL de la base de datos se pasa como argumento utilizando una variable de entorno. Las variables de entorno son cargadas gracias a la librería dotenv en el objeto process.env (process es una variable global en Node.js)
      connectionMongoDB(MONGODB_URL);
  
      // Arranca el servidor web en el puerto 8080 y muestra un mensaje en la consola
      app.listen(8000, () => {console.log(`Server is running on port 8000.`);});
    } catch (error) {
      console.log(error);
    }
  };
startServer();
