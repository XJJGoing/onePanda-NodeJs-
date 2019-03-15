//test3是简答题部分
const mongoose = require('mongoose');
require('../connect/connect');
let Test3Schema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    correct:{
        type:String,
        require: true
    },
    insert_time:{
        type:Date,
        require:true
    }
});
let test3Schema = mongoose.model('test3',Test3Schema);
module.exports = test3Schema;