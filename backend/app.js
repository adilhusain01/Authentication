const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./src/routes/userRoute");
const loginRouter = require("./src/routes/loginRoute");

const app = express();
const PORT = process.env.PORT || 8000;

const cors = require('cors');
app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

//Middleware
app.use(express.json());

//environment variables for private keys
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(`${process.env.MONGO_CONNECTION}`).then(() => console.log("Connectd to mongoDB")).catch((err) => console.log(err));

//routing the path
app.use('/api/users', userRouter);
app.use('/api', loginRouter);

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on Port ${PORT}`);
        })        
    } catch (error) {
        console.log(error);
    }
}

start();