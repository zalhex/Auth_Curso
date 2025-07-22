const bcrypt = require("bcryptjs");
const User = require("../models/users");

const getMe = (req, res) => {
  const user = req.user; //El usuario se establece en el middleware de protección

  //Verificar que el usuario exista
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  //Mandar la info al usuario
  return res.status(200).json({
    id: user._id,
    username: user.username,
    email: user.email,
  });
};

//Controlador para cambiar contraseña
const changePassword = async (req, res) => {
  const user = req.user; //El usuario se establece en el middleware de protección

  //Validar que el usuario exista
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  //Extraer datos del cuerpo de la peticion
  const { lastPassword, newPassword } = req.body;
  //Verificar que existan los campos
  if (!lastPassword || !newPassword) {
    return res.status(400).json({ message: "todos los campos son requeridos" });
  }

  try {
    const userDB = await User.findById(user._id); //Buscar el ususario por un id

    //Verificar que la ultima contraseña coincide con la de la DB
    const isMatch = await bcrypt.compare(lastPassword, userDB.password); //Un valor booleano
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales Invalidas" });
    }

    //Encriptar contraseña nueva
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    //Actualizar el valor de password
    userDB.password = hashedPassword;

    //Guardar los cambios
    const userUpdate = await userDB.save();
    console.log(userUpdate);

    //Responder al user con que la contraseña se actualizo correctamente
    return res
      .status(200)
      .json({ message: "La contraseña se actualizo correctamente" });
  } catch (err) {
    console.log("internal error", err);
  }
};

module.exports = { getMe, changePassword };