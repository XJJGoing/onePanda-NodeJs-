const express = require('express');
const router = express.Router();
router.get('/',(req,res,next)=>{
    console.log(req.url);
    res.render('index.html');
});
module.exports = router;