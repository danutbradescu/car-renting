const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        unique: true,
        require: true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model("User", userSchema)