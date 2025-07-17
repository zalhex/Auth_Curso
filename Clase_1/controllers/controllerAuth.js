const mongoose = require('mongoose');
const User = require("../models/users");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message: "Todos los campos son requeridos"});
    }
    try {
        const userExist = await User.findOne({ email })
        if(userExist){
            return res
            .status(400)
            .json({message: "El usuario ya existe"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword, 
        });

        await newUser.save();
        return res.status(201).json({message: "El usuario se ha registrado"});

    } catch (error) {
        return res.status(500).json({message: "Error en el servidor"});
    }
};

module.exports = { registerUser };