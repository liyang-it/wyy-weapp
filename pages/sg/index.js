
let sendUrl = require('../../utils/sendUrl.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor: '#666666',
    title: '',
    gs:{},
    musics:[],
    showXq: false,
    music:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    let t = this
    t.setData({title:options.name})
    let getGs = sendUrl.baseUrl + 'artist/detail?id='+options.id
    let getGsHot = sendUrl.baseUrl + 'artist/top/song?id='+options.id
    wx.request({
      url: getGs,
      success:function(res){
        t.setData({gs:res.data.data})
      }
    })
    wx.request({
      url: getGsHot,
      success:function(res){
        t.setData({musics:res.data.songs})
        console.info(t.data.musics)
        wx.hideLoading()
      }
    })
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
       url: '/pages/ybf/index?url=' + encodeURIComponent(urls),
     })
   },
   openPl: function(){
     wx.navigateTo({
       url: '/pages/lp/index?id='+ this.data.music.id+'&name='+this.data.music.name,
     })
   },
   openMv: function(){
     if(this.data.music.mv == 0){
       wx.showToast({
         title: '该歌曲无相关MV',
         icon:'error',
         duration: 3000
       })
       return
     }
     let ars = this.getArs(this.data.music.ar)
     wx.navigateTo({
       url: '/pages/dp/index?id='+ this.data.music.mv+'&name='+this.data.music.name+'&ars='+ars,
     })
   },
   getArs:function(ars){
     let str = ''
     ars.forEach(element => {
       str += element.name + '、'
     });
     str = str.substring(0,str.length - 1)
     return str
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