// components/tyHead/index.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgColor:{
      type: String
    },
    title:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight : app.appHead.navHeight,
    capsuleTop: app.appHead.capsuleTop
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backPage:function(){
      wx.navigateBack()
    },
    backHome:function(){
      wx.switchTab({url: '/pages/found/index'})
    },

  }
})
