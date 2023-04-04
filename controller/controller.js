const User = require('../database/users')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const Blog = require('../database/blogs')

require('dotenv').config()

const JSW_SECRET_KEY = 'sldjflkdsjldsg'
//console

function generateToken(user){
    const {_id,name,email} = user
    return jwt.sign({
        _id,name,email
    },JSW_SECRET_KEY)
}

async function signup(req,res){

    try{
        const {name,email, password,mobile,imgUrl} = req.body
        console.log(req.body)
        let user = await User.findOne({
            email:email
        })

        if(user){
            return res.status(403).send({
                message: "User with this email already exists"
            })
        }

        user = await User.create({
            name,email,password,mobile,imgUrl,
            signinMethod: "email-password",
        })
        
        return res.send({
            message: "Registration successful"
        })
    }
    catch(err){
        return res.status(404).send({
            error: err.message
        })
    }
}

async function logIn(req,res){
    try{
        const {email, password} = req.body

        const user = await User.findOne({
            email
        })

        if(!user){
            return res.status(403).send({
                message: "User with this email does not exist",
            })
        }
        if(user.password !== password){
            return res.status(403).send({
                message: 'Wrong password'
            })
        }

        const token = generateToken(user)
        const{_id, name} = user;

        return res.send({
            message: "Login successful",
            data:{
                token,
                user:{
                    _id,name,
                }
            }
        })
    }
    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
}

async function checkLoggedIn(req,res){
    try{
        const user = req.user;
        // console.log(user)
        return res.send({
            data: user
        })
    }
    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
}

async function signInWithGitHub(req,res){
    const GITHUB_OAUTH_CLIENT_ID = 'd7075a7e20cf3b69dfe9'
    const GITHUB_OAUTH_CLIENT_SECRET = '58eb5c5a0a2e01e47da3173d0673a61d18768ec6'
    try{
        const code = req.params.code
        const url = 'https://github.com/login/oauth/access_token'

        let response = await axios.post(url, null,{
            params:{
                client_id: GITHUB_OAUTH_CLIENT_ID,
                client_secret: GITHUB_OAUTH_CLIENT_SECRET,
                code: code
            },
            headers:{
                'Accept': 'application/json'
            }
        })
        let accessToken = response.data.access_token
        if(!accessToken){
            throw new Errot('Something went wrong')
        }

        let url2 = 'https://api.github.com/user'

        response = await axios.get(url2, {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        })

        let user = response.data

        let existingUser = await User.findOne({
            githubUsername: user.login
        })
        console.log(existingUser)

        if(!existingUser){
            existingUser = await User.create({
                name: user.name,
                email: user.email,
                imgUrl: user.avatar_url,
                signinMethod: 'github-oauth',
                githubUsername: user.login
            });
        }

        const token = generateToken(existingUser)
        const {_id,name, imgUrl, email} = existingUser

        return res.send({
            message: 'Login with GitHub successful',
            data:{
                token,
                user:{
                    _id,name,email,imgUrl
                }
            }
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

async function addToBlog(req,res){
    const blog = req.body
    const {title,content} = blog
    try{
        if(!title || !content){
            return res.status(404).send({
                message: "Missing field 'title' or 'content'"
            })
        }

        await Blog.create(blog)

        return res.send({
            message: "blog added successfully"
        })
    }
    catch(err){
        return res.status(404).send({
            message: "Something went wrong"
        })
    }
}

async function getAllBlogs(req,res){
   
    try{
        let category = req.query.category
        let skip = req.query.skip
        // console.log(skip)
        let radio = req.query.radio
        let n
        if(radio === 'new') n = -1
        else n = 1
        
        const allblogs = !category ?await Blog.find().sort({createdAt:n}).limit(6).skip(skip): await Blog.find({category: category})
        const length = await Blog.find().count()
        
        return  res.send({
            message : "successfully",
            blogs: allblogs,
            allBlogs: length
        })
    }
    catch(err){
        return res.status(500).send({
            message: "somthing went wrong",
        })
    }
}

// async function getOne(req,res){
//     try{
//         const id = req.params.id
//         const blog = await Blog.findById(id)
//         return res.send({
//             message:"successfully found",
//             blog: blog
//         })
//     }
//     catch(err){
//         return res.status(500).send({
//             message: "somthing went wrong",
//         })
//     }
// }

async function deleteOneBlog(req, res){
    try{
        const id = req.params.id
        await Blog.findByIdAndDelete(id)
        return res.send({
            message: "Blog deleted"
        })
    }
    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
}

async function updateOneBlog(req,res){
    try{
        const id = req.params.id
        const data = req.body
        await Blog.findByIdAndUpdate(id, data)
        return res.send({
            message: 'Updated'
        })
    }
    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
}

async function postComment(req,res){
    try{
        const id = req.params.id;
        const data = req.body
        console.log(data)
        await Blog.findByIdAndUpdate(id,
            {
                $push:{comments:data}
            },{new:true})
        res.send({
            message:"comment added successfully"
        })
    }
    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
}

async function getOneById(req,res){
        
    try{
        const id = req.params.id
        // console.log(id)
        const blog = await Blog.findById(id)
        return res.send({
            message: 'got it',
            blog: blog
        })
    }
    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
}

module.exports  = {signup, logIn,postComment, checkLoggedIn,signInWithGitHub,getOneById, addToBlog,updateOneBlog, getAllBlogs,deleteOneBlog}