const mongoose = require("../db/connection");

const expSchema = new mongoose.Schema(
    {
    location: {
        type: String,
        required: true            
    },
    who_with: {
        type: String,
        required: true,

    },
    occasion: {
        type: String,
        required: true,

    },
    when:{
        type: Date,
        required: true
    },
    reminder:{
        type: Boolean,
    },

        timestamps:true
}

)

const Experience = mongoose.model("EXperience", expSchema);

module.exports = Experience;

