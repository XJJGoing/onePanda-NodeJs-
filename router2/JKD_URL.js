module.exports = {
       hostName : 'jwgl.just.edu.cn',
       port:8080,
       login:'/jsxsd/xk/LoginToXk',

       //选择年度的成绩
       exam:'/jsxsd/kscj/cjcx_list',

       //获取成绩选择查询年份的url
       exam_data:'http://jwgl.just.edu.cn:8080/jsxsd/kscj/cjcx_query?Ves632DSdyV=NEW_XSD_XJCJ',

       //获取查询体育成绩的url
       exam_PE:"",

       //获取查询课表的功能
       course:"http://jwgl.just.edu.cn:8080/jsxsd/xskb/xskb_list.do",

      //查看用户的学籍卡的信息
       info: `http://jwgl.just.edu.cn:8080/jsxsd/grxx/xsxx?Ves632DSdyV=NEW_XSD_XJCJ`,
};