var mongoose =require('mongoose');
const {Schema}=mongoose
var Doctor= new Schema({
    doctorID:{type:String,require:true,unique:true},
    Name:{type:String,require:true},
    LastName:{type:String,require:true},
    schedule:[{
        state:{type:Boolean,require:true},
        id:{
            type:Schema.Types.ObjectId,
            ref:'Schedule'
        }
       
    }],
    dept:{type:Schema.Types.ObjectId, ref:'department'}
})
module.exports=mongoose.model('doctor',Doctor)