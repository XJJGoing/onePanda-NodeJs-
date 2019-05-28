require('../connect/connect');
const feedbackSchema = require('../models/feedback');
const express = require('express');
const router = express.Router();
router.get('/feedback',(req,res,next)=>{
    console.log(req.url);
    console.log(req.query);
    let feedback_data = req.query;
    //首先查找出有多少个文档
    feedbackSchema.countDocuments({},(err,doc)=>{
        if (err){
            console.log("查询错误");
            next();
        } else {
                let id = doc+1;
                feedbackSchema.create({_id:id,content:feedback_data.msg,touch:feedback_data.msg1},
                    (err,doc)=>{
                        if (err){
                            console.log("插入失败");
                            next();
                        }else{
                            console.log("插入成功");
                            res.json({msg:"反馈成功"})
                        }
                 });
          }
    });
});

module.exports = router;