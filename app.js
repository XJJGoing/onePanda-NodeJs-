/*入口文件的配置*/

//计时器分别为打卡计时器和zc计时器。
require('./public/JS/setInterval').timer;
require('./public/JS/setInterval').timer2;

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const https = require('https');
//const MongoStorge = require('connect-mongo')(session);

//配置crt,key证书,用于创建https服务器
let certificate  = fs.readFileSync('./Nginx/1_www.justyunmeng.com_bundle.crt','utf-8');
let privatekey = fs.readFileSync('./Nginx/2_www.justyunmeng.com.key','utf-8');
let credentials = {
    key:privatekey,
    cert:certificate
};

//创建app服务器
const app = express();

let httpsServer = https.createServer(credentials,app);



//设置解决跨域问题
app.all('*',(req,res,next)=>{
   res.header('Access-Control-Allow-Origin','*');
   res.header('Access-Control-Allow-Headers','Content-Type,Content-Length,Authorization,Accept');
   res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
   if(req.method === 'OPTIONS'){
       res.send(200);
   } else {
       next();
   }
});

//设置加载openid的路由
const login = require('./router1/login');
const logout = require('./router1/logout');
const userinfo = require('./router1/userinfo');
const feedback = require('./router1/feedback');
const  day_books = require('./router1/day_books');
const  managerLogin = require('./router1/managerLogin');
const  clock = require('./router1/clock');
const  chooseInfo = require('./router1/chooseInfo');
const  partice = require('./router1/partice');
const  learnTime = require('./router1/learnTime');
const  insert = require('./router1/insert');
const  lines = require('./router1/lines');

//个人主页的路由
const  html = require('./router1/html');

//实现教务处的路由
const insert_student = require('./router2/Insert_student');
const exam = require('./router2/exam');
const course = require('./router2/course');

//开放静态资源public
app.use('/public/',express.static(path.join(__dirname,'./public')));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules')));

//设置配置express-art-template
app.engine('html',require('express-art-template'));
app.set('views',path.join(__dirname,'/views'));

//post请求体的配置代码
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//配置session
app.use(session({
    secret: 'JustReading',
    resave: false,
    saveUninitialized: false,
    //cookie:{ maxAge:1000 ,httpOnly:true},
    //rolling:true,
   /*store:new MongoStorge({
        url: 'mongodb://czh:qiangg1235@129.204.208.59:27017/JustReading',
    })*/
}));

//挂载路由文件
app.use(login);
app.use(logout);
app.use(userinfo);
app.use(feedback);
app.use(day_books);
app.use(managerLogin);
app.use(clock);
app.use(chooseInfo);
app.use(partice);
app.use(learnTime);
app.use(insert);
app.use(lines);

//渲染页面
app.use(html);

//学校教务处
app.use(insert_student);
app.use(exam);
app.use(course);

//对错误进行统一的处理
app.use((req,res,next,err)=>{
    if(err){
        res.status(500).json({msg:err.message})
    }
});

app.listen(80,(err)=>{
   if(err){
       console.log("80端口出错")
   }
   console.log(80)
});

httpsServer.listen(443,(err)=>{
   if(err){
       console.log("443端口错误")
   }
   console.log("443")
});
