import React from 'react'
import logo from "../assets/logo.svg"
import {useNavigate} from "react-router-dom"
import { useState } from 'react'
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function Signup() {
    let [show, setShow] = useState(false);
    const navigate = useNavigate();
    let {serverUrl}=useContext(authDataContext)
    let [firstName,setFirstName]=useState("")
    let [lastName,setLastName]=useState("")
    let [userName,setUserName]=useState("")
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [loading,setLoading]=useState(false)
    let [err,setErr]=useState("")

    const handleSignUp=async(e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            let result=await axios.post(`${serverUrl}/api/auth/signup`,{
                firstName,
                lastName,
                userName,
                email,
                password
            },{withCredentials:true})
            console.log(result)
            setErr("")
            setLoading(false)
            setFirstName("")
            setLastName("")
            setUserName("")
            setEmail("")
            setPassword("")
        }catch(error){
          setErr(error.response.data.message)
            setLoading(false)
        }   
    }
     
  return (
    <div className='w-full min-h-screen bg-[white] flex flex-col items-center justify-start'>
      <div className='p-[30px] lg:p-[35px] w-full h-[80px] flex items-center'>
        <img src={logo} alt="" />
      </div>
      <form className='w-[90%] max-w-[400px] h-[600px] md:shadow-xl bg-[#f3e4e4] rounded-2xl flex flex-col justify-center gap-[10px] p-[15px]' onSubmit={handleSignUp}>
            <h1 className='text-gray-800 text-[30px] font-semibold mb-[30px] '>Sign Up</h1>
            <input type="text" placeholder='firstName' required className='w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] rounded-md px-[20px] py-[10px]' onChange={(e)=>setFirstName(e.target.value)} />
            <input type="text" placeholder='lastName' required className='w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] rounded-md px-[20px] py-[10px]' onChange={(e)=>setLastName(e.target.value)} />
            <input type="text" placeholder='userName' required className='w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] rounded-md px-[20px] py-[10px]' onChange={(e)=>setUserName(e.target.value)} />
            <input type="email" placeholder='email' required className='w-full h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] rounded-md px-[20px] py-[10px]' onChange={(e)=>setEmail(e.target.value)} />
            <div className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] rounded-md relative'>
            <input type={show?"text":"password"} placeholder='password' required className='w-[full] h-[full] border-2 text-gray-800 text-[18px] border-none rounded-md px-[20px] py-[10px]' onChange={(e)=>setPassword(e.target.value)} />
            <span className='absolute right-[20px] top-[10px] text-[#24b2ff] font-semibold cursor-pointer' onClick={() => setShow(!show)}>{show?"hidden":"show"}</span>
            </div>
            {err && <p className='text-center text-red-500 text-semibold '>
            *{err}
            </p>}
            <button className='w-full h-[50px] rounded-full bg-[#24b2ff] mt-[30px] text-white cursor-pointer' disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
            <p className='text-center cursor-pointer' onClick={() => navigate('/login')}>Already have an account ? <span className='text-[#24b2ff] font-semibold cursor-pointer'>
                Login
            </span>  </p>
      </form>
    </div>
  )
}

export default Signup
