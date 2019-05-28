require('../connect/connect');
const express = require('express');
const router = express.Router();
const test1Schema = require('../models/test1');
const test2Schema = require('../models/test2');
const test3Schema = require('../models/test3');
const bookSchema = require('../models/book');
router.get('/partice',(req,res,next)=>{
    let particeDetail = req.query;
    bookSchema.find({name:particeDetail.book},"test1 test2 test3",(err,doc)=>{
        if(err)
        {
            next(err)
        }
        else
        {
            let question;
            if(particeDetail.kind === "选择题"){
                question = doc[0].test1;
                test1Schema.find({_id:{$in:question}},(err,all)=>{
                    if(err){
                        next(err)
                    }else{
                        res.json({arry:all})
                    }
                })
            }

            //判断题目
            else if(particeDetail.kind ==="判断题"){
                question = doc[0].test2;
                test2Schema.find({_id:{$in:question}},(err,all)=>{
                    if(err){
                        next(err)
                    }else{
                        //console.log(all);
                        res.json({arry:all})
                    }
                })
            }

            //简答题
            else if(particeDetail.kind === "简答题") {
                question = doc[0].test3;
                test3Schema.find({_id:{$in: question}},(err,all)=>{
                    if (err){
                        next(err)
                    } else{
                        //console.log(all);
                        res.json({arry:all})
                    }
                })
            }
        }
    })
});
module.exports = router;