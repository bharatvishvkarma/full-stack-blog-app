
import './App.css';
import {useState, createContext, useEffect} from 'react'
import Navbar from './components/navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkLoggedIn, getAllBlogs } from './api/api';
import GithubSignin from './components/github';
import Create from './components/create';
import AllBlogs from './components/allblogs';
import Updateblog from './components/updatepost';
import OneBlog from './components/oneBlog';
import SingleBlog from './components/singleBlog';
import MyPost from './components/myPost';

export const authContext = createContext()



function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)  
  const [blogs,setBlogs] = useState([])

  const [loading, setLoading] = useState(true)
    const [radio, setRadio] = useState('popular')
    const [cat, setCategory] = useState("")
    const [skip, setSkip] = useState(0)
    const [deleted, setDeleted] = useState(1)
    const [totalLength, setTotalLength] = useState(-1)

    useEffect(() => {
      setLoading(true)
      // setTotalLength(0)
          getAllBlogs({ category: cat, skip: skip, radio }).then((response) => {

              setBlogs((prevBlogs) => [...prevBlogs, ...response.data.blogs])
              setTotalLength(response.data.allBlogs)
              setLoading(false)
          });
      
  },[radio,cat,skip, deleted])

  useEffect(()=>{
    checkLoggedIn()
    .then((response)=>{
      setLoggedIn(true)
      setUser(response.data.data)
    })
    
  },[isLoggedIn])
  // console.log(user)
  return (
    <div className="App">
      <authContext.Provider value = {{user, isLoggedIn,setLoggedIn,setUser,blogs,setBlogs,
      loading,setLoading,
      radio,setRadio,
      cat,setCategory,
      skip,setSkip,
      deleted,setDeleted,
      totalLength,setTotalLength
      
      }} >
      <ToastContainer />
        <Navbar/>
        {/* <OneBlog/> */}
        <Routes>
          <Route path = '/' element = {<AllBlogs />} />
          <Route path = '/login' element = {!isLoggedIn?<Login />:<Navigate to='/' />} />
          <Route path = '/signup' element = {<Signup />} />
          <Route path = '/github-singin' element = {<GithubSignin />} />
          <Route path = '/create' element = {isLoggedIn?<Create />:<Navigate to = '/login'/>} />
          <Route path = '/update/:id' element = {<Updateblog />} />
          <Route path = '/:id' element = {<SingleBlog />}/>
          <Route path = '/myPost' element = {isLoggedIn?<MyPost />:<Navigate to = '/login'/>}/>
        </Routes>
      </authContext.Provider>
      
    </div>
  );
}

export default App;



