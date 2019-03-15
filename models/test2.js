//test2判断题目。
const mongoose = require('mongoose');
require('../connect/connect');
let Test2Schema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    resolve:{
        type:String,
        require:true
    },
    correct:{
      type:String,
      enum:['true','false']
    },
    insert_time:{
        type:Date,
        default:Date.now
    }
});
let test2Schema = mongoose.model('test2',Test2Schema);
module.exports = test2Schema;