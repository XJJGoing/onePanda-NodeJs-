require('../connect/connect');
const mongoose = require('mongoose');
let FeedBack = mongoose.Schema({
    _id:{
      type:Number,
      require: true
    },
    content:{
        type:String,
        require:true
    },
    touch:{
        type: String,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

let feedBack = mongoose.model('feedback',FeedBack);
module.exports = feedBack;