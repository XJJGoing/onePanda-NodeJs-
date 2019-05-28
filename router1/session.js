/*require('../connect/connect');
const express = require('express');
const router = express.Router();
//利用session保持会话
router.get('/session',(req,res)=>{
    console.log(req.url);
    console.log(req.query);
    console.log(req.session.userinfo);
    if(req.session.userinfo){
        res.json({t1:'欢迎回来'})
    }else{
        res.json({t1:"请先登录"})
    }
});
module.exports = router;*/