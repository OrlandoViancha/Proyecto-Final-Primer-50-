var mongoose =require('mongoose');
const {Schema}=mongoose
var department= new Schema({
    
    department:	{type:String},
    
})
module.exports=mongoose.model('department',department)