const express =require("express")
const mongoose =require("mongoose")
const cors =require("cors")
const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")
const cookieParser =require("cookie-parser")
const userModel = require("./modals/User")
const app=express()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true
}))
app.use(cookieParser())

const verifyUser=(req,res,next)=>{
    const token = res.cookies.token;
    if(!token){
        return res.json("Token Is missing")
    }else{
        jwt.verify(token, "jwt-secret-key",(err,decoded)=>{
            if(err){
                return res.json("Error with Token")
            }else{
                if(decoded.role === "admin"){
                    next()
                }else{
                    return res.json("Not Admin")
                }
            }
        })
    }
}

app.get("/dashboard",verifyUser,(req,res)=>{
        res.json("Success")
})

app.post("/register",(req,res)=>{
    const {name,email,password} =req.body
    bcrypt.hash(password,10)
    .then(hash =>{
        userModel.create({name,email,password : hash})
        .then(user => res.json("Success"))
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
})

app.post("/login",(req,res)=>{
    const {email,password} =req.body;
    userModel.findOne({email:email})
    .then((user)=>{
        if(user){
            bcrypt.compare(password, user.password, (err,response)=>{
                if(response) {
                    const token = jwt.sign({email: user.email, role:user.role},
                       "jwt-secret-key",{expiresIn: '1d'} )
                       res.cookie('token', token)
                       return res.json({Status: "Success",role:user.role})
                }else{
                    return res.json("The Password is Incorrect")
                }
            })
        }else{
           return res.json("No Record Existed")
        }
    })
})


app.listen(3000,()=>{
    console.log("server is running")
})