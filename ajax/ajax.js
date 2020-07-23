var request=function(url,data,header,method){
    var baseUrl="https://api.douban.com/v2";
    return new Promise((resolve,reject)=>{
       wx.request({
         url: baseUrl+url,
         data:data,
         header:header,
         method:method,
         success:(res)=>{
            resolve(res)
         },
         fail:(err)=>{
           reject(err)
         }
       })
    })
}
module.exports.request=request;