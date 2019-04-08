const mongoose = require('mongoose');
require('../connect/connect.js');
let BookSchema = mongoose.Schema({
    _id: {
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    url:{
      type:String,
    },
    introduce:{
        type:String
    },
    author:{
        type:String
    },
    Price:{
        type:String
    },
    //test1为选择题，test2为判断题，test3为解答题
    test1:[],
    test2:[],
    test3:[]
});
let bookSchema = mongoose.model('book',BookSchema);
module.exports = bookSchema;