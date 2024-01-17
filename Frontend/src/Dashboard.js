import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Dashboard() {
    const [suc,setSuc] =useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials =true

    useEffect(()=>{
        axios.post("http://localhost:3000/dashboard")
        .then(res => {
          if(res.data === "success"){
                setSuc("Successded OK")
          }else{
            navigate("/")
          }
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

  return (
    <div>
        <h2>Dashboard</h2>
        <p>{suc}</p>
    </div>
  )
}

export default Dashboard