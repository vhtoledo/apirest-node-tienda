const { conexion } = require("./database/conexion");
const express = require("express");
const cors = require("cors");

console.log("holaaaaa")

// Conectar a la base de datos
conexion();

// Crear servidor Node
const app = express();
const puerto = 3900;

// Configuracion cors
app.use(cors());

// Convertir body a objeto JS
app.use(express.json());

// Crear Rutas 


// Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto "+puerto);
});