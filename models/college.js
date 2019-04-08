require('../connect/connect');
const mongoose = require('mongoose');
let CollegeSchema = mongoose.Schema({
    _id:{
      type:String,
      require: true
    },
    name: {
        type:String,
        require:true
    },
    major:[]
});
let collegeSchema = mongoose.model('college',CollegeSchema);
module.exports = collegeSchema;