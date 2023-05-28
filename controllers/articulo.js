const fs = require("fs");
const path = require("path");
const { validarArticulo } = require("../helper/validar");
const Articulo = require("../models/Articulo");

// Metodo de registro
const crear = (req, res) => {
  // Recoger parametros por post a guardar
  let parametros = req.body;

  // Validar Datos
  try {
    validarArticulo(parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }

  // Crear el objeto a guardar y asigna valores a objeto basado en el modelo
  const articulo = new Articulo(parametros);

  // Guardar el articulo en la base de datos
  articulo
    .save()
    .then((articuloGuardado) => {
      return res.status(200).json({
        status: "success",
        Articulo: articuloGuardado,
        mensaje: "Articulo creado con exito",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        status: "error",
        mensaje: "No se ha guardado el articulo: " + error.message,
      });
    });
};

// Metodo de obtener articulos
const listar = (req, res) => {
  Articulo.find({})
    .limit(5)
    .sort({ fecha: -1 })

    .then((articulos) => {
      if (!articulos) {
        return res.status(404).json({
          status: "error",
          mensaje: "No se han encontrado articulos",
        });
      }

      return res.status(200).send({
        status: "success",
        contador: articulos.length,
        articulos,
      });
    })

    .catch((error) => {
      return res.status(500).json({
        status: "error",
        mensaje: "Ha ocurrido un error al listar los articulos",
        error: error.message,
      });
    });
};

// Obtener un articulo por id
const uno = (req, res) => {
  // Recoger un id por la url
  let id = req.params.id;

  // Buscar articulo por id
  Articulo.findById(id)
    .then((articulo) => {
      // si no existe devoler error
      if (!articulo) {
        return res.status(400).json({
          status: "error",
          mensaje: "No se ha encontrado el articulo",
        });
      }

      // Devolver resultado
      return res.status(200).json({
        status: "success",
        articulo,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        mensaje: "Ha ocurrido un error al listar el arituclo",
        error: error.message,
      });
    });
};

// Borrar un articulo
const borrar = (req, res) => {
  // Recoger un id por la url
  let articuloId = req.params.id;

  // Borrar articulo por id
  Articulo.findOneAndDelete({ _id: articuloId })
    .then((articuloBorrado) => {
      // si no existe devoler error
      if (!articuloBorrado) {
        return res.status(400).json({
          status: "error",
          mensaje: "Error al borrar",
        });
      }

      // Devolver resultado
      return res.status(200).json({
        status: "success",
        articuloBorrado,
        mensaje: "Articulo borrado",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        mensaje: "Ha ocurrido un error al buscar el articulo",
        error: error.message,
      });
    });
};

// Actualizar articulo
const editar = (req, res) => {
  // Recoger un id articulo a editar
  let articuloId = req.params.id;

  // Recoger datos del body
  let parametros = req.body;

  // Validar datos
  try {
    validarArticulo(parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }

  // actualizar articulo por id
  Articulo.findOneAndUpdate({ _id: articuloId }, parametros, { new: true })
    .then((articuloActualizado) => {
      // si no existe devoler error
      if (!articuloActualizado) {
        return res.status(400).json({
          status: "error",
          mensaje: "Error al actualizar",
        });
      }

      // Devolver resultado
      return res.status(200).json({
        status: "success",
        articuloActualizado,
        mensaje: "Articulo actualizado correctamente",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        mensaje: "Ha ocurrido un error al buscar el articulo",
        error: error.message,
      });
    });
};

// Metodo para subir archivo foto del articulo
const subir = (req, res) => {
  // Configurar multer

  // Recoger el fichero de imagen subido
  if (!req.file && !req.files) {
    return res.status(400).json({
      status: "error",
      mensaje: "Petición invalida",
    });
  }

  // Nombre del archivo
  let archivo = req.file.originalname;

  // Extension del archivo
  let archivo_split = archivo.split(".");
  let extension = archivo_split[1];

  // Comprobar extension correcta
  if (
    extension != "png" &&
    extension != "jpg" &&
    extension != "jpeg" &&
    extension != "gif"
  ) {
    // Borrar archivo y dar respuesta
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "error",
        mensaje: "Imagen inválida",
      });
    });
  } else {
    // Recoger un id articulo a editar
    let articuloId = req.params.id;

    // actualizar articulo por id
    Articulo.findOneAndUpdate(
      { _id: articuloId },
      { imagen: req.file.filename },
      { new: true }
    )
      .then((articuloActualizado) => {
        // si no existe devoler error
        if (!articuloActualizado) {
          return res.status(400).json({
            status: "error",
            mensaje: "Error al actualizar",
          });
        }

        // Devolver resultado
        return res.status(200).json({
          status: "success",
          articuloActualizado,
          mensaje: "Articulo actualizado correctamente",
          fichero: req.file,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: "error",
          mensaje: "Ha ocurrido un error al buscar el articulo",
          error: error.message,
        });
      });
  }
};

// Metodo para mostrar una imagen
const imagen = (req, res) => {
  let fichero = req.params.fichero;
  let rutafisica = "./imagenes/articulos/" + fichero;

  fs.stat(rutafisica, (error, existe) => {
    if (existe) {
      return res.sendFile(path.resolve(rutafisica));
    } else {
      return res.status(404).json({
        status: "error",
        mensaje: "La imagen no existe",
      });
    }
  });
};

// Metodo para buscar
const buscar = (req, res) => {
  // Sacar el string de busqueda
  let busqueda = req.params.busqueda;

  // Find OR
  Articulo.find({
    $or: [
      { titulo: { $regex: busqueda, $options: "i" } },
      { contenido: { $regex: busqueda, $options: "i" } },
    ],
  })
    // Order
    .sort({ fecha: -1 })
    // Ejecutar consulta
    .then((articulosEncontrados) => {
      if (!articulosEncontrados || articulosEncontrados <= 0) {
        return res.status(404).json({
          status: "error",
          mensaje: "No se han encontrado articulos",
        });
      }

      return res.status(200).send({
        status: "success",
        articulos: articulosEncontrados,
      });
    });
};

module.exports = {
  crear,
  listar,
  uno,
  borrar,
  editar,
  subir,
  imagen,
  buscar,
};
