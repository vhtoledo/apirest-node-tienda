const validator = require("validator");
const Articulo = require("../models/Articulo");

const prueba = (req, res) => {

    return res.status(200).json({
        mensaje: "Soy un accion de prueba"
    });
}
// Metodo de registro
const crear = (req, res) => {

    // Recoger parametros por post a guardar 
    let parametros = req.body;

    // Validar Datos
    try {

        let validar_titulo = !validator.isEmpty(parametros.titulo) &&
                              validator.isLength(parametros.titulo, {min: 5, max: undefined});
        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido){
            throw new Error("No se ha validado la información")
        }
        
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        })
    }

    // Crear el objeto a guardar y asigna valores a objeto basado en el modelo
    const articulo = new Articulo(parametros);

    // Guardar el articulo en la base de datos
    articulo.save()
    .then((articuloGuardado) => {
        return res.status(200).json({
            status: 'success',
            Articulo: articuloGuardado,
            mensaje: 'Articulo creado con exito'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            status: 'error',
            mensaje: 'No se ha guardado el articulo: ' + error.message
        });
    });

}

// Metodo de obtener articulos
const listar = (req, res) => {
    Articulo.find({})
            .limit(5)
            .sort({fecha: -1})

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


module.exports = {
    prueba,
    crear,
    listar
}