import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from "@mui/material";
import { useState } from "react";
import Change from "./button";
import { logIn } from "../api/api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../App";


const Container = styled(FormGroup)`
    width: 90%;
    margin: 5% auto;
    & > div {
        margin-top: 20px;
`;

function Login(){

    const navigate = useNavigate()
    const {setLoggedIn} = useContext(authContext)

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    function onValueChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function loginUser(){
        try{
            let response = await logIn(user)
            toast('Login successful',{
                type: 'success',
            })
            localStorage.setItem("token", response.data.data.token)
            setLoggedIn(true)
            navigate('/')
        }
        catch(err){
            toast(err.response.data.message)
        }
    }

    return (

        <div style={{ width: "80%",maxWidth:"600px", margin: "40px auto", padding: "20px", boxShadow:" rgba(0, 0, 0, 0.09) 0px 3px 12px",borderRadius:"3%"}}>
        <Container >
            <Typography style={{ textAlign: "center" }} variant="h4">Login</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input type="email" onChange={(e) => { onValueChange(e) }} name="email" id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Password</InputLabel>
                <Input type="password" onChange={(e) => { onValueChange(e) }} name="password" id="my-input" />
            </FormControl>
            <FormControl>
                <Button disabled= {!user.email || !user.password} onClick={()=> loginUser()} variant="contained" color="primary"  >Login</Button>
            </FormControl>
        </Container>
        <Change />
        </div>
    )
}

export default Login