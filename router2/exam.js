const hostName = require('./JKD_URL').hostName;
const port = require('./JKD_URL').port;
const exam = require('./JKD_URL').exam;
const Sc_Login = require('../common/student_login').Sc_toLogin;

//获取可选择查看的考试年度的url
const exam_data = require('./JKD_URL').exam_data;

const studentSchema = require('../models/JKD_students');
const queryString = require('querystring');
const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();

//还没选之前获取到所有的可选学期
router.get('/exam',(req,res,next)=>{
    console.log(req.url);
    let stuData = req.query;

    //封装的登录函数
    Sc_Login(stuData,(data)=>{
        let cookieAll = data.cookieAll;
        if(cookieAll) {
            console.log(cookieAll);
            let option = {
                url:exam_data,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cookie": cookieAll,
                }
            };
            console.log("发送的option1",option);
            request(option,(err, res2, body) => {
                if (err) {
                    next(err)
                } else {
                    let $ = cheerio.load(body);
                    let content = $('#kksj').children();
                    console.log(content.length);
                    let data = [];
                    for (let i = 1; i < 11; i++) {
                        data[i] = content[i].children[0].data;
                    }
                    //返回可选时间给客户端
                    res.json({data: data})
                }
            })
        }else{
            //登录失败可能已经修改过密码，清空客户端的缓存重新登录
            res.json({msg:0})
        }

    });
});

//选定之后获取成绩
router.post('/exam',(req,res,next)=> {
    console.log(req.url);
    let stuData = req.body;
    Sc_Login(stuData, (data) => {
        let cookieAll = data.cookieAll;
        if (cookieAll) {
             let item;
             if(stuData.item==='all'){
                 item=""
             }else{
                 item=stuData.item
             }
            //定义查询的条件
            let Body = queryString.stringify({
                kksj:item,
                kcxz:"",
                kcmc:"",
                xsfs:'all'
            });
            let option = {
                url: `http://${hostName}:${port}${exam}?${Body}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cookie": cookieAll,
                }
            };
            //发送查成绩的请求
            request(option, (err, red, body) => {
                if (err) {
                    next(err)
                } else if(!err&&red.statusCode === 200){
                    let $ = cheerio.load(body);
                    let exam = [];
                    let content = $('#dataList tr');
                    console.log("content的长度",content.length);
                    for (let i = 1; i < content.length; i++) {
                        let EXAM = {
                            order: content[i].children[1].children[0].data,
                            number: content[i].children[5].children[0].data,
                            name: content[i].children[7].children[0].data,
                            grade: content[i].children[9].children[0].data,
                            xf: content[i].children[11].children[0].data,
                            time: +content[i].children[13].children[0].data,
                        };
                        exam.push(EXAM);
                    }
                    //返回数据给客户端
                    if(exam){
                        res.json({exam:exam});
                    }
                }
            })   //request结束
        }else{   //得不到cookieAll登录失败
            res.json({msg:0})
        }
    });
});
module.exports = router;