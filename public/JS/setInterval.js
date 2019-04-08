require('../../connect/connect');
const userSchema = require('../../models/user');
const change = ()=>{
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    if (hours==0&&minutes==0&&seconds==0)
    {
        userSchema.updateMany({},{status:1},(err,doc)=>{
            if (err){
                console.log("服务端错误");
            } else{
                console.log(doc);
            }
        })
    }
};
const timer = setInterval(change,1000);
module.exports = timer;