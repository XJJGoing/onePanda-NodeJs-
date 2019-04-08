//连接已经存在的数据库的集合的名称
require('../connect/connect');
const mongoose = require('mongoose');
const SessionSchema = new mongoose.Schema({});
const sessionSchema = mongoose.model('session',SessionSchema,'sessions');
module.exports = sessionSchema;