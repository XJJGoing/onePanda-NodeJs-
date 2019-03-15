const mongoose = require('mongoose');
require('../connect/connect');
let ManagerSchema = mongoose.Schema({
    name:{
      type:String,
      default:"试题录入管理者"
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require: true
    },
    mk_time:{
        type:Date,
        default:Date.now
    }
});
let managerSchema = mongoose.model('manager',ManagerSchema);
module.exports = managerSchema;
