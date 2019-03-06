/*连接数据库的模块*/
const mongooose = require('mongoose');
mongooose.connect('mongodb://localhost/Reading',{useNewUrlParser:true});
mongooose.connection.once('open',()=> {
    console.log('数据库连接成功')
});

