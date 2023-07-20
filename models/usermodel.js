const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a name"],

    },  
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique:true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please provide a valid email",
            ],
    },
    
    password: {
        type: String,   
        required: [true, "Please provide a password"],
        minlength: 10,
        select: false,
    },  
    timestamp: {    
        type: Date,
        default: Date.now,

    
    },


 
});


module.exports = mongoose.model("User", userSchema);