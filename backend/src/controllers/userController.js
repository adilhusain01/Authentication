const User = require("../models/userModel.js");

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createUser = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        })
    
        const newUser = await  user.save();
        res.status(201).json(newUser);  
    } catch (error) {
        res.status(500).json({message: error.message});   
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});

        if(!user) return res.status(404).json({message: `User with ID ${req.params.id} not found`});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if(!deletedUser) return res.status(404).json({message: `User with ID ${req.params.id} not found`});
        res.status(200).json();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = { getUsers, getUserById,  createUser, updateUser, deleteUser };