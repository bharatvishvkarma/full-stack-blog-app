import { Button } from "@mui/material"
import { useContext } from "react"
import { authContext } from "../App"

import { useEffect, useState } from "react"
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

function AllBlogs() {
    const { user, isLoggedIn } = useContext(authContext)
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [radio, setRadio] = useState('popular')
    const [cat, setCategory] = useState({ category: "" })
    const [deleted, setDeleted] = useState(1)

    useEffect(() => {
        getAllBlogs(cat)
            .then((response) => {

                setBlogs(radio == 'popular' ? response.data.blogs : response.data.blogs.reverse())
                setLoading(false)
            })
    }, [radio, cat, deleted])

    // function deleteBlog(id) {
    //     deleteOneBlog(id)
    //         .then(() => {
    //             getAllBlogs()
    //                 .then((response) => {
    //                     setBlogs(response.data.blogs)
    //                 })
    //         })
    // }

    function changeRadioButton() {
        setRadio(radio == 'popular' ? "new" : "popular")
        setLoading(true)
    }

    function handleChange(e) {
        setCategory({ category: e.target.value })
    }


    return (
        <>

            {
                loading ? <div>
                    <div style={{ display: "flex", gap: "4%", justifyContent: "center", textAlign: "center", marginTop: "100px", fontSize: "25px" }}>
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

                    </div>
                    <h4 style={{color:"gray",fontFamily:"stylish",textAlign:"center"}}>Loading...</h4>
                </div> :
                    <div style={{ width: "80%", margin: "auto", marginTop: "20px" }}>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <FormControl style={{ padding: "5px 15px" }}>
                                {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    row
                                >
                                    <FormControlLabel onClick={changeRadioButton} checked={radio == 'popular'} value="popular]" control={<Radio />} label="Popular" />
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

                        <div className="blogsAll">
                            {

                                blogs.map((blog) => {

                                    return (
                                        <div key={blog._id}>
                                            {

                                                blogs.length > 0 ?
                                                    <OneBlog blog={blog} loading={loading} setDeleted={setDeleted} />
                                                    : <div></div>
                                            }
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>
            }
        </>

    )
}

export default AllBlogs