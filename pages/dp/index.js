// pages/mv/index.js
let sendUrl = require('../../utils/sendUrl.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor: '#666666',
    title: '',
    pls: [],
    mv: {},
    src: '',
    ars: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    let t = this
    t.setData({id:options.id,title:options.name,ars: options.ars})
    let getMv = sendUrl.baseUrl + 'mv/detail?mvid='+options.id
    let getMvSrc = sendUrl.baseUrl + 'mv/url?id='+options.id
    let getMvPl = sendUrl.baseUrl + 'comment/hot?id='+options.id+'&type=1'
    wx.request({
      url: getMv,
      success:function(res1){
        t.setData({mv:res1.data.data })
        wx.request({
          url: getMvSrc,
          success:function(res2){
            t.setData({src:res2.data.data.url })
            wx.createVideoContext('myVideo').play()
            wx.hideLoading()
          }
        })
      }
    })
    wx.request({
      url: getMvPl,
      success:function(res){
        t.setData({pls: res.data.hotComments})
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