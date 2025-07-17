const mongoose = require('mongoose');
const { type } = require('os');
const {Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        require: true,
        minlength: 6,
    },
    createAt:{
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);
module.export = User;