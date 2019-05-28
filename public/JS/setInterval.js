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

let now_zc = 13;                 //实际周次减一。
//循环改变周次
const change2 = ()=>{
    let myDate = new Date();
    let day = myDate.getDay();
    let arry1 = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    if(arry1[day]==="星期一"&&now_zc<19){
        now_zc +=1;
    }else{
        now_zc = 19;
    }
};
const timer = setInterval(change,1000);
const timer2 = setInterval(change2,1000);
module.exports = {
   timer:timer,
   timer2:timer2,
   now_zc:now_zc
};