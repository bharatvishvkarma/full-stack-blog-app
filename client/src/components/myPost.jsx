import '../App.css'
import { useContext } from "react"
import { authContext } from "../App"
import { useEffect, useState } from "react"
import { getAllBlogs } from "../api/api"
import OneBlog from "./oneBlog"


function MyPost() {

    const [deleted,setDeleted] = useState(1)

    const { user, isLoggedIn } = useContext(authContext)
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    console.log(user)
    useEffect(() => {
        getAllBlogs()
            .then((response) => {
                setBlogs(response.data.blogs)
                setLoading(false)
            })
    }, [deleted])

    return (
        <div>
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
                    <div className="blogsAll" style={{ width: "80%", margin: "auto", marginTop: "20px" }}>
                        {   
                            blogs.filter((blog) => {
                                return blog.author.user_id == user._id
                            }) 
                                .map((blog) => {
                                    return (
                                        <div key={blog._id}>
                                            {
                                                blogs.length > 0 ?
                                                    <OneBlog blog={blog} loading={loading} setDeleted = {setDeleted} />
                                                    : <div></div>
                                            }
                                        </div>
                                    )
                                })
                        }
                    </div>
            }

        </div>
    )
}

export default MyPost