/*连接数据库的模块*/
const mongooose = require('mongoose');
mongooose.connect('mongodb://czh:qiangg1235@129.204.208.59:27017/JustReading',{useNewUrlParser:true});
mongooose.connection.once('open',()=> {
    console.log('数据库连接成功')
});

