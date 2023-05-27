const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controllers/articulo");

// Rutas
router.post("/crear", ArticuloControlador.crear);
router.get("/articulos", ArticuloControlador.listar);
router.get("/articulo/:id", ArticuloControlador.uno);
router.delete("/articulo/:id", ArticuloControlador.borrar);
router.put("/articulo/:id", ArticuloControlador.editar);




module.exports = router;