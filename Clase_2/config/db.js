const mongoose = require('mongoose');
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

//conectar database
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "Authtentication",
        });
    } catch (error) {
        console.error("La conexion con la bd ha fallado", error.menssage);
        process.exit(1);
    }
};

module.exports = connectDB;