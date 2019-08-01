// pages/goods_list/index.js
import { request } from "../../request/index.js"
Page({
  data: {
    // tab栏
    tabs:[
      {
        id:0,
        text:"综合",
        isActive:true
      },
      {
        id:1,
        text:"销售",
        isActive:false 
      },
      {
        id:2,
        text:"价格",
        isActive:false
      }
    ],
    // 要渲染的数组
    GoodsList:[]
  },
  
    queryParams: {
      // 请求接口携带的参数
      //搜索关键字
      query: "",
      //id号
      cid: "",
      //当前页码
      pagenum: 1,
      // 页容量
      pagesize: 10
    },
  totalPages:1,
  onLoad(options) {
    console.log(options)
    //这里的形参可以拿到url后的参数
    this.queryParams.cid = options.cid;
    this.getGoodsList()
  },
  getGoodsList() {
    request({url:"/goods/search",data:this.queryParams})
    .then(result=>{
      console.log(result)
      // 计算总条数
      this.totalPages=Math.ceil(result.data.message.total/this.queryParams.pagesize)
      console.log(this.totalPages);
      
      this.setData({
        // GoodsList:result.data.message.goods
        GoodsList:[...this.data.GoodsList,...result.data.message.goods]
          
      })
      // 在下拉刷新之后，请求数据成功后，手动关闭下拉刷新
      wx.stopPullDownRefresh()
    })
  },
  // tab栏数据的切换，事件处理逻辑
  handleitemChange(e){
    // console.log(e)
    const {index} = e.detail
    const {tabs} = this.data
    // 遍历数组里面每一项
    tabs.map((v,i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({tabs})
  },
  // 页面上拉触底事件
  onReachBottom(){
    console.log("111111");
    
    // 判断上拉有没有下一页数据，如果没有就提示没有下一页数据，否则就是有下一页，让pagenum++，重新请求数据
    if(this.queryParams.pagenum>=this.totalPages){
      // 提示没有下一页
      // console.log("没有下一页");
      wx.showToast({
        title: '已经没有下一页数据',
        icon: 'none',
      });
    }else{
      this.queryParams.pagenum++
      this.getGoodsList()
    }
  },
  //处理下拉刷新页面，首先我们要在json文件中开启下拉刷新页面。
  // 下拉刷新，刷新到第一页
  onPullDownRefresh(){
    // 重置页面，返回到第一页
    this.queryParams.pagenum=1,
    // 重置数组
    this.setData({
      GoodsList:[]
    })
    // 重新发起请求
    this.getGoodsList();
  }
})