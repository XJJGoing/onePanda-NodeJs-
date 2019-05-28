//对学校教务处模拟登录方法的封装,并获取cookie
const port = require('../router2/JKD_URL').port;
const hostName = require('../router2/JKD_URL').hostName;
const login = require('../router2/JKD_URL').login;
const queryString = require('querystring');
const http = require('http');
const Sc_Login = (stuData,callback)=>{
     let stuData2 = queryString.stringify({
         USERNAME:stuData.userName,
         PASSWORD:stuData.userPassword,
     });
     console.log(stuData2);
     let option = {
         hostname:hostName,
         port:port,
         path:login,
         method: 'POST',
         headers: {
             "Content-Type":"application/x-www-form-urlencoded",
             "Content-Length":stuData2.length
         }
     };
     //console.log("发送请求的参数",option);
     const req1 = http.request(option,(res)=>{
         console.log(res.headers);
         if(res.headers.location) {
             let cookie = res.headers["set-cookie"];
             let cookie1 = cookie[0].slice(0, cookie[0].indexOf(';'));
             let cookie2 = cookie[1].slice(0, cookie[1].indexOf(';'));
             let cookieAll = cookie1 + ';' + cookie2;
             callback({cookieAll:cookieAll});
         }else{
             callback({msg:"重新获取cookie失败"})
         }
         res.on('data',()=> {});
         res.on('error',(error)=>{callback({msg:error.message})});
         res.on('end',()=>{});
     });
     req1.write(stuData2);
     req1.end();
};
module.exports = {
    Sc_toLogin:Sc_Login
};