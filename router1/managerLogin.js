require('../connect/connect');
const md5 =require('blueimp-md5');
const mangerSchema = require('../models/manger');
const express = require('express');
const router = express.Router();
router.post('/managerLogin',(req,res,next)=>{
    console.log(req.url);
    console.log(req.body);
    let data = req.body;
    mangerSchema.findOne({email:data.email,password:md5(md5(data.password))},(err,user)=>{
      if(err){
          //服务端错误
          next(err);
      }
      //console.log(user);
      if (!user){
         return res.json({status:0})
      }
       res.json({status:1})
    })
});
module.exports = router;