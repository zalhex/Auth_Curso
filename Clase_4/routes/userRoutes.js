const express = require("express");
const router = express.Router();
const { getMe, changePassword } = require("../controllers/controllerUser");
const { protect } = require("../middleware/authMiddleware");

//Ruta para obtener los datos del usuario
router.get("/me", protect, getMe);

router.post("/me/password", protect, changePassword);

module.exports = router;