const express = require("express");
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, getUserById, login } = require("../controllers/userController");

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;