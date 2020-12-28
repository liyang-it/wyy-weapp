const sendUrl = require('../../utils/sendUrl.js')
let app = getApp()
var t = Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    gdBgImg: '',
    gdName:'',
    gdDesc: '',
    gdImg:'',
    trackIds:[],
    tracks:[],
    showXq: false,
    music: {},
    height:0,
    top: 0
  },
  backPage:function(){
    
    wx.navigateBack()
  },
  backHome:function(){
    
    wx.switchTab({url: '/pages/found/index'})
  },
  showXqView: function(item){
   this.setData({showXq: true,music: item.currentTarget.dataset.text})
  },
  // 下载 复制音乐链接
  copyLink:function(){
    let t = this
    wx.showModal({
      title: '提示',
      content: '点击复制,打开浏览器并在地址栏粘贴',
      confirmText: '复制链接',
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中...',
          })
          let url = sendUrl.baseUrl + 'song/url?id=' + t.data.music.id
          wx.request({
            url: url,
            method:'GET',
            success: function(res1){
              wx.setClipboardData({
              data: res1.data.data[0].url,
                success: function (res2) {
                  wx.getClipboardData({
                    success: function (res3) {
                      wx.showToast({
                        title: '链接复制成功'
                      })
                      wx.hideLoading()
                    }
                  })
                }
              })
            }
          })
        } else if (res.cancel) {}}
    })
  },
  onClose: function(){
    this.setData({showXq: false})
  },
  startMusic: function(item){
    // 将当前播放的音乐下标赋值给全局变量
    app.startMusicIndex = item.currentTarget.dataset.index
    // 获取音乐对象值 进行传递
    let id = item.currentTarget.dataset.text.id
    let name = item.currentTarget.dataset.text.name
    let alPicUrl = item.currentTarget.dataset.text.al.picUrl
    let ars = JSON.stringify(item.currentTarget.dataset.text.ar)
    let al = item.currentTarget.dataset.text.al.name
    let urls = ''+id+'&'+name+'&'+alPicUrl+'&'+ars+'&'+al
    wx.navigateTo({
      url: '/pages/play/index?url=' + encodeURIComponent(urls),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({id: options.id})
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
            gdDesc : res.data.playlist.description,
            trackIds: res.data.playlist.trackIds,
            tracks:   res.data.playlist.tracks,
          })
          app.musics = res.data.playlist.tracks
          wx.hideLoading()
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let dwObj = wx.getMenuButtonBoundingClientRect()
    let height_ = (
      20 + dwObj.height + dwObj.top
    )
    this.setData({
      height: height_,
      top: dwObj.top
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
