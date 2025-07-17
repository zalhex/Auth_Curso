const express = require('express');
const router = express.Router();

const { registerUser } = require("../controllers/controllerAuth");

router.post("/register", registerUser);

module.exports = routes;