const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
async function connectDatabase(){
    const connect = await mongoose.connect("mongodb+srv://fullstackblog:fullstack@cluster0.mfynyoy.mongodb.net/?retryWrites=true&w=majority")
    return connect
}

module.exports = connectDatabase