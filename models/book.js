require('../connect/connect');
let BookSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    test:[]
});
let bookSchema = mongoose.model('book',BookSchema);
module.exports = bookSchema;