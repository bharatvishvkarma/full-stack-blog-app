const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();

mongoose.set('strictQuery', false)
const userName = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD


async function connectDatabase(){
    console.log(password)
    const connect = await mongoose.connect(`mongodb+srv://fullstackblog:fullstack@cluster0.mfynyoy.mongodb.net/?retryWrites=true&w=majority`)
    return connect
}

module.exports = connectDatabase