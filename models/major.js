require('../connect/connect');
const mongoose = require('mongoose');
let MajorSchema =  mongoose.Schema({
    _id:{
      type: String,
      require:true
    },
    name:{
        type:String,
        required:true
    } ,
    books:[],
});
let majorSchema = mongoose.model('major',MajorSchema);
module.exports = majorSchema;
