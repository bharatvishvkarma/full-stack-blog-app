import axios from 'axios'

// const url = 'https://tense-tuna-coat.cyclic.app/'
const url = 'http://localhost:7777'

export const updataImg = async(file)=>{
   return await axios.post(`${url}/upload`,file)
}

export const postComment = async(id,comment)=>{
   // console.log(comment)
   return await axios.patch(`${url}/postComment/${id}`,comment)
}

export const addUser = async (user)=>{
   return await axios.post(`${url}/addUser`, user,)
}

export const logIn = async (user)=>{

   return await axios.post(`${url}/logIn`,user)
}

export const checkLoggedIn = async ()=>{
   let token = localStorage.getItem('token')
   return await axios.get(`${url}/loggedInUser`,{
      headers: {
         'authorization': `Bearer ${token}`
      }
   })
}

export const getOne = async (id)=>{
   return await axios.get(`${url}/getOne/${id}`)
   
}

export async function signinWithGitHub(code){
   return await axios.get(`${url}/github-signin/${code}`)
}

 export async function addToBlog(obj){
   return await axios.post(`${url}/addblog`, obj)
}

export async function getAllBlogs(obj){
   // console.log(obj)
   return await axios.get(`${url}/getallblogs`,{params:obj})
}

export async function deleteOneBlog(id){
   return await axios.delete(`${url}/delete/${id}`)
}

export async function getOneBlog(id){
   return await axios.get(`${url}/get/${id}`)
}

export async function updateOne(id, obj){
   return await axios.patch(`${url}/update/${id}`,obj)
}