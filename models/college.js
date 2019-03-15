require('../connect/connect');
let CollegeSchema = mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    major:[]
});
let collegeSchema = mongoose.model('college',CollegeSchema);
module.exports = collegeSchema;