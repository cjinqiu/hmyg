// components/GoodsList/GoodsList.js
Component({
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },
  // tab 栏切换的点击事件
  methods: {
    handleChange(e){
      // console.log(e);
      const {index} = e.currentTarget.dataset
      // 子组件触发父组件的事件
      this.triggerEvent("itemChange",{index})
    }
  }
})
