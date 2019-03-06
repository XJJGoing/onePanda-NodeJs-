require('../connect/connect');
let CollegeSchema = mongoose.Schema({
    name: {
        type:String,
    }
});
let collegeSchema = mongoose.model('college',CollegeSchema);
module.exports = collegeSchema;