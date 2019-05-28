require('../connect/connect');
const mongoose = require('mongoose');
let StudentSchema = mongoose.Schema({
    USERNAME:{
        type:String,
        require:true
    },
    studentName:{
        type:String,
    },
    major:{
        type:String,
    },
    xy:{
        type:String,
    },
    PASSWORD:{
      type:String,
      require: true,
    },
    create_time:{
        type:Date,
        default:Date.now
    },
    Stu_Cookie:{
        type:String
    },
});
let studentSchema = mongoose.model('students',StudentSchema);
module.exports = studentSchema;