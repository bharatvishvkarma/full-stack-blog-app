const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    imgUrl: String,
    signinMethod: String,
    githubUsername: String,
})

const User = mongoose.model('User', userSchema)

module.exports = User