require('../connect/connect');
let FeedBack = mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    touch:{
        type: String,
    }
});
let feedBack = mongoose.model('feedback',FeedBack);
module.exports = feedBack;