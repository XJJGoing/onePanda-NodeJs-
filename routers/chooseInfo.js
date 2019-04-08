//获得数据库中拥有专业的路由
require('../connect/connect');
const express = require('express');
const router = express.Router();
const majorSchema = require('../models/major');
const bookSchema = require('../models/book');
router.get('/chooseInfo',(req,res,next)=>{
   let particeDetail = req.query;
   //选择专业的时候从数据库中返回所有的专业给客户端
   if(particeDetail.item === "专业")
   {
       majorSchema.find({},"_id name",(err,doc)=>{
           if(err){
               next(err)
           }else{
               let arry1 = doc;
               res.json({arry:arry1})
           }
       })
   }
   //选择书籍的时候从数据库中返回书籍给客户端
   else if(particeDetail.item === "书籍") {
       majorSchema.find({name: particeDetail.major}, "_id books", (err, doc) => {
           if (err) {
               next(err)
           } else {
                let bookID = doc[0].books;
                bookSchema.find({_id:{$in:bookID}},"_id name",(err,doc)=>{
                   if(err){
                       next(err)
                   }else{
                       if(doc === null){
                         console.log("找不到书籍");
                         res.json({msg:"找不到"})
                       }
                       let arry1 = doc;
                       res.json({arry:arry1})
                   }
               })
           }
       })
   }
});
module.exports = router;