// pages/category/index.js
import {request} from "../../request/index.js"
Page({
  data:{
    leftMenuList:[],
    rightCataList:[],
    currentIndex:0,
    scrollTop:0//点击左侧其他值在底部的时候切回让滚动条回到顶部
  },
  cates:[],
  //点击左侧菜单某一项激活
  handleTap(e){
    const {index} = e.currentTarget.dataset
    const rightCataList =this.cates.data.message[index].children
    this.setData({
      currentIndex:index,
      //现在我们有一个需求，就是当点击左侧菜单的数据激活，右侧的数据跟着有一个变化，所以我们要拿到‘右侧菜单的数据’，先定一个全局变量，
      // 在接口数据登录成功后进行赋值。然后就可以拿到
      rightCataList
    })
  },
  onLoad(){
    this.getCategoryList()
  },
  getCategoryList(){
    request({url:"/categories"})
    .then(result=>{
      // console.log(result)
      this.cates=result
      // const message = this.cates.data.message
      //左侧菜单要的数据
      // const leftCataList=result.map(v=>({cat_id:v.cat_id,cat_name:v.cat_name}))
      const leftMenuList=this.cates.data.message.map(v=>({cat_id:v.cat_id,cat_name:v.cat_name}));
      //右侧菜单数据
      const rightCataList =this.cates.data.message[0].children
      this.setData({
        leftMenuList,
        rightCataList,
        scrollTop:0
      })
    })
  }
})