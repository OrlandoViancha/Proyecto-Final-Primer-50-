var mongoose =require('mongoose');
schema =mongoose.schema;
var person= new schema({
    personTitle: 	{type:String},
    personID:	{type:Number},
    name: 	{type:String},
    userId: 	{type:String},
    password: 	{type:String},
    gender: 	{type:String},
    age:	{type:Number}
})
module.exports=mongoose.model('Usuario',person)