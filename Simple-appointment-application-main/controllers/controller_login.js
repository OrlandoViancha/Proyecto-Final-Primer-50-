const express= require('express')
const session= require('express-session')
const route=express.Router()

const Patient= require('../models/patient')

route.use(session({
    secret:'123456789',
    resave:true,
    saveUninitialized:true
}))

const getLogin=function(req, res) {
    res.render('login',{title: 'Login',})
}
const Logged=async (req, res) =>{

    const{username,password}=req.body

    const result= await Patient.findOne({"username":username,"password":password}).count()
    const id= await Patient.findOne({"username":username,"password":password})

    
    try{
        if(result>0){
            req.session.usuario=username
            req.session.loggedin=true
            req.session.codepatient=id._id
            res.redirect('http://localhost:8080')
        }
        else{
            res.send("login incorrecto")
        }
    }
    catch(err){
        res.status(500).json({"result":false,"error":err.toString()})
    }
    
    
}

module.exports = {getLogin,Logged}