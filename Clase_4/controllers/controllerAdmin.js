const User = require("../models/users");

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password");
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

const updateRole = async (req, res) => {
    const { id } = req.params;
    const { rol } = req.body;

    const rolesPermitidos = ["user", "admin"];
    if(!rolesPermitidos.includes(rol)){
        return res.status(400).json({ message: "Rol no valido" });
    }

    try {
        const user = await User.findById(id);
        if(!user){
           return res.status(400).json({ message: "Usuario no encontrado" }); 
        }

        if(user._id.equals(req.user._id)){
            return res.status(403).json({ message: "Actualizacion denegada" });
        }


        user.rol = rol;
        await user.save();
        return res.json({ message: "Rol actualizado", user: {id: user._id, email: user.email, rol: user.rol}, });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al actualizar" });
    }
};

module.exports = { getUsers, updateRole };