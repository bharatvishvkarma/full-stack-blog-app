import { Button } from "@mui/material"
import { useContext } from "react"
import { authContext } from "../App"

import React, { useEffect, useState } from "react"
import { getAllBlogs } from "../api/api"
import { deleteOneBlog } from "../api/api"
import { useNavigate } from "react-router-dom"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OneBlog from "./oneBlog"
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Loading from "./loading"
import InfiniteScroll from "react-infinite-scroll-component";

function AllBlogs() {
    const { user, isLoggedIn } = useContext(authContext)
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [radio, setRadio] = useState('popular')
    const [cat, setCategory] = useState("")
    const [skip, setSkip] = useState(0)
    const [deleted, setDeleted] = useState(1)
    const [totalLength,setTotalLength] = useState()
    // const [skip,setSkip] = useState(0)


    useEffect(() => {
        getAllBlogs({ category: cat, skip: skip, radio }).then((response) => {
            
            setBlogs((prevBlogs) => [...prevBlogs, ...response.data.blogs]);
            setTotalLength(response.data.allBlogs);
            setLoading(false);
          });
    }, [radio, cat, skip, deleted])

    // function deleteBlog(id) {
    //     deleteOneBlog(id)
    //         .then(() => {
    //             getAllBlogs()
    //                 .then((response) => {
    //                     setBlogs(response.data.blogs)
    //                 })
    //         })
    // }
    // console.log(cat)
    function changeRadioButton() {
        setSkip(0)
        setBlogs([])
        setRadio(radio == 'popular' ? "new" : "popular")
        setLoading(true)
    }

    function handleChange(e) {
        setLoading(true)
        setBlogs([])
        setSkip(0)
        setCategory(e.target.value)
    }

    function fetchMore() {
        setLoading(true)
        setSkip(prev => prev + 6)
        setLoading(true)
        // console.log(skip)
    }

    console.log(blogs.length,totalLength)
    return (

        <div style={{  width: "80%", margin: "auto", marginTop: "20px" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <FormControl style={{ padding: "5px 15px" }}>
                    {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        row
                    >
                        <FormControlLabel onClick={changeRadioButton} checked={radio == 'popular'} value="popular" control={<Radio />} label="Popular" />
                        <FormControlLabel onClick={changeRadioButton} checked={radio != 'popular'} value="new" control={<Radio />} label="New" />
                    </RadioGroup>
                </FormControl>
                <FormControl style={{ minWidth: "120px", width: "15%" }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        // name="food"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={value}
                        label="Category"
                        onChange={handleChange}
                    >
                        <MenuItem value="">all</MenuItem>
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
            </div>

            <InfiniteScroll
            style = {{overflow: 'hidden'}}
                        // className="blogsAll"
                        dataLength={blogs.length}
                        next={fetchMore}
                        hasMore={blogs.length != totalLength }
                        loader={(blogs.length == 0 && !loading) ?null:<Loading />}
                    >

            <div className="blogsAll">
                {
                    blogs.length>0?
                    blogs.map((blog) => {

                        return (
                            <div key={blog._id}>
                                {

                                    blogs.length > 0 ?
                                        <OneBlog blog={blog} loading={loading} setDeleted={setDeleted} />
                                        : <div ></div>
                                }
                            </div>
                        )
                    }):!loading?<div style={{textAlign:"center",color:"red",margin:"auto"}}><h3>No blog for this category</h3></div>:null
                }
            </div>

            </InfiniteScroll>

        </div>


    )
}

export default React.memo(AllBlogs)