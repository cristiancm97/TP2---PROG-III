const mongoose = require('mongoose')

const dbconnect = async () => {
    mongoose.set('strictQuery', true);
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/trabajo_practico_2", {});
        console.log("Conexión exitosa");
    } catch (err) {
        console.error("Error de conexión: " + err);
    }
}

module.exports = dbconnect;