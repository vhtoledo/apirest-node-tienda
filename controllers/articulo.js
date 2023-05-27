
const prueba = (req, res) => {

    return res.status(200).json({
        mensaje: "Soy un accion de prueba"
    });
}

const crear = (req, res) => {

    // Recoger parametros por post a guardar 

    // Validar Datos

    // Crear el objeto a guardar 

    // Asignar valores a objeto basado en el modelo

    // Guardar el articulo en la base de datos

    // Devolver resultado

    return res.status(200).json({
        mensaje: "Accion de guardar"
    })
}

module.exports = {
    prueba,
    crear
}