import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "./Signup.css"
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"

function Signup() {

    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")

    axios.defaults.withCredentials = true;
    
    const navigate = useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3000/login",{email,password})
        .then(res => {
           if(res.data.Status === "Success"){
                if(res.data.role === "admin"){
                    navigate("/dashboard")
                }else{
                    navigate("/")
                }
           }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className='all'>
      <div className='fir'>
            <h2>Register</h2>
        </div>

        <div className='sec'>
        <form onSubmit={handleSubmit}>
            

            <div className='mb-3'>
                <label htmlFor='email'>
                    <strong>Email</strong>
                </label>

                <input 
                    type='email'
                    placeholder='Enter Your Name'
                    autoComplete='off'
                    name='email'
                    className="form-control rounded-0"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className='mb-3'>
                <label htmlFor='email'>
                    <strong>Password</strong>
                </label>

                <input 
                    type='password'
                    placeholder='Enter Your Name'
                    autoComplete='off'
                    name='password'
                    className='form-control rounded-0'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type='submit' className='btn btn-success w-100 rounded-0'>
                Login
            </button>
        </form>
        <p>Already Have an Account</p>
        <Link to="/register" className='btn btn-default border w-100 bg-light rounded-0'>
            Sign Up
        </Link>

        </div>

      </div>
        
       

    </div>
  )
}

export default Signup