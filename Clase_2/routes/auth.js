const express = require("express");
const router = express.Router(); //Crear un enrutador de Express

const { registerUser, userLogin } = require("../controllers/controllerAuth");

router.post("/register", registerUser);

router.post("/login", userLogin);

module.exports = router;