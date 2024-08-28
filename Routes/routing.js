const express=require('express')
const userController= require('../Controllers/userController')
const projectController=require('../Controllers/projectController')
//jwt middleware
const jwtmiddle= require('../Middlewares/jwtmiddleware')
const multermiddle = require('../Middlewares/multerMiddleware')


const route=express.Router()

route.post('/reg',userController.register)
route.post('/log',userController.login)
route.patch('/profile',jwtmiddle,multermiddle.single('profile_pic'),userController.profileUpdate)

route.post('/addproject',jwtmiddle,multermiddle.single('picture'),projectController.addProject)
route.get('/userProjects',jwtmiddle,projectController.getUserProjects)
route.get('/allProjects',projectController.getAllProjects)
route.delete('/deleteproject/:id',jwtmiddle,projectController.deleteproject)
route.put('/updateproject/:id',jwtmiddle,multermiddle.single('picture'),projectController.updateproject)

module.exports=route

