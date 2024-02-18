const express = require("express");
const router = express.Router();
const { login, dashboard } = require("../controllers/userController");

const authMiddleWare = require("../middlewares/auth")

router.post('/login', login);
router.post('/dashboard', authMiddleWare, dashboard);

module.exports = router;