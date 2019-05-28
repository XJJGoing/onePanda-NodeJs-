const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const queryString = require('querystring');
const course = require('./JKD_URL').course;
const Stu_toLogin = require('../common/student_login').Sc_toLogin;
const now_zc = require('../public/JS/setInterval').now_zc;  //默认返回的周次
const router = express.Router();

//查询可选择的条件,并且默认第一周的课表。
router.get('/course',(req,res,next)=>{
    let stuData = req.query;
    Stu_toLogin(stuData,(data)=>{
        if(data.cookieAll) {

            //默认返回的学期,后面直接修改该学期就可以了
            let nowTerm = '2018-2019-2';

            let body = queryString.stringify({
                cj0701id:"",
                zc:"",
                demo:"",
                xnxq01id:nowTerm,
                sfFD:1,
            });
            //获取可查看的课表的请求
             let option = {
                url:course+`?${body}`,
                method:'GET',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded',
                    'Cookie': data.cookieAll,
                }
            };
            request(option,(err,red,body)=>{
                if(err){
                    next(err);
                }
                else if(!err&&red.statusCode === 200){

                     //解析学期的html。
                     let $ = cheerio.load(body);
                     let zc = $('#zc').children();
                     let term = $('#xnxq01id').children();
                     let courseArry = [];
                     let zcArry = [];
                     let termArry = [];
                     if(zc&&term){
                         for(let i=0;i<20;i++){
                             zcArry[i] = zc[i+1].children[0].data;
                             console.log(zcArry[i])
                         }
                         zcArry[20] = "假期";
                        for (let j=0;j<11;j++){
                            termArry[j] = term[j].children[0].data;
                            console.log(termArry[j])
                        }
                     }

                     //解析课表的html

                    //kbtable用来获取最后一行备注(整个table的id)
                    let table = $('#kbtable').children();
                    let tab_len = table.children().length-1;
                    //第一个参数为备注,第二个参数为备注的信息；
                    //console.log(table.children()[tab_len].children[1].children[0].data,table.children()[tab_len].children[3].children[0].data);
                    //返回下角的信息
                    let BZ = {
                        msg:table.children()[tab_len].children[1].children[0].data,
                        detail:table.children()[tab_len].children[3].children[0].data
                    };

                    ////获取页面每个tr中的 课程信息的第一个div的id
                    let arry1 = [];
                    for(let i = 1;i<tab_len;i++){
                        let id = '#'+table.children()[i].children[3].children[7].attribs.id;
                        arry1.push(id)
                    }

                    //进行遍历
                    arry1.forEach((item,index)=>{
                        for(let j=1,tt=item;j<=7;){
                            let div = $(tt).children();

                            //有课的时候div.length不为0;
                            if(div.length){
                                let len = div.length; //根据div.length的长度去解析html，因为有可能一个单元格出现多个对应的值，所以进行特殊的处理。
                                while(len>0){
                                  let course = {};
                                  let len1 = len-8;

                                  //因为体育课的len的长度为6，首先判断len的长度。
                                    if(len1<0){
                                        len1 = 0;
                                    }
                                  course.number = div[len1].prev.data;
                                  course.name = div[len1+1].prev.data;
                                  course.teacher = div[len1+2].children[0].data;
                                  course.zc = div[len1+4].children[0].data;
                                  course.xq = j;
                                  course.jc = index+1;
                                  if(course.name==="体育1"||course.name==="体育2"||course.name==="体育3"||course.name==="体育3"||course.name==="体育4"){

                                  }else{
                                      course.room = div[len1+6].children[0].data;
                                  }
                                    courseArry.push(course);
                                    len -=9;
                               }
                            }else{

                            }
                            tt = tt.replace(/-([0-9]+)-/g,`-${(++j)}-`);
                        }
                    });
                     //console.log(nowTerm);
                     res.json({
                         zc:zcArry,
                         term:termArry,
                         course:courseArry,
                         BZ:BZ,
                         nowTerm:nowTerm,
                         now_zc:now_zc,
                     })
                 }
            });
     }else{
            //查询失败的时候返回给客户端
          res.json({
              msg:0
          })
        }
  })
});

///写入可查询的条件
router.post('/course',(req,res,next)=>{
    let stuData = req.body;
    Stu_toLogin(stuData,(data)=> {
        if (data.cookieAll) {
            //返回的数组
            let courseArry = [];
            //查询的条件
            let body = queryString.stringify({
                cj0701id: "",
                demo: "",
                xnxq01id: stuData.term,
                sfFD: 1,
            });
            let option = {
                url: course + `?${body}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': data.cookieAll,
                }
            };
            request(option, (err, red, body) => {
                if (err) {
                    next(err);
                }
                else if (!err && red.statusCode === 200) {

                    let $ = cheerio.load(body);

                    //kbtable用来获取最后一行备注(整个table的id),并且根据备注是否存在来判断是否有课程
                    let table = $('#kbtable').children();
                    let tab_len = table.children().length-1;
                    if(!table.children()[tab_len].children[3].children[0]){
                        res.json({
                            course:courseArry,
                            BZ:""
                        })
                    }else{
                            //第一个参数为备注,第二个参数为备注的信息；
                            console.log(table.children()[tab_len].children[1].children[0].data,table.children()[tab_len].children[3].children[0].data);
                            //返回下角的信息
                            let BZ = {
                                msg:table.children()[tab_len].children[1].children[0].data,
                                detail:table.children()[tab_len].children[3].children[0].data
                            };

                            ////获取页面每个tr中的 课程信息的第一个div的id
                            let arry1 = [];
                            for(let i = 1;i<tab_len;i++){
                                let id = '#'+table.children()[i].children[3].children[7].attribs.id;
                                arry1.push(id)
                            }

                            //进行遍历
                            arry1.forEach((item,index)=>{
                                for(let j=1,tt=item;j<=7;){
                                    let div = $(tt).children();
                                    //有课的时候div.length不为0;
                                    if(div.length){
                                        console.log(div.length);
                                        let len = div.length; //根据div.length的长度去解析html，因为有可能一个单元格出现多个对应的值，所以进行特殊的处理。
                                        while(len>0){
                                            let course = {};
                                            let len1 = len-8;

                                            //因为体育课的len的长度为6，首先判断len的长度。
                                            if(len1<0){
                                                len1 = 0;
                                            }
                                            //console.log(div[len1].prev.data);
                                            course.number = div[len1].prev.data;
                                            course.name = div[len1+1].prev.data;
                                            course.teacher = div[len1+2].children[0].data;
                                            course.zc = div[len1+4].children[0].data;
                                            course.xq = j;
                                            course.jc = index+1;
                                            if(course.name==="体育1"||course.name==="体育2"||course.name==="体育3"||course.name==="体育3"||course.name==="体育4"){

                                            }else{
                                                course.room = div[len1+6].children[0].data;
                                            }
                                            courseArry.push(course);
                                            len -=9;
                                        }
                                    }else{
                                       // console.log("这个没课舒服");
                                    }
                                    tt = tt.replace(/-([0-9]+)-/g,`-${(++j)}-`);
                                }
                            });
                            //返回数据会客户端
                            res.json({
                                course: courseArry,
                                BZ:BZ
                            })
                        }
                    }
            });
        }else{  //获取失败（即登录失败返回0错误给客户端）
                res.json({
                    msg:0
                })
         }
      })
});
module.exports = router;