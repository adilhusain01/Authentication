const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

const login =  async (req, res) => {
    try {
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({message: 'Please provide username and password'});
        }

        //for demo
        const id = new Date().getDate();

        //small payload is good
        const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'});

        res.status(200).json({message: 'User created', token: token});
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}

const dashboard =  async (req, res) => {
    console.log(req.user.username, req.user.id);
    res.status(200).json({message: `${req.user.username}`});
}

module.exports = { getUsers, getUserById,  createUser, updateUser, deleteUser, login, dashboard };