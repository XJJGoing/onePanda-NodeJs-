/*使用request模块 并且promise化请求接口*/
/*在此之前应该先安装request 通过npm进行安装*/
const request = require('request');
class Ut
{
    static promiseReq(opts = {}){
        return new Promise((resolve,reject) => {
            request(opts,(e,r,d)=>{
                if(e){
                    return reject(e)
                }
                //如果状态码不等于200则进行修改
                if(r.statusCode !== 200 ){
                    return reject(`back statusCode :${r.statusCode}`)
                }
                return resolve(d)
            })
        })
    }
}
module.exports = Ut;