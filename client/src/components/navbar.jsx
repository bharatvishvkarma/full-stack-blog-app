import { AppBar, styled, Toolbar, Button } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { authContext } from '../App';
import { FaGithub } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
// import { Button } from '@mui/material'

const Header = styled(AppBar)`
    background-color: black;
`;

const Tab = styled(NavLink)`
    color: #FFFFFF;
    margin-right: 20px;
    text-decoration: none;
    font-size: 20px;
`;

const Navbar = () => {



    const { isLoggedIn, user } = useContext(authContext)
    // console.log(user)
    const navigate = useNavigate()

    function logOut() {
        localStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <Header position="sticky">
            <Toolbar style={{ width: "95%", maxWidth: "1100px",display:"flex", margin: "auto", justifyContent: "space-between", alignItems: "center" }}>
                <p className='moveLeft' onClick={() => navigate('/')} exact >MernBlogs</p>
                {user ? <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                    <img style={{ width: "40px", height: "40px", margin: "auto", borderRadius: "20px" }} src={user.imgUrl ? user.imgUrl : "https://img.freepik.com/premium-vector/sleeping-cute-panda-lazy-cartoon_9620-257.jpg?w=2000"} />
                    <h4 className='userName' style={{ fontFamily: "stylish" }}>{user.name}</h4>
                    <div class="dropdown" >
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">

                        </button>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Profile</li>
                            <li class="dropdown-item" onClick={() => navigate('/create')}>Create a Blog</li>
                            {/* <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                        </ul>
                    </div>
                    {/* <Button onClick={() => navigate('/create')} style={{ height: "45px", margin: "auto" }} color="primary" variant="outlined" >Create Post</Button> */}
                </div> : <div style={{marginLeft:"11%"}}>
                    <img style={{ width: "40px", height: "40px", margin: "auto", borderRadius: "20px" }} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
                </div>}

                {/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Enable body scrolling</button> */}
                {
                    isLoggedIn && user ? <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                        <div class="offcanvas-header">
                            {/* <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas with body scrolling</h5> */}
                            <p></p>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div style={{ textAlign: "center" }} class="offcanvas-body">
                            <img style={{ width: "150px", height: "150px", borderRadius: "50%", marginBottom: "20px" }} src={user.imgUrl} />
                            <h6>{user.name}</h6>
                            <h6>{user.email ? <AiOutlineMail /> : ""}{user.email ? user.email : ""}</h6>
                            <h6> {user.githubUsername ? <FaGithub /> : ""} {user.githubUsername ? user.githubUsername : ""}</h6>
                            <Button onClick={() => navigate('/myPost')} variant='outlined'>my posts</Button>


                        </div>
                    </div> : <div></div>
                }



                <div className='moveRight'>{
                    !isLoggedIn ? <Button className='moveRightBtn' variant="contained" style={{ fontSize: "14px" }} onClick={() => navigate('/login')} color="primary">Login</Button>
                        : <Button className='moveRightBtn' onClick={() => logOut()} variant="contained" style={{ fontSize: "14px" }} color="primary">Logout</Button>
                }</div>
            </Toolbar>
        </Header>
    )
}

export default Navbar