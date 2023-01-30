const mongoose = require('mongoose')

let blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String,
    author: {
        user_id: String,
        user_name: String,
        user_email: String
    }
},
{
    timestamps: true,
})

const Blog = mongoose.model('blog', blogSchema)

module.exports = Blog