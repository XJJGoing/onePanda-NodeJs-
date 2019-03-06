require('../connect/connect');
let MajorSchema =  mongoose.Schema({
    name:{
        type:String,
        required:true
    } ,
    books:[]
});
let majorSchema = mongoose.model('book',MajorSchema);
module.exports = majorSchema;
