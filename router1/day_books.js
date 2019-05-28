const bookSchema = require('../models/book');
const express = require('express');
const router = express.Router();
let count = 10100101;
//setInterval(()=>{count += 1},10*1000);
router.get('/day_books',(req,res,next)=> {
    console.log(req.url);
    let id = count;
    bookSchema.find({_id:{$in:[id,id+1]}},(err,doc)=>{
        if (err){
            next();
        }else{
            let data = {
                name1:doc[0].name,
                url1:doc[0].url,
                introduce1:doc[0].introduce,
                name2:doc[1].name,
                url2:doc[1].url,
                introduce2:doc[1].introduce,
            };
            res.json(data)
        }
    })
});
module.exports = router;