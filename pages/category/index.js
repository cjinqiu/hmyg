// pages/category/index.js
import { request } from "../../request/index.js"
Page({
  data: {
    leftMenuList: [],
    rightCataList: [],
    currentIndex: 0,
    scrollTop: 0//点击左侧其他值在底部的时候切回让滚动条回到顶部
  },
  cates: [],
  //点击左侧菜单某一项激活
  handleTap(e) {
    const { index } = e.currentTarget.dataset
    const rightCataList = this.cates.data.message[index].children
    this.setData({
      currentIndex: index,
      //现在我们有一个需求，就是当点击左侧菜单的数据激活，右侧的数据跟着有一个变化，所以我们要拿到‘右侧菜单的数据’，先定一个全局变量，
      // 在接口数据登录成功后进行赋值。然后就可以拿到
      rightCataList
    })
  },
  onLoad() {
    // 在页面加载完成后获取数据
    const Cates = wx.getStorageSync("Cates");
    //判断数据
    if (!Cates) {
      // 发起请求,获取数据
      this.getCategoryList()
    } else {
      //判断是否有缓存的数据，先判断缓存的数据有没有过期，我们定义个时间为10s，如果大于了我们这个事件就过期
      if (Date.now() - Cates.time > 1000 * 10) {
        // 重新发起请求,获取数据
        this.getCategoryList()
      } else {
        // 如果有缓存数据的话，先获取缓存数据，然后重新赋值
        const localData = Cates.data
        // 给全局变量赋值
        this.cates = localData
        console.log(this.cates)
        // 再一次请求我们的数据
        const leftMenuList = this.cates.data.message.map(v => ({ cat_id: v.cat_id, cat_name: v.cat_name }));
        //右侧菜单数据
        const rightCataList = this.cates.data.message[0].children
        this.setData({
          leftMenuList,
          rightCataList,
          scrollTop: 0
        })
      }
    }

  },
  getCategoryList() {
    request({ url: "/categories" })
      .then(result => {
        // console.log(result)
        this.cates = result
        //把缓存的数据存起来
        wx.setStorageSync("Cates", { time: Date.now(), data: this.cates });

        // const message = this.cates.data.message
        //左侧菜单要的数据
        // const leftCataList=result.map(v=>({cat_id:v.cat_id,cat_name:v.cat_name}))
        const leftMenuList = this.cates.data.message.map(v => ({ cat_id: v.cat_id, cat_name: v.cat_name }));
        //右侧菜单数据
        const rightCataList = this.cates.data.message[0].children
        this.setData({
          leftMenuList,
          rightCataList,
          scrollTop: 0
        })
      })
  }
})