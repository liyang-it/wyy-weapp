const sendUrl = require('../../utils/sendUrl.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    top:0,
    bottom:0,
    height2: 0,
    jkl: false
  },
  openGd: (event)=>{

    wx.request({
      url: 'https://www.liyangit.top/liyang/music/getIsToGd.json',
      success: function(res){
        if(res.data.data == 0){
          wx.navigateTo(
            {
              url: '/pages/gedanT/index?id='+event.currentTarget.dataset.item.id
            }
          )
        }else{
          wx.navigateTo(
            {
              url: '/pages/gedan/gedan?id='+event.currentTarget.dataset.item.id
            }
          )
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let dwObj = wx.getMenuButtonBoundingClientRect()
    let height_ = (
      20 + dwObj.height + dwObj.top
    )
    this.setData({height: height_,top: dwObj.top,bottom:dwObj.bottom,height2:dwObj.height})
    wx.showLoading({
      title: '正在初始化中',
      mask: true
    })

    // 加载排行歌单数据
    let url = sendUrl.baseUrl + 'toplist/detail'
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=>{
        this.setData({gdList:res.data.list})
        wx.hideLoading()
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})