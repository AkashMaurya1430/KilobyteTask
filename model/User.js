const mongoose =require("mongoose")

const userSchema = mongoose.Schema({
    contact:{
        type: String,
        unique:true,
        required: true,
        minlength:10,
        maxlength:10,
    },
    password:{
        type:String,
        required:true,
    },
    userType:{
        type:String,
        required:true,
        enum:['Customer', "Delivery Person", 'Admin']
    },
},{timestamps:true})

module.exports = mongoose.model('User',userSchema);