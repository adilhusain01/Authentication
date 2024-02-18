const express = require("express");
const router = express.Router();
const { login, dashboard } = require("../controllers/userController");

const authMiddleWare = require("../middlewares/auth")

router.get('/login', login);
router.get('/dashboard', authMiddleWare, dashboard);

module.exports = router;