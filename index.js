const express = require('express');
const cors = require('cors')
const app = express();
const authRouter = require('./server/router/router')
const connectDatabase = require('./server/database/db')
require('dotenv').config();

app.use(express.json());

app.use(cors())

app.use('/', authRouter)
const port = 7777
connectDatabase()
.then(()=>{
    app.listen(port,()=>{
        console.log('listening on port' + port)
    })
})
