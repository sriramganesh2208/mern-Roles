const mongoose =require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/employee")
.then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log("not connected")
})


const UserSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"visitor"
    }
})

const userModel = mongoose.model("user",UserSchema)
module.exports = userModel