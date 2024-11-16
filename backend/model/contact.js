const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    id:{type:Number , required:true},
    firstName:{type:String , required:true},
    lastName:{type:String , required:true},
    email:{type:String , required:true},
    phone:{type:String , required:true},
    company:{type:String , required:true},
    jobTitle:{type:String , required:true}
})

const contactCollection = mongoose.model("contactCollection" , contactSchema);

module.exports = contactCollection