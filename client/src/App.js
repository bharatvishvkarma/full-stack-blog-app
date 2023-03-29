
import './App.css';
import {useState, createContext, useEffect} from 'react'
import Navbar from './components/navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkLoggedIn } from './api/api';
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
      <authContext.Provider value = {{user, isLoggedIn,setLoggedIn,setUser}} >
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



