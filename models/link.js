// var managerSchema = require('./manger.js');
// 导入json(暂存中的js文件)
// const mangers = require('./JSON(暂存)/mangers');

//插入mangers数据
/*if(mangers) {
    //console.log(mangers);
   managerSchema.insertMany(mangers, function (err, doc) {
        if (err) {
            console.log('插入失败')
        } else {
            console.log("文件写入数据库成功")
        }
    })
}*/

//插入test1题目
// var Test1Schema = require('./test1.js');
// 导入json(暂存中的js文件)
// const test1 = require('./JSON(暂存)/test1');
// console.log(test1)
// if (test1) {
//     Test1Schema.insertMany(test1, function (err, doc) {
//         if (err) {
//             console.log('插入失败')
//         } else {
//             console.log("文件写入数据库成功")
//         }
//     })
// }


//插入test3题目
// var Test3Schema = require('./test3.js');
// // 导入json(暂存中的js文件)
// // const test3 = require('./JSON(暂存)/test3');
// // if (test3) {
// //     Test3Schema.insertMany(test3, function (err, doc) {
// //         if (err) {
// //             console.log('插入失败')
// //         } else {
// //             console.log("文件写入数据库成功")
// //         }
// //     })
// // }

//////////////////////////////插入学院///////////////////////

/*require('../connect/connect');
const collegeSchema = require('./college');
//存入各个学院
let  colleges = require('./JSON(暂存)/college');
if(colleges){
    collegeSchema.insertMany(colleges,(err,doc)=>{
        if(err){
            console.log("插入失败")
        }else{
            console.log(doc)
        }
    })
}*/

//////////////////////////插入专业///////////////////////
/*const majorSchema = require('./major');
//存入各个专业;
let majors = require('./JSON(暂存)/major');
majorSchema.insertMany(majors,(err,doc)=>{
    if (err){
        console.log("插入失败")
    }else{
        console.log(doc)
    }
});*/




const bookSchema = require('./book');
const majorSchema = require('./major');
const test2Schema = require('./test2');
const test3Schema = require('./test3');
test2Schema.updateOne({_id:"1010010201"},{_id:"1010010101"},(err,doc)=>{
    if (err){
        console.log("更改失败");
        console.log(err)
    } else{
        console.log("更改成功")
    }
});
//这里书名的id采用的是不是自己生成的是前面1010是学院01是专业后面01就是表示第一本书
/*(const book = require('./JSON(暂存)/books');
console.log(book);
if(book){
    bookSchema.create(book,(err,doc)=>{
        if (err){
            console.log("插入失败")
        }else{
        console.log(doc);}
    });
}*/

//修改css权威指南一书
/*bookSchema.updateOne({_id:"10100101"},{url : "/public/xinguan/css.jpg"},(err,doc)=>{
   if (err){
       console.log("修改失败")
   } else{
       console.log("修改成功")
   }
});*/
/*majorSchema.updateOne({_id:"01"},{$push:{books:["10100101","10100102"]}},(err,data)=>{
    if (err){
        console.log("添加失败")
    }
    else{
        console.log("添加成功");
        console.log(data)
    }
});*/






