const express = require("express");
const route = express.Router();
const session = require("express-session");
const bodyParser = require("body-parser");

route.use(bodyParser.json());
const {
  getHistory,
  deleteAppointment,
  getAppointment,
  addAppointment,
} = require("../controllers/controller_appointment");

route.use(
  session({
    secret: "123456789",
    resave: true,
    saveUninitialized: true,
  })
);

route.get("/", getHistory);

route.delete("/", deleteAppointment);

route.get("/add", getAppointment);
route.post("/add", addAppointment);
/*
route.post('/', async (req, res)  =>{
    
    try{
        const doctor= await Schedule.find({})
        
        res.status(200).json({"result":true,"data":doctor})
    
    }
    catch(err){
        res.status(500).json({"result":false,"error":err.toString()})
    }

})*/
module.exports = route;
