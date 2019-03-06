require('../connect/connect');
let TestSchema = mongoose.Schema({
    name:{
      type:String,
      require: true
    },
    answer:{
        type: String,
        require: true
    },
    resolve:{
        type:String,
        require:true
    }
});
let testSchema = mongoose.model('test',TestSchema);
module.exports = testSchema;