const mongoose = require('mongoose')

let blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String,
    blogImg: String,
    date: String,
    author: {
        user_id: String,
        user_name: String,
        user_email: String,
        user_imgUrl: String,
    },
    comments:[{
        comment: String,
        comment_user: String,
        comment_user_id: String,
        comment_user_image: String,
    }]
},
{
    timestamps: true,
})

const Blog = mongoose.model('blog', blogSchema)

module.exports = Blog