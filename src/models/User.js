
const mongoose = require("../db/connection");

const userSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true            
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: Buffer,
        required:true
    },
    tokens: [
        {
        token: {
            type:String,
            required: true
        },
        }
    ],
    likedWines: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Wine'
        }
    ]
    },
    {
        timestamps:true
    }
)

const User = mongoose.model("User", userSchema);

module.exports = User;

