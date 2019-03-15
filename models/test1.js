const mongoose = require('mongoose');
require('../connect/connect');
//选择题目
let Test1Schema = mongoose.Schema({
    name:{
      type:String,
      require: true
    },
    options:[
        {A:{type:String},
        B:{type:String},
        C:{type:String},
        D:{type:String}}
        ],
    resolve:{
        type:String,
        require:true
    },
    correct:{
        type:String,
        require:true
    },
    insert_time:{
        type:Date,
        default:Date.now
    }
});
let test1Schema = mongoose.model('test1',Test1Schema);
module.exports = test1Schema;