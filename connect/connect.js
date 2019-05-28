/*连接数据库的模块*/
const mongooose = require('mongoose');
mongooose.connect('mongodb://czh:qiangg1235@127.0.0.1:27017/JustReading',{useNewUrlParser:true});
mongooose.connection.once('open',()=> {
    console.log('数据库连接成功')
});

