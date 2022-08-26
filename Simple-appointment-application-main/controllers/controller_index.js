const express = require('express')
const session= require('express-session')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(session({
    secret:'123456789',
    resave:true,
    saveUninitialized:true
}))

const getIndex= (req,res)=>{
    if(req.session.loggedin){
        
        res.render('index',{title:"Página Principal",logged:true})
    }

    else{
        res.render('index',{title:"Página Principal",logged:false})
    }
   
}

const getLogout= function(req, res){

    req.session.destroy(()=>{
        res.redirect('/')
    })

}

module.exports={getIndex,getLogout}