//'use strict'

const express = require('express')
const path = require('path')
const index = require('./routes/index')
const login=require('./routes/login')
const date=require('./routes/appointment')
const registrer=require('./routes/registrer')
//Connection to the databaseName

require('./drivers/drivers-data')
//Inicializations
const app = express()
app.use(express.static(path.join(__dirname,'public')))
//Settings
app.set('port', process.env.PORT || 8080)
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')))

//Middlewares

//Routes
app.use('/',index)
app.use('/login',login)
app.use('/appointment',date)
app.use('/registrer',registrer)

//Start server
app.listen(app.get('port'), () => {
    console.log(`Server listen at port ${app.get('port')}`)
})