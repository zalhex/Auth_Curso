const jwt = require("jsonwebtoken");
const User = require("../models/users");
require("dotenv").config(); //Cargar las variables de entorno

//Middleware para rutas protegidas
const protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Obtener el JWT desde el header de la peticion (request) arreglo[]
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next(); //Permite el flujo de la ruta natural
    } catch (err) {
      res.status(401).json({ message: "No autorizado, token invalido" });
    }
  } else {
    res.status(401).json({ message: "No autorizado, no hay Token" });
  }
};

module.exports = { protect };