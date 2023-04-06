import '../App.css'
import blogLogo from '../assets/blog_logo.png';
import dummy1 from '../assets/dummy1.jpg';
import { MdSaveAlt } from 'react-icons/md';
import { BsFillShareFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material'
import { useContext, useState } from "react"
import { authContext } from "../App"
import {deleteOneBlog} from '../api/api'


function OneBlog({ blog, loading, setDeleted,index }) {
    // console.log(blog,loading)
    const navigate =  useNavigate()
    const { user, isLoggedIn,blogs,setBlogs,setTotalLength } = useContext(authContext)
    const [forRender,setForRedner] = useState(1)

   async function  deletePost(id){
        deleteOneBlog(id)
        .then(()=>{
            setDeleted(prev=>prev+1)
            blogs.splice(index,1)
            // console.log(blogs.slice(index,1))
            setBlogs(blogs)
            setTotalLength(prev =>prev-1)
        })
    }

    return (
        <>
            {/* <div class="card">
                <img src="..." class="card-img-top" alt="..."/>

                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
            </div> */}

            <div  style={{cursor:"pointer", maxWidth: "400px", marginTop: "40px" }} class="card" aria-hidden="true">
                <div style={{ display: "flex", gap: "10%", width: "90%", margin: "auto", padding: "10px 0px" }}>

                    <img style={{ width: "30px", height: "30px", borderRadius: "50%" }} src={loading ? dummy1 : blog.author.user_imgUrl ? blog.author.user_imgUrl : dummy1} />


                    <h5 style={{ fontFamily: "Caveat", textDecoration: "underline" }}>{blog.author.user_name}</h5>
                </div>
                <div onClick={()=>{navigate(`/${blog._id}`)}} style={{ position: "relative", width: "90%", paddingTop: "56%", margin: "auto" }}>
                    <img className="blogFixedImg" style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", objectFit: "cover" }} src={loading ? "https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png" : blog.blogImg ? blog.blogImg : blogLogo} class="card-img-top" alt="..." />
                </div>
                <div  class="card-body">
                    
                            <div onClick={()=>{navigate(`/${blog._id}`)}}>
                                <h5 style={{ fontFamily: "Josefin Sans", color: "teal",fontWeight:"bold",height:"60px" }}>{blog.title}</h5>
                                <p style={{color:"gray"}}>category: <span style={{color:"salmon",fontWeight:"bold"}}>{blog.category}</span></p>
                            </div>

            
                    <div  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", gap: "20px", fontWeight: "bolder" }}>
                            <MdSaveAlt style={{ fontSize: "25px" }} />
                            <BsFillShareFill style={{ fontSize: "20px" }} />
                            {
                                user && user._id == blog.author.user_id ? <AiFillDelete onClick={()=>deletePost(blog._id)} style={{ fontSize: "24px" }}/>:<div></div>
                            }
                            
                        </div>
                        <p style={{ color: "gray" }}>{blog.date}</p>
                    </div>
                    

                    {/* <h5 class="card-title placeholder-glow">
                            <span class="placeholder col-6"></span>
                        </h5> */}


                    {/* <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a> */}
                </div>
            </div>
        </>


    )
}

export default OneBlog