const users = require('../models/UserModel')
//importing model
const jwt = require('jsonwebtoken')



exports.register = async (req, res) => {
    const { username, password, email } = req.body
    console.log(username, password, email)
    try
    {
        const existingUser = await users.findOne({ email })
        if (!existingUser) {
            const newUser = new users({
                username, password, email, profile_pic: '', github: '', linkedIn: ''
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        else {
            res.status(200).json("User Already Exist!!")
        }
    
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.login = async(req, res) => {
    const { email, password } = req.body
try{
    const existingUser= await users.findOne({email,password})
    if(existingUser){
        const token = jwt.sign({userId:existingUser._id},process.env.SECRET_KEY)
        res.status(200).json({token,username:existingUser.username,userGit:existingUser.github,userLink:existingUser.linkedIn,userPic:existingUser.profile_pic})
    }
    else{
        res.status(406).json("Login error!!..Invalid Email/Password ")
    }
}
catch(err){
res.status(404).json(err)
}
}


exports.profileUpdate =async(req,res)=>{
    try{
        const {username,github,linkedIn,profile_pic}=req.body
        const userId = req.payload
        const profile_picture = req.file?req.file.filename : profile_pic
        const existingUser = await users.findByIdAndUpdate({_id:userId},{username,github,linkedIn,profile_pic:profile_picture})
        await existingUser.save()
        res.status(200).json(existingUser)
    }
    catch(err){
        console.log(err);
        res.status(400).json(err)
        
    }


}