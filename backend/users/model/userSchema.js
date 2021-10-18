const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
   uname:{
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gen: {
        type: String,
        required: true
    },
  stat: {
        type: String,
        enum:["Active","InActive"],
        required: true,
        default:"Active"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
})


const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
