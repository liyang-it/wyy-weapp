Page({

  /**
   * 页面的初始数据
   */
  data: {
    gitLink: 'https://github.com/liyang-it/wyy',
    vueLink: 'http://www.liyangit.top/wyy',
    emailLink: '1922802352@qq.com',
    height:0,
    bgColor: '#666666'
  },
  copyLink: (event)=>{
    wx.setClipboardData({
      data: event.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  openWeapp:function(){
      wx.navigateToMiniProgram({
        appId: 'wx5e3d87ca89c22e79',
        extraData: {
        from: 'liyang'
        },
        envVersion: 'release',
        success(res) {
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
    this.setData({height: height_})
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
