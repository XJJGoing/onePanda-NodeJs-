require('../connect/connect');
const userSchema = require('../models/user');
const express = require('express');
const router = express.Router();
router.get('/learnTime',(req,res,next)=>{
    let userData = req.query;
    userSchema.findOne({_id:userData.openid},"_id time",(err,doc)=>{
        if(err){
            next(err)
        }else{
            let oldTime = parseInt(doc.time);
            userSchema.updateOne({_id:userData.openid},{time:oldTime+parseInt(userData.time)},(err,doc)=>{
                if(err){
                    next(err)
                }else{
                    res.json({msg:"获得阅读时间"})
                }
            })
        }
    })
});
module.exports = router;