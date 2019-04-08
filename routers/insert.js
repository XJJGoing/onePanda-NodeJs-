require('../connect/connect');
const test1Schema = require('../models/test1');
const test2Schema = require('../models/test2');
const test3Schema = require('../models/test3');
const bookSchema = require('../models/book');
const express = require('express');
const router = express.Router();
router.get('/insert',(req,res,next)=>{
   console.log(req.url);
   console.log(req.query);
   let insertData = req.query;
   let  bookId = insertData.bookId;
   //insertDate.item为0的时候 为选择题,1的时候为判断题 2的时候为简答题
    bookSchema.find({_id:bookId},"_id test1 test2 test3",(err,doc)=>{
       if(err)
       {
          next(err)
       }
       else {
          console.log(doc);

          //选择题的时候
          if(insertData.item === '0')
          {
             let length = doc[0].test1.length;

             //没有题目的时候
              let test1Id;
             if(length === 0){
                 test1Id = JSON.parse(bookId)+'01';
             } else {
                  let lastTestId = parseInt(doc[0].test1[length-1]);
                   test1Id = JSON.stringify(lastTestId+1)
             }

              //往书籍里面放题目
               bookSchema.update({_id:bookId},{$push:{test1:[test1Id]}},(err,doc)=>{
                  if(err){
                     next(err)
                  }else{

                  }
               });

              //往test1中增加题目
             test1Schema.create({_id: test1Id,
                                    name:insertData.question,
                                    correct:insertData.correct,
                                    resolve:insertData.resolve,option:[{A:insertData.chooseA,B:insertData.chooseB,C:insertData.chooseC,D:insertData.chooseD}]
             },(err,doc)=>{
                if(err){
                   next(err)
                }else{
                    res.json({msg:"插入选择题成功"})
                }
             })
          }

          //判断题的时候
           else if(insertData.item === '1'){
              let length = doc[0].test2.length;

              //没有题目的时候
              let test2Id;
              if(length === 0){
                  test2Id = JSON.parse(bookId)+'01';
              } else {
                  let lastTestId = parseInt(doc[0].test2[length-1]);
                  test2Id = JSON.stringify(lastTestId+1)
              }
              //往书籍里面放题目
              bookSchema.update({_id:bookId},{$push:{test2:[test2Id]}},(err,doc)=>{
                  if(err){
                      next(err)
                  }else{
                  }
              });

              //往test2中放题目
              test2Schema.create({_id: test2Id,
                  name:insertData.question,
                  correct:insertData.correct,
                  resolve:insertData.resolve,
              },(err,doc)=>{
                  if(err){
                      next(err)
                  }else{
                      res.json({msg:"插入选择题成功"})
                  }
              })

          }

          //填空题的时候
          else if(insertData.item === '2')
          {
              let length = doc[0].test3.length;
              //没有题目的时候
              let test3Id;
              if(length === 0){
                  test3Id = JSON.parse(bookId)+'01';
              } else {
                  let lastTestId = parseInt(doc[0].test3[length-1]);
                  test3Id = JSON.stringify(lastTestId+1)
              }

              //往书籍里面放题目
              bookSchema.update({_id:bookId},{$push:{test3:[test3Id]}},(err,doc)=>{
                  if(err){
                      next(err)
                  }else{
                  }
              });

              //往test3中放题目
              test3Schema.create({_id: test3Id,
                  name:insertData.question,
                  correct:insertData.correct,
              },(err,doc)=>{
                  if(err){
                      next(err)
                  }else{
                      res.json({msg:"插入选择题成功"})
                  }
              })
          }

        }
    });
});

module.exports = router;