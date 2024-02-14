const express = require("express");
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, getUserById } = require("../controllers/userController");

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);

module.exports = router;