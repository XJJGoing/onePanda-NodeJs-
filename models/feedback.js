require('../connect/connect');
let FeedBack = mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    touch:{
        type: String,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

let feedBack = mongoose.model('feedback',FeedBack);
module.exports = feedBack;