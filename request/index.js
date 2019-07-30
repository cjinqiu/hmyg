// 把我们共用的接口代码封装
export const request=(params)=>{
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
            }
        });
          
    })
}