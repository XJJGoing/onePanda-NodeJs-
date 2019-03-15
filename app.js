/*入口文件的配置*/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

//创建app服务器
const app =express();

//配置session
app.use(session({
    secret: 'my_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge:10000,httpOnly:true},
    rolling:true,
}));


//设置加载openid的路由
const router1 = require('./routers/openid');
//const router2 = require('./routers/session');

//开放静态资源public
app.use('/public/',express.static(path.join(__dirname,'./public')));
app.use('/public/',express.static(path.join(__dirname,'./public')));

//post请求体的配置代码
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//这里是小贱贱
//挂载路由文件12
app.use(router1);
//app.use(router2);

//监听端口
app.listen(3000,()=>{
   console.log("running")
});