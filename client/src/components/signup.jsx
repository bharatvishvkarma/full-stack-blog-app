import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from "@mui/material";
import Change from "./button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser,updataImg } from "../api/api";
import { toast } from 'react-toastify';
import avatar from '../assets/dummy1.jpg'
import axios from "axios";
import '../App.css'
import { width } from "@mui/system";
import isEmail from 'validator/lib/isEmail';

const Container = styled(FormGroup)`
width: 90%;
margin: 5% auto;
& > div {
    margin-top: 20px;
`;

function Signup(){

    let navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [fileup,setFileup] = useState(null)
    const [isValid,setIsValid] = useState(false)
    const [postImage,setPostImage] = useState({myFile:"https://bharatvishvkarma.s3.ap-south-1.amazonaws.com/1678801541661.jpg"})

    const [user, setUser] = useState({
        email: "",
        password: "",
        name:"",
        mobile: "",
        imgUrl: "",
    })
    
    
    function onValueChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function updateData(){
        try{
            setLoading(true)
            if(fileup){
                const formData = new FormData();
                formData.append('image', fileup)
                let fileee = await updataImg(formData)
                // setUser({...user, imgUrl: fileee.data.file.Location})
                let updatedUser = {...user,imgUrl: fileee.data.file.Location}
                await addUser(updatedUser)
                setLoading(false)
                toast('Registration successful',{
                    type: 'success',
                })
                navigate('/login')
            }
            else{
                let updatedUser = {...user,imgUrl:'https://bharatvishvkarma.s3.ap-south-1.amazonaws.com/1678801541661.jpg'}
                await addUser(updatedUser)
                setLoading(false)
                toast('Registration successful',{
                    type: 'success',
                })
                navigate('/login')
            }
            
        }
        catch(err){
            // console.log(err)
            setLoading(false)
            toast(err.response.data.message,{
                type: 'error',
            })
        }
    }
    console.log(user)
    const handleFileUpload = async (e)=>{
        const file = e.target.files[0]
        setFileup(file);
        // console.log(file)
        const base64 = await convertToBase64(file)
        setPostImage({myFile:base64})
        // setUser({ ...user, [e.target.name]: base64 })
    }

    function convertToBase64(file){
        return new Promise((resolve, reject) =>{
            console.log('hello')
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload =()=>{
                // console.log(fileReader.result)
                resolve(fileReader.result)
                
            }
            fileReader.onerror=(error)=>{
                reject(error)
            }
        })
    }
    
    // function handleChange(e){
    //     const file = e.target.files[0];
    //     setFileup(file);
    // }
    // console.log(fileup)
    // async function addFile(){
    //     try{
    //         const formData = new FormData();
    //         formData.append('image', fileup)
    //         let fileee = await axios.post('http://localhost:7777/upload',formData)
    //    console.log(fileee)
    //     }
    //     catch(e){
    //         console.log(e.message)
    //     }
       
    // }

    return (
        <div style={{ width: "80%",maxWidth:"600px", margin: "40px auto", padding: "20px", boxShadow:" rgba(0, 0, 0, 0.09) 0px 3px 12px",borderRadius:"3%" }}>

            <Container>
                {/* <input onChange={handleChange} type="file" name="image" />
                <button onClick={addFile}>submit</button> */}
                <Typography style = {{textAlign:"center"}} variant="h4">Signup</Typography>
                <FormControl>
                    <label htmlFor = 'file-upload' className='custom-file-upload'>
                        <div className="">
                            <img src = {postImage.myFile}  alt = "" className="signupImg" />
                        </div>
                        
                    </label>
                    <input 
                            type = "file"
                            label = "image"
                            name = "image"
                            id = "file-upload"
                            accept=".jpeg, .jpg, .png"
                            onChange = {(e)=>handleFileUpload(e)} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Full Name</InputLabel>
                    <Input onChange={(e) => { onValueChange(e) }}  name="name" id="my-input" />
                    
                </FormControl>
                {user.name.length>0 && user.name.length<5?<p className="suggestion" >Name must contain atleast 5 character</p>:null}
                
                <FormControl>
                    <InputLabel htmlFor="my-input">Email</InputLabel>
                    <Input type = "email" onChange={(e) => { 
                        onValueChange(e)
                        const val = e.target.value
                        if(isEmail(val)) {
                            setIsValid(true);              
                         } else {
                            setIsValid(false);              
                         }
                         }}  name="email" id="my-input" />
                </FormControl>
                {user.email.length>0 && !isValid ?<p className="suggestion" >Invalid Email</p>:null}

                <FormControl>
                    <InputLabel htmlFor="my-input">Password</InputLabel>
                    <Input type="password" onChange={(e) => {  onValueChange(e)  }} name="password" id="my-input" />
                </FormControl>
                {( user.password.length>0  && !(/[a-zA-Z]/.test(user.password) && /\d/.test(user.password) && user.password.length>=8)  )  ?<p className="suggestion" >Password must contain at least 8 characters, including one number and alphabets </p>:null}

                <FormControl>
                    <InputLabel htmlFor="my-input">Mobile no.</InputLabel>
                    <Input type = "number" onChange={(e) => { onValueChange(e) }} name="mobile" id="my-input" />
                </FormControl>
                { (user.mobile + "").length>0 && (user.mobile + "").length !==10  ?<p className="suggestion" >Mobile number should be in 10 digits </p>:null}
                <FormControl>
                    <Button disabled= {user.name.length<5 || !isValid || (user.mobile + "").length !==10 ||
                    !(/[a-zA-Z]/.test(user.password)  && /\d/.test(user.password) && user.password.length>=8)}  variant="contained" color="primary" onClick={()=>updateData()} >{loading?<div className="spinner" />:'Signup'}</Button>
                </FormControl>
            </Container>
            <Change />
        </div>
    )
}



export default Signup