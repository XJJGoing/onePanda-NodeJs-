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
    time:{
          type:Number,
          default: 0
    },
    days:{
          type:Number,
          default:0
    },
    college:[],
    major:[],
    //判断用户是否存在,0表示用户已经退出,1表示用户还存在
    isLiving:{
        type:String,
        enum: ['0','1'],
    },
    create_time:{
        type:Date,
        default:Date.now
    },
    update_time:{
      type:Date,
    },
    session_key:{
      type:String,
      require:true
    },
    connect_id: {
        type: String,
    },
    //用户的打卡状态
    status:{
        type:Number,
        default:1
    },
});

let userSchema = mongoose.model('user',UserSchema);
module.exports = userSchema;


