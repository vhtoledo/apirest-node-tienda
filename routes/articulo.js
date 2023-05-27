const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controllers/articulo");

// Rutas de prueba
router.get("/ruta-de-prueba", ArticuloControlador.prueba);

// Ruta Util
router.post("/crear", ArticuloControlador.crear);
router.get("/articulos", ArticuloControlador.listar);



module.exports = router;