require('../connect/connect');
const userSchema = require('../models/user');
const express = require('express');
const router = express.Router();
//获取微信小程序用户的openid以及session_key，从微信服务器
router.post("/api/openid",async(req,res)=>{
    const Ut = require('../common/utils');
    try {
        console.log(req.body);
        //用户上传的数据
        let data = req.body;
        //配置个人的appID，以及secret
        let appId = "wxd763acfcb06de61a";
        let secret = "e8e7ea381fff59c2081d115cb312b22e";
        //获取到的用户的code用户交换openid、session_key
        let {js_code} = req.body;
        let opts = {
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`
        };
        //引用请求模块，获取openid以及session_key
        let r1 = await Ut.promiseReq(opts);
        r1 = JSON.parse(r1);
        console.log(r1);
        let { msg } = "查找失败或者用户已经存在";
        //将用户的openid存入数据库中
        userSchema.findOne({_id:r1.openid},(err,user)=>{
            if(err||user){
                //用户已经存在或者发生错误
                res.json(msg)
            }else{
                //console.log('我是插入部分');
                userSchema.create({_id:r1.openid,name:data.nickName,gender:data.gender,avatarUrl:data.avatarUrl,adress: data.city}, (err,user)=>{
                  if(err){
                      console.log("插入用户失败")
                  }
                  else{
                      //插入成功并且返回session
                      console.log("插入用户成功");
                      req.session.userinfo = '唯一的信息';
                      res.json({t1:'登录成功'});
                  }
                })
            }
        });
    }
    catch(e)
    {
        console.log(e);
        res.json(e);
    }
});
module.exports = router;