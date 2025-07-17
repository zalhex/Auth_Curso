const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
require("dotenv").config();

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

const userLogin = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Email y contraseña son requeridos"});
    }
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({message: "Credenciales invalidas"});
        }
        
        const isMatch = await bcript.compare(password, userLogin.password);
        if(!isMatch){
            return res.status(400).json({message: "Credenciales invalidas"});
        }

        const payload = {
            userId: user._id,
            email: user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        return res.status(200).json({ token, user: { id: user._id, email: user.email } });

    } catch (error) {
        return res.status(500).json({message: "Error en el servidor"});
    }
    
};

module.exports = { registerUser, userLogin };