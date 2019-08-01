// 把我们共用的接口代码封装
let jsonParams=0
export const request=(params)=>{
    // 加载提示事件
    jsonParams++
    wx.showLoading({
        title:'加载中' ,
    });
      
    return new Promise((resolve,reject)=>{
        const baseUrl="https://api.zbztb.cn/api/public/v1";
        wx.request({
            // 基准路径
            
            
            // 这里我们用展开的方式用params代替所有的数据
            ...params,
            url:baseUrl+params.url,
            success: (result) => {
                resolve(result)
            },
            fail:(err)=>{
                reject(err)
            },
            //请求成功后关闭加载提示。我们把这个事件写在complete，它不管是成功失败都会触发的
             complete: () => {
                jsonParams--
                wx.hideLoading();
             }
              
        });
          
    })
}