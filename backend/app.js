const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routes/userRoute");

const app = express();
const PORT = process.env.PORT || 8000;

//Middleware
app.use(express.json());

//environment variables for private keys
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(`${process.env.MONGO_CONNECTION}`).then(() => console.log("Connectd to mongoDB")).catch((err) => console.log(err));

//routing the path
app.use('/api/users', router);

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})