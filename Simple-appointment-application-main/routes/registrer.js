const express = require("express");
const session = require("express-session");
const router = express.Router();
const bodyParser = require("body-parser");

const Patient= require("../models/patient")
router.use(bodyParser.urlencoded({ extended: true }));
router.use(
  session({
    secret: "123456789",
    resave: true,
    saveUninitialized: true,
  })
);
router.use(bodyParser.json());
router.get("/", async (req, res) => {

    res.render('registrer',{"title":"Registro"})
});

router.post("/", async (req, res) => {

    try {

        const{name,lastname,nit,username,password} = req.body

        const patient=new Patient({"nit":nit,"name":name,"lastname":lastname,"username":username,"password":password})

        const result=  await patient.save()

       await res.redirect("../")
       
        
    } catch (error) {

        res.send({"result":error})
        
    }
    

    
})

module.exports = router;