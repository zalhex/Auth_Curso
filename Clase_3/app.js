const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const { PORT } = process.env;
const morgan = require("morgan");

const app = express(); //Crear la instancia de nuestra app de express

//Middleware para leer las request JSON
app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/userRoutes"));

app.use((req, res) => {
  res.status(404).json({ message: "La ruta no existe" });
});

app.listen(PORT, () => {
  console.log("El servidor se ejecuta en el puerto: ", PORT);
});