
import { Button } from '@mui/material'
import { useContext, useState } from 'react'
import { authContext } from '../App'
import { addToBlog } from '../api/api'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getOneBlog, updateOne } from '../api/api'

function Updateblog(){
    const {id} = useParams()
    console.log(id)
    const navigate = useNavigate()
    const [blog,setBlog] = useState({
        title:"",
        content:"",
        category: "",
    })
    const {user,isLoggedIn} = useContext(authContext)

    function handleChange(e){
        setBlog({...blog, [e.target.name]:e.target.value})
    }

    useEffect(()=>{
        getOneBlog(id)
        .then((res)=>{
            setBlog(res.data.blog)
        })
    },[])

    async function updateData(){
       if (isLoggedIn){
            let obj = {
                title: blog.title,
                content: blog.content,
                category: blog.category,
                author:{
                    user_id : user._id,
                    user_name : user.name,
                    user_email : user.email
                }
            }
           await updateOne(id,obj)
           .then((res)=>{
            navigate('/')
           })
           .catch((err)=>{
            toast(err.message,{
                type: 'error',
            })
           })
        }
    }

    return (
        <div style={{margin:"80px auto",padding:"20px",border:"1px solid black",width:"30%"}}>
            <label>Title</label><br></br>
            <input onChange={(e)=>handleChange(e)} value = {blog.title} name = "title" type='text' style={{width:"100%"}} /><br></br>
            <label>Content</label><br></br>
            <textarea onChange={(e)=>handleChange(e)} value = {blog.content} type='textarea' rows="4" name = "content"  style={{width:"100%"}}/><br></br>
            <select onChange={(e)=> handleChange(e)} name = "category">
                <option value= "all" >Choose Category</option>
                <option value= "sport" >sport</option>
                <option value= "news" >News</option>
                <option value= "music" >Music</option>
                <option value= "movies" >Movies</option>
                <option value= "history" >History</option>
                <option value= "technology" >Technology</option>
            </select>
            <Button style={{margin:"5%"}} onClick={()=>updateData()} variant="contained" >Update</Button>
        </div>
    )
}

export default Updateblog