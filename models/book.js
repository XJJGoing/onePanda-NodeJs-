const mongoose = require('mongoose');
require('../connect/connect.js');
let BookSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    introduce:{
        type:String
    },
    author:{
        type:String
    },
    Price:{
        type:Number
    },
    //test1为选择题，test2为判断题，test3为解答题
    test1:[],
    test2:[],
    test3:[]
});
let bookSchema = mongoose.model('book',BookSchema);
module.exports = bookSchema;