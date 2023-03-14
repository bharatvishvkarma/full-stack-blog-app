
import { Button } from '@mui/material'
import { useContext, useState } from 'react'
import { authContext } from '../App'
import { addToBlog } from '../api/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import avatar from '../assets/dummy1.jpg';
import blogLogo from '../assets/blog_logo.png';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { updataImg } from '../api/api'

function Create() {
    const navigate = useNavigate()
    const [blogImg, setBlogImg] = useState("https://bharatvishvkarma.s3.ap-south-1.amazonaws.com/1678801459805.jpg")
    const [fileup, setFileup] = useState(null)
    const currentDate = new Date()

    // const []
    const [blog, setBlog] = useState({
        title: "",
        content: "",
        category: "",
    })
    const { user, isLoggedIn } = useContext(authContext)
    console.log(user)
    function handleChange(e) {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }
    // console.log(currentDate.getDate().toString() + "/" + currentDate.getMonth().toString() + "/" + currentDate.getFullYear().toString())
    async function addBlog() {

        if (isLoggedIn) {
            let imageUrl
            if (fileup) {
                const formData = new FormData()
                formData.append('image', fileup)

                let filee = await updataImg(formData)
                imageUrl = filee.data.file.Location
                // console.log(filee.data.file.Location)
                
            }
            else{
                imageUrl = "https://bharatvishvkarma.s3.ap-south-1.amazonaws.com/1678801459805.jpg"
            }
            let now = currentDate.getDate().toString() + "/" + currentDate.getMonth().toString() + "/" + currentDate.getFullYear().toString()
            let obj = {
                title: blog.title,
                content: blog.content,
                category: blog.category,
                blogImg: imageUrl,
                date: now,
                author: {
                    user_id: user._id,
                    user_name: user.name,
                    user_email: user.email,
                    user_imgUrl: user.imgUrl
                }
            }
            await addToBlog(obj)
                .then((res) => {
                    navigate('/')
                })
                .catch((err) => {
                    toast(err.response.data.message, {
                        type: 'error',
                    })
                })
            // else {
            //     let now = currentDate.getDate().toString() + "/" + currentDate.getMonth().toString() + "/" + currentDate.getFullYear().toString()
            //     // console.log(filee.data.file.Location)
            //     let obj = {
            //         title: blog.title,
            //         content: blog.content,
            //         category: blog.category,
            //         blogImg: "",
            //         date: now,
            //         author: {
            //             user_id: user._id,
            //             user_name: user.name,
            //             user_email: user.email
            //         }
            //     }
            //     await addToBlog(obj)
            //         .then((res) => {
            //             navigate('/')
            //         })
            //         .catch((err) => {
            //             toast(err.response.data.message, {
            //                 type: 'error',
            //             })
            //         })
            // }

        }
    }

    function setImg(e) {
        let set = URL.createObjectURL(e.target.files[0])
        setBlogImg(set)
        setFileup(e.target.files[0])
    }

    return (
        <>

            <Box
                style={{ width: "92%", maxWidth: "700px", margin: "auto", borderRadius: "10px", boxShadow: "salmon 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px", padding: "20px", marginTop: "40px" }}
            >
                <h2 style={{ textAlign: "center", fontFamily: "Caveat", borderBottom: "1px solid salmon" }}>Create Blog</h2>
                <div className='createNewBlog' style={{ display: "flex", gap: "10%", alignItems: "center" }}>
                    <img className='createNewImage' style={{ width: "40%", height: "30%", maxHeight: "350px", objectFit: "cover", border: "1px solid teal", borderRadius: "5%" }} src={blogImg} alt="blogImg" accept="image/*" />
                    <div>
                        <TextField name="title" onChange={(e) => handleChange(e)} inputProps={{ maxLength: 55 }} style={{ width: "100%" }} id="standard-basic" label="Title" variant="standard" />
                        <TextField style={{ width: "100%", marginTop: "20px" }}
                            id="outlined-textarea"
                            label="Content"
                            placeholder="Write something here..."
                            multiline
                            rows={5}
                            name="content"
                            inputProps={{ maxLength: 1500 }}
                            onChange={(e) => handleChange(e)}

                        />
                        <FormControl style={{ marginTop: "20px" }} fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                name="category"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={value}
                                label="Category"
                                onChange={(e) => handleChange(e)}
                            >
                                <MenuItem value="food">Food</MenuItem>
                                <MenuItem value="education">Education</MenuItem>
                                <MenuItem value="science">Science</MenuItem>
                                <MenuItem value="news">News</MenuItem>
                                <MenuItem value="travel">Travel</MenuItem>
                                <MenuItem value="health">Health and Fitness</MenuItem>
                                <MenuItem value="photography">Photography</MenuItem>
                                <MenuItem value="personal">Personal Blog</MenuItem>
                                <MenuItem value="diy">DIY Craft Blog</MenuItem>
                                
                                
                            </Select>
                        </FormControl>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            <Input onChange={setImg} style={{ width: "60%" }} type='file'></Input>
                            <Button onClick={addBlog} disabled={!blog.title && !blog.content && !blog.category} variant='contained'>Post</Button>
                        </div>
                    </div>


                </div>


            </Box>
            {/* <div style={{ margin: "80px auto", padding: "20px", border: "1px solid black", width: "30%" }}>
                <label>Title</label><br></br>
                <input onChange={(e) => handleChange(e)} name="title" type='text' style={{ width: "100%" }} /><br></br>
                <label>Content</label><br></br>
                <textarea onChange={(e) => handleChange(e)} type='textarea' rows="4" name="content" style={{ width: "100%" }} /><br></br>
                <select onChange={(e) => handleChange(e)} name="category">
                    <option value="all" >Choose Category</option>
                    <option value="sport" >sport</option>
                    <option value="news" >News</option>
                    <option value="music" >Music</option>
                    <option value="movies" >Movies</option>
                    <option value="history" >History</option>
                    <option value="technology" >Technology</option>
                </select>
                <Button style={{ margin: "5%" }} onClick={() => addBlog()} variant="contained" >Post</Button>
            </div> */}
        </>
    )
}

export default Create