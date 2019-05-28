const express = require('express');
const userSchema = require('../models/user');
const majorSchema = require('../models/major');
const collegeSchema = require('../models/college');

//使用promise对查询函数进行包装，解决异步问题
const find = (skip,limt)=>{
     return new Promise((resolve,reject)=>{
         if(skip===0){
             userSchema.find({},'name avatarUrl time days major college',(err,doc)=>{
                 if(err){
                     reject(err)
                 }else{
                     resolve(doc)
                 }
             }).skip(skip).limit(limt)
         }else{
             userSchema.find({},'name avatarUrl time days major college',(err,doc)=>{
                 if(err){
                     reject(err)
                 }else{
                     resolve(doc)
                 }
             }).skip(skip).limit(limt)
         }
     })
};

const addMajor = (doc)=>{
    return new Promise((resolve,reject)=>{
           for(let i = 0;i<doc.length;i++ ){
               majorSchema.find({_id:doc[i].major[0]},"name",(err,doc2)=>{
                   if(err){
                       reject(err)
                   }else{
                       doc[i].major = doc2[0].name;
                   }
               });
               if(i===doc.length-1){
                   resolve(doc)
               }
           }
    })
};

const addCollege = (doc)=>{
      return new Promise((resolve,reject)=>{
          doc.forEach((item,index)=>{
              collegeSchema.find({_id:item.college[0]},"name",(err,doc4)=>{
                  if(err){
                      reject(err)
                  } else{
                      doc[index].college = doc4[0].name;
                      if(index === doc.length-1){
                          resolve(doc)
                      }
                  }
              });
          });
      })
};

const router = express.Router();
router.get('/lines',(req,res,next)=>{
     console.log(req.url);
     console.log(req.query);
     let skip = parseInt(req.query.skip);
     let limt = 10 ;                //每次查询限制的个数
     find(skip,limt)
         .then((doc)=>{
             return addMajor(doc)
         })
         .then((doc)=>{
             return addCollege(doc)
         })
         .then((doc)=>{
             console.log("返回给客户端的",doc);
             res.json({
                 line:doc
             })
         })
         .catch((error)=>{
             next(error)
         })
});
module.exports = router;