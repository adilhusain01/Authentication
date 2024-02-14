const mongoose = require("mongoose");

const userScehma = mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", userScehma);

module.exports = User;