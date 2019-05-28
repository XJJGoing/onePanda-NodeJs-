require('../connect/connect');
const express = require('express');
const router = express.Router();
const userSchema = require('../models/user');
//用户的打卡
router.get('/clock',(req,res,next)=>{
    let data = req.query;
    userSchema.findOne({_id:data.openid},(err,doc)=>{
        if (err){
            next()
        }
        else{
            console.log(doc);
            console.log(doc.days);
            let learn_day = doc.days+1;
                userSchema.updateOne({_id:data.openid},{days:learn_day,status:0},(err,doc)=>{
                    if (err){
                        next()
                    }else {
                        res.json({msg: "打卡成功"});
                    }
                });
        }
    })
});
//获取用户的打卡的天数以及时时间
router.post('/clock',(req,res,next)=>
{
  let data = req.body;
  userSchema.findOne({_id:data.openid},(err,doc)=>{
      if (err){
          next()
      } else{
          res.json({
              days:doc.days,
              time:doc.time,
              status:doc.status
          })
      }
  })
});
module.exports = router;