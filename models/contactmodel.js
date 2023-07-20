const mongoose = require('mongoose');



const contactSchema = new mongoose.Schema({
   
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        
    },
     


    Name: {
        type: String,
        required: [true, "Please provide a name"],
    },

    Email: {
        type: String,
        required: [true, "Please provide a Email"],
    },

    Mobile: {
        type: String,
        required: [true, "Please provide a Mobile Number"],

    },
},{ 
    timestamps:true,
});

module.exports=mongoose.model("Contact",contactSchema);