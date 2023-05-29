const mongoose = require("mongoose");

const conexion = async () => {

    try {
        await mongoose.connect("");

        console.log("Conectado a la base de datos")
    } catch (error) {
        console.log(error);
        throw new Error("No se a podido conectar a la base de datos");
    }
}

module.exports = {
    conexion
}
