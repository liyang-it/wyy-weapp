// pages/pl/index.js
let sendUrl = require('../../utils/sendUrl.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor:'#666666',
    id: '',
    pls: [],
    page: 1,
    limit: 50,
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this
    t.setData({id:options.id,title:options.name})
    let url = sendUrl.baseUrl + 'comment/music?id='+options.id+'&offset=1&limit=50'
    console.info(url)
    wx.request({
      url: url,
      success:function(res){
        t.setData({pls:res.data.comments})
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
    let t = this
    let page = t.data.page + 1
    t.setData({page: page})
    let url = sendUrl.baseUrl + 'comment/music?id='+t.data.id+'&offset='+((page - 1) * t.data.limit)+'&limit=50'
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: url,
      success:function(res){
        let pls = res.data.comments
        t.setData({pls: t.data.pls.concat(pls)})
        wx.hideLoading()
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})