//该后台的设计是每次用户都登录一遍
const login = require('./JKD_URL').login;
const hostName = require('./JKD_URL').hostName;
const port = require('./JKD_URL').port;
const queryString = require('querystring');
const info = require('./JKD_URL').info;  //获取用户的学籍信息
const studentSchame = require('../models/JKD_students');
const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const http = require('http');
const router = express.Router();
router.get('/insert_student',(req,res,next)=>{
    let student = req.query;
    console.log(student);
    let toServer = queryString.stringify({
        USERNAME:student.userName,
        PASSWORD:student.userPassword,
    });

    let option = {
        hostname:hostName,
        port:port,
        path:login,
        method:'POST',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
            "Content-Length":toServer.length
        }
    };
    console.log("发送的option",option);
    //发送请求模拟登录
    let req1 = http.request(option,(res1)=>{
         console.log(res1.headers);
        if(res1.headers.location)
        {
            console.log("登录成功");
            let cookie = res1.headers["set-cookie"];
            let cookie1 = cookie[0].slice(0,cookie[0].indexOf(';'));
            let cookie2 = cookie[1].slice(0,cookie[1].indexOf(';'));
            let cookieAll = cookie1+';'+cookie2;
            console.log(cookieAll);

            //判断用户是否存在
            studentSchame.findOne({USERNAME:student.userName},(err,doc1)=>{
                if(err){
                    next(err)
                }else{
                    if(doc1){ //用户存在
                        console.log("该用户已经存在");
                        studentSchame.update({USERNAME:student.userName},{PASSWORD:student.userPassword},(err,doc)=>{
                            if(err){
                                next(err)
                            }else{
                                console.log("更新成功");
                                console.log(doc1);
                                res.json({cookie:cookieAll,
                                           studentName:doc1.studentName,
                                           xy:doc1.xy,
                                           number:doc1.USERNAME,
                                           major:doc1.major,
                                })
                            }
                        })
                    }else{  //用户没有存在
                          let option2 = {
                               url:info,
                               method: 'GET',
                               headers: {
                                  "Content-Type":"application/x-www-form-urlencoded",
                                  "Cookie": cookieAll,
                              }
                          };

                        //抓取用户的学号还有学院还有学号和学生姓名
                        request(option2,(err,red,body)=>{
                            if(err){
                                console.log(err)
                            }else{
                                let $ = cheerio.load(body);
                                let table = $('#xjkpTable').children();
                                let xy = table.children()[2].children[1].children[0].data.split('：')[1];
                                let major = table.children()[2].children[3].children[0].data.split('：')[1];
                                let studentName = table.children()[3].children[3].children[0].data;
                                studentSchame.create({USERNAME:student.userName,
                                    PASSWORD:student.userPassword,
                                    Stu_Cookie:cookieAll,
                                    xy:xy,
                                    major:major,
                                    studentName:studentName
                                },(err,doc)=>{
                                    if(err){
                                        next(err)
                                    }else{
                                        //返回cookie给客户端
                                        console.log(doc);
                                        res.json({
                                            cookie:cookieAll,
                                            studentName:studentName,
                                            xy:xy,
                                            number:student.userName,
                                            major:major,
                                        })
                                    }
                                })
                            }
                        });

                    }
                }
            });
        }
        else{
            //返回数字0表示学号或者密码错误
            res.json({msg:'0'})
        }
        res1.on('error',(error)=>{
            console.log(error.message)
        });
        res1.on('end',()=>{

        })
    });
    req1.write(toServer);
    req1.end();
});
module.exports = router;