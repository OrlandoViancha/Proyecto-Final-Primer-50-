var mongoose =require('mongoose');
    
const {Schema}=mongoose
var schedule= new Schema({
  
    date: {type:String},
    hour: {type:String}
})
module.exports=mongoose.model('Schedule',schedule)