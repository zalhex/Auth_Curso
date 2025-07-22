const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcryptjs"); //Seguridad en las contraseñas
const mongoose = require("mongoose");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "El usuario ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ message: "El usuario se registro correctamente" });
  } catch (err) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const userLogin = async (req, res) => {
  //verificar si el usuario existe
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y Contraseña son requeridos" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Las credenciales son invalidas" });
    }

    //Comprobar la contraseña
    const isMatch = await bcrypt.compare(password, user.password); //dato tipo bool (verdadero o falso)
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Las credenciales son invalidas" });
    }

    //Generar un jsonwebtoken JWT
    const payload = {
      userId: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { registerUser, userLogin };