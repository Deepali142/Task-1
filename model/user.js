const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name:{
        type:'string',
        required:true,
    },
    email:{
        type:'string',
        required:true,
        unique:true
    },
    password:{
        type:'string',
        required:true,
    }
},{
    timestamps:true,
});

const user = mongoose.model('User',Schema);
module.exports = user;