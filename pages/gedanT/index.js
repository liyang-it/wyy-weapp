// pages/gedanT/index.js
let sendUrl = require('../../utils/sendUrl.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gdImg: '',
    gdBgImg: '',
    gdName:'',
    gdDesc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let getGdUrl = sendUrl.baseUrl + 'playlist/detail?id=' + options.id
    wx.request({
      url: getGdUrl,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=>{
        this.setData({
            gdImg:res.data.playlist.coverImgUrl,
            gdBgImg: res.data.playlist.tracks[0].al.picUrl,
            gdName : res.data.playlist.name,
            gdDesc : res.data.playlist.description
          })
          wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
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