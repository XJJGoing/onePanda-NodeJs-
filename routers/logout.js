const userSchema = require('../models/user');
const express = require('express');
const router = express.Router();
router.get('/logout',(req,res,next)=>{
    let openid = req.query.openid;
    userSchema.updateOne({_id:openid},{$set:{isLiving:'0'}},(err,doc)=>{
        if (err){
            next()
        } else{
            console.log(doc);
            res.status(200).json({msg:"退出登录成功"})
        }
    })

});
module.exports = router;