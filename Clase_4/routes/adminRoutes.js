const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorizateRole } = require("../middleware/authorizateRol");
const { getUsers, updateRole } = require("../controllers/controllerAdmin");

router.get("/users", protect, authorizateRole("admin"), getUsers);
router.patch("/user/role/:id", protect, authorizateRole("admin"), updateRole);

module.exports = router;