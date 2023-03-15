const { request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../database/users')

const JSW_SECRET_KEY = 'sldjflkdsjldsg'
async function auth(req,res,next){

    const authorization = req.headers['authorization']

    if(authorization){
        const token = authorization.split(' ').pop()

        if(token){
            try{
                jwt.verify(token,JSW_SECRET_KEY )
            }
            catch(err){
                return res.status(403).send({
                    message: "Invalid token provided",
                })
            }

            let user = jwt.decode(token)

            let nUser = await User.findById(user._id)
            nUser = nUser.toJSON()
            delete nUser.password
            // console.log(nUser)
            req.user = nUser
            // console.log(user)
            next()
        }
        else{
            return res.status(401).send({
                message: "No auth token present"
            })
        }
    }
    else {
        return res.status(401).send({
            message: 'User is not logged in'
        })
    }
}

module.exports = auth