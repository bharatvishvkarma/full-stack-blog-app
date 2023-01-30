const express = require('express');
const {signup,logIn,checkLoggedIn,signInWithGitHub,addToBlog, getAllBlogs,deleteOneBlog,getOneById, updateOneBlog} = require('../controller/controller');
const auth = require('../middleware/authMiddleware');
const authRouter = express.Router();
const authMiddleware = require('../middleware/authMiddleware')


authRouter.post('/addUser', signup)
authRouter.post('/login', logIn)
authRouter.get('/loggedInUser',authMiddleware,checkLoggedIn)
authRouter.get('/github-signin/:code', signInWithGitHub)

authRouter.post('/addblog',addToBlog)
authRouter.get('/getallblogs',getAllBlogs)
authRouter.delete('/delete/:id',deleteOneBlog)
authRouter.get('/get/:id',getOneById)
authRouter.patch('/update/:id',updateOneBlog)

module.exports = authRouter