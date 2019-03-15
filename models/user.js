require('../connect/connect');
const mongoose = require('mongoose');
let UserSchema = mongoose.Schema({
    _id:{
      type:String,
      require:true
    },
     name:{
          type:String,
     },
     gender:{
          type:String,
          enum:['0','1'],
     },
    adress:{
          type:String,
    },
    avatarUrl:{
          type:String
    },
    number:{
          type:Number
    },
    learn_time:{
          type:Number
    },
    learn_day:{
          type:Number
    },
    college:[],
    major:[],
});

let userSchema = mongoose.model('user',UserSchema);
module.exports = userSchema;


