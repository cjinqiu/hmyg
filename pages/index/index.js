// pages/index/index.js
import {request} from "../../request/index.js"
Page({
  data:{
    swiperList:[],
    navCateList:[],
    floorList:[]
  },
  onLoad(){
    this.getSwipeList(),
    this.getnavCateList(),
    this.getFloorList()
  },
  getSwipeList(){
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     console.log(result)
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    // });
    request({url:"/home/swiperdata"})
    .then(result=>{
      this.setData({
        swiperList:result.data.message
      })
    })
  },
  getnavCateList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
        navCateList:result.data.message
      })
    })
  },
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
      this.setData({
        floorList:result.data.message
      })
    })
  }
})