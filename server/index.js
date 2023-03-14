const express = require('express');
const cors = require('cors')
const app = express();
const authRouter = require('./router/router')
const connectDatabase = require('./database/db')
var bodyParser = require('body-parser');
require('dotenv').config();



app.use(cors())
app.use(express.json());
// Increase the maximum payload limit to 50MB

// app.use( bodyParser.json({limit: '50mb'}) );
// app.use(bodyParser.urlencoded({
//   limit: '50mb',
//   extended: true,
//   parameterLimit:50000
// }));


app.use('/', authRouter)
const port = 7777
connectDatabase()
.then(()=>{ 
    app.listen(port,()=>{
        console.log('listening on port' + port)
    })
})

