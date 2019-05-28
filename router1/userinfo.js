const collegeSchema = require('../models/college');
const majorSchema = require('../models/major');
const userSchema = require('../models/user');
const express = require('express');
const router = express.Router();
router.get('/userinfo',(req,res,next)=>{
    let userdata = req.query;
    let openid = userdata.openid;
    let college = userdata.college;
    let major = userdata.major;
    let number = userdata.number;
    //根据用户的数据查找出这个学院的id
    collegeSchema.findOne({name:college},(err,doc)=>
    {
        if(err) {
            console.log("查找学院失败")
        }else {
            let college_id = doc._id;
            majorSchema.findOne({name:major},(err,doc)=>{
                if (err) {
                    console.log("查找专业失败")
                }
                else {
                    let major_id = doc._id;
                    userSchema.updateOne({_id:openid},
                    {college:college_id,major:major_id,number:number},
                    (err,doc)=>{
                        if(err) {
                            next()
                        }
                        console.log(doc)
                    })
                }
            })
        }
    });

});
module.exports = router;