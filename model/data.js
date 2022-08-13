const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    title:{
        type:'string',
    },
    dueDate:{
        type:'string',
    },
    file:{
        type:'string',
        default:'',
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
},{
    timestamps:true,
});

const data = mongoose.model('Data',Schema);
module.exports = data;