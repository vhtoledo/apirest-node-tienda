const { conexion } = require("./database/conexion");
const express = require("express");
const cors = require("cors");

// Conectar a la base de datos
conexion();

// Crear servidor Node
const app = express();
const puerto = 3900;

// Configuracion cors
app.use(cors());

// Convertir body a objeto JS
app.use(express.json()); // recibir datos con content-type app/json
app.use(express.urlencoded({extended:true})); // recibir datos por form-urlencoded

// Rutas
const rutas_articulo = require("./routes/articulo");

// Cargar Rutas 
app.use("/api", rutas_articulo);

// Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto "+puerto);
});