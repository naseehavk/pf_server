const mongoose = require('mongoose')

//constructor
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required : true,
    },
    password:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    profile_pic:{
        type:String
    },
    github:{
        type:String
    },
    linkedIn:{
        type:String
    }
})

const users = mongoose.model('users',userSchema)
module.exports=users



