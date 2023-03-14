const express = require('express');
const {signup,logIn,checkLoggedIn,postComment,signInWithGitHub,addToBlog, getAllBlogs,deleteOneBlog,getOneById, updateOneBlog} = require('../controller/controller');
const auth = require('../middleware/authMiddleware');
const authRouter = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const multer = require('multer');
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
};
 
const S3 = new AWS.S3(awsConfig);

let upload = multer({
    // storage: multer.memoryStorage(),
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: function (req, file, done) {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
      ) {
        done(null, true);
      } else {
        //prevent the upload
        var newError = new Error("File type is incorrect");
        newError.name = "MulterError";
        done(newError, false);
      }
    },
  });
// Configure multer to handle file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   });
//   const upload = multer({ storage: storage });

  //upload to s3
const uploadToS3 = (fileData) => {
    // console.log(fileData +"3")
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: bucketName,
        Key: `${Date.now().toString()}.jpg`,
        Body: fileData,
      };
      S3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        // console.log(data + "1");
        return resolve(data);
      });
    });
  };

  authRouter.post("/upload", upload.single("image"), async (req, res) => {
    // console.log(req.file + "2");
    if (req.file) {
      let upFile = await uploadToS3(req.file.buffer);
      res.send({
        msg: "Image uploaded succesfully",
          file : upFile,
      });
    }
  
    
  });


authRouter.post('/addUser', signup)
authRouter.post('/login', logIn)
authRouter.get('/loggedInUser',authMiddleware,checkLoggedIn)
authRouter.get('/github-signin/:code', signInWithGitHub)


authRouter.post('/addblog',addToBlog)
authRouter.get('/getallblogs',getAllBlogs)
// authRouter.get('/getOne/:id',getOne)
authRouter.delete('/delete/:id',deleteOneBlog)
authRouter.get('/get/:id',getOneById)
authRouter.patch('/update/:id',updateOneBlog)
authRouter.patch('/postComment/:id',postComment)

module.exports = authRouter