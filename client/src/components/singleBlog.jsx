import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneBlog, postComment } from '../api/api.js'

import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import { useContext } from "react"
import { authContext } from "../App"
import dummy1 from '../assets/dummy1.jpg';
import blogLogo from '../assets/blog_logo.png';





function SingleBlog() {
    const { user, isLoggedIn } = useContext(authContext)

    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [done,setDone] = useState(1)
    const [blog, setBlog] = useState()
    const [comment, setComment] = useState("")
    const [comments,setComments] = useState([])
    // console.log(blog)
    useEffect(() => {
        getOneBlog(id)
            .then((blog) => {
                setBlog(blog.data.blog)
                setComments(blog.data.blog.comments.reverse())
                setLoading(false)
            })
    }, [done])

    async function postOneComment(e) {
        let obj = {
            comment,
            comment_user: user.name,
            comment_user_id: user._id,
            comment_user_image: user.imgUrl
        }

        let newComment = await postComment(id, obj)
        setDone(prev =>prev+1)
        setComment('')
    }

    function handleInput(e) {
        setComment(e.target.value)
    }

    return (
        <>
            {
                loading ? <div style={{ display: "flex", gap: "4%", justifyContent: "center", textAlign: "center", marginTop: "100px", fontSize: "25px" }}>
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>

                    <div class="spinner-border text-secondary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-secondary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-border text-danger" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>

                </div> :
                    <div style={{maxWidth:"1000px", width: "90%", margin: "40px auto" }}>
                        <div style={{ display: "flex", justifyContent: "space-between",alignItems:"center" }}>
                            <div style={{ display: "flex",minWidth:"200px", gap: "10%",alignItems:"center" }}>
                                <img style={{width:"34px",height:"34px",marginBottom:"10px",borderRadius:"50%",objectFit:"cover"}} src={blog.author.user_imgUrl?blog.author.user_imgUrl:dummy1} alt="" />
                                <p style={{fontFamily:"Caveat"}}>{blog.author.user_name}</p>
                            </div>
                            <div>
                                <p style={{color:"gray"}}>{blog.date}</p>
                            </div>
                        </div>
                        <img style={{ width: "100%",borderRadius:"5%" }} src={blog.blogImg?blog.blogImg:blogLogo} />
                        <h4 style={{fontFamily:"Josefin Sans"}}>{blog.title} </h4>
                        <p>Category: <span style={{color:"teal",fontWeight:"bold"}}>{blog.category}</span></p>
                        <p style={{fontFamily:"dosis", fontWeight:"600", borderBottom:"1px solid gray",padding:"20px 0"}}>{blog.content} </p>
                        
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", margin: "30px 0", paddingBottom: "20px", borderBottom: "1px solid gray" }}>
                                <TextField onChange={handleInput} value = {comment} name="comment" inputProps={{ maxLength: 200 }} style={{ width: "100%", borderRadius: "30px" }} id="standard-basic" label="Comment" variant="outlined" />
                                <Button disabled={!isLoggedIn} onClick={postOneComment} style={{ paddingLeft: "30px", paddingRight: "30px" }} variant="contained">Post</Button>
                            </div>
                        </div>
                        
                        <h2>Comments</h2>
                        {
                            comments && comments.length > 0 && comments.map((comment)=>(
                                comment.comment?
                                <div className="singleComment" style={{display:"grid",gridTemplateColumns:"1fr 15fr",borderBottom:"1px solid gray", borderRadius:"10px", backgroundColor:"rgb(211, 248, 250)",color:"black",padding:"10px", gap:"10%",width:"100%"}}>
                                    <div>
                                    <img style={{width:"50px",height:"50px",borderRadius:"50%"}} src = {comment.comment_user_image} alt="" />
                                    
                                    </div>
                                    <div>
                                    <p style={{fontSize:"12px",color:"salmon",width:"100%"}}>{comment.comment_user}</p>
                                    <p style={{fontFamily:"roboto slab"}}>{comment.comment}</p>
                                    </div>
                                    
                                </div>:<div></div>
                            ))
                        }
                    </div>
            }
        </>

    )
}

export default SingleBlog