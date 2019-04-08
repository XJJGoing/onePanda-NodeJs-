/*入口文件的配置*/
require('./public/JS/setInterval');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
//const MongoStorge = require('connect-mongo')(session);

//创建app服务器
const app = express();

//设置解决跨域问题
app.all('*',(req,res,next)=>{
   res.header('Access-Control-Allow-Origin','*');
   res.header('Access-Control-Allow-Headers','Content-Type,Content-Length,Authorization,Accept');
   res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
   if(req.method === 'OPTIONS'){
       res.send(200);
   }
   else
   {
       next();
   }
});
//设置加载openid的路由
const login = require('./routers/login');
const logout = require('./routers/logout');
const userinfo = require('./routers/userinfo');
const feedback = require('./routers/feedback');
const  day_books = require('./routers/day_books');
const  managerLogin = require('./routers/managerLogin');
const  clock = require('./routers/clock');
const  chooseInfo = require('./routers/chooseInfo');
const  partice = require('./routers/partice');
const  learnTime = require('./routers/learnTime');
const  insert = require('./routers/insert');

//开放静态资源public
app.use('/public/',express.static(path.join(__dirname,'./public')));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules')));

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

//对错误进行统一的处理
app.use((req,res,next,err)=>{
    if(err){
        res.status(500).json({msg:err.message})
    }
});

//监听端口
app.listen(3000,(err)=>{
    if(err){
        console.log("端口错误");
    }
   console.log("running")
});