// pages/play/index.js
const sendUrl = require('../../utils/sendUrl.js')

let app = getApp()
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    alPicUrl:'',
    ars:'',
    src:'',
    al:'',
    audioCtx:{},
    navHeight: 0,
    capsuleTop: 0,
    showMusic: true,
    isPlay: false,
    pls: [],
    isZz: 'none'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      let t = this
      // 得到 全局背景音乐实例
      let backgroundAudioManager = wx.getBackgroundAudioManager()
      let str = decodeURIComponent(options.url)
      let strs = str.split('&')
      let ars = JSON.parse(strs[3])
      let arsJoin = ''
      ars.forEach(element => {
        arsJoin += element.name+'、'
      });
      arsJoin = arsJoin.substring(0,arsJoin.length -1)
      t.setData({id:strs[0],name:strs[1],alPicUrl:strs[2],ars:arsJoin,al:strs[4]})
      let url = sendUrl.baseUrl + 'song/url?id=' + t.data.id
      // if(app.musicObj.isStart == false || app.musicObj.musicId != t.data.id){
      wx.request({
        url: url,
        method:'GET',
        success: function(res){
          if(res.data.data[0].url == null){
            Dialog.alert({
              message: '错误！资源获取失败',
              theme: 'round-button',
            }).then(() => {
              // on close
              wx.navigateBack()
              console.info('确定，资源获取失败')
            });
          }else{
            // 播放
            t.setData({src:res.data.data[0].url})
            // 设置 音乐src
            backgroundAudioManager.src = res.data.data[0].url
            // 设置 音乐名称
            backgroundAudioManager.title = strs[1]
            // 设置 封面图 URL
            backgroundAudioManager.coverImgUrl = strs[2]
            // 设置专辑名称
            backgroundAudioManager.epname = strs[4]
            //设置 歌手名
            backgroundAudioManager.singer = arsJoin
            backgroundAudioManager.play()
            
            app.musicObj.music = backgroundAudioManager
            app.musicObj.musicId = t.data.id
            app.musicObj.music.onCanplay(()=>{
              app.musicObj.isStart = true
              t.setData({isPlay: true})
            })
            app.musicObj.music.onStop(()=>{
              t.setData({isPlay: false})
              app.musicObj.isStop = true
            })
            // 音乐自然结束播放后 自动下一首
            app.musicObj.music.onEnded(()=>{
              let rightIndex = app.startMusicIndex + 1
              let maxLength = app.musics.length - 1
              if(rightIndex > maxLength){
                rightIndex = 0
              }
              app.startMusicIndex = rightIndex
              t.setMusic(app.musics[rightIndex],t)
            })
            setTimeout(()=>{
              t.setData({showMusic: false})
            },2000)
            
          }
        }
      })
      // 请求获取评论
      let plUrl = sendUrl.baseUrl + 'comment/hot?id='+t.data.id+'&type=0&limit=50'
      wx.request({
        url: plUrl,
        success: function(res){
          app.pls = res.data.hotComments
          t.setData({pls: res.data.hotComments})
        }
      })
      // let gcUrl = sendUrl.baseUrl + 'lyric?id=' + t.data.id
      // wx.request({
      //   url: gcUrl,
      //   method:'GET',
      //   success: function(res2){
          
      //     let gc = res2.data.lrc.lyric
      //     let gcRow = gc.split('\n')
      //     gcRow.forEach(element => {
      //       let i = element.indexOf(']')
  
      //       console.info(
      //         '时间:'+ element.substring(1,i),
      //         '歌词:'+element.substring(i+1,element.length)
      //         )
      //     });
          
      //   }
      // })
    // }else{
    //   // 如果音乐已经在播放 不刷新音乐 继续播放
    //   t.setData({showMusic: false,isPlay: true,pls: app.pls})
    // }

  },
  backPage:function(){
    wx.navigateBack()
    
  },
  backHome:function(){
    wx.switchTab({url: '/pages/found/index'})
  },
  // 上一首下一首调用 
  setMusic: function(music,t){
    t.setData({showMusic: true})
    let arsJoin = ''
    music.ar.forEach(element => {
      arsJoin += element.name+'/'
    })
    arsJoin = arsJoin.substring(0,arsJoin.length -1)
    t.setData({
        id:music.id,
        name:music.name,
        alPicUrl:music.al.picUrl,
        ars:arsJoin,
        al:music.al.name
      })
    let url = sendUrl.baseUrl + 'song/url?id=' + t.data.id
    wx.request({
      url: url,
      method:'GET',
      success: function(res){
        if(res.data.data[0].url == null){
          Dialog.alert({
            message: '错误！资源获取失败',
            theme: 'round-button',
          }).then(() => {
            // 返回
           console.info('确定')
           wx.navigateBack()
          });
          
        }else{
          // 播放
          t.setData({src:res.data.data[0].url})
          // 设置 音乐src
          app.musicObj.music.src = res.data.data[0].url
          // 设置 音乐名称
          app.musicObj.music.title = music.name
          // 设置 封面图 URL
          app.musicObj.music.coverImgUrl = music.al.picUrl
          // 设置专辑名称
          app.musicObj.music.epname = music.al.name
          //设置 歌手名
          app.musicObj.music.singer = arsJoin
          app.musicObj.music.play()
          app.musicObj.musicId = t.data.id
          app.musicObj.music.onCanplay(()=>{
          app.musicObj.isStart = true
            t.setData({isPlay: true})
          })
          // 自然播放结束
          app.musicObj.music.onEnded(()=>{
            let rightIndex = app.startMusicIndex + 1
            let maxLength = app.musics.length - 1
            if(rightIndex > maxLength){
              rightIndex = 0
            }
            app.startMusicIndex = rightIndex
            t.setMusic(app.musics[rightIndex],t)
          })
          setTimeout(()=>{
            t.setData({showMusic: false})
          },2000)
        }
      }
    })
          // 请求获取评论
          let plUrl = sendUrl.baseUrl + 'comment/hot?id='+t.data.id+'&type=0&limit=50'
          wx.request({
            url: plUrl,
            success: function(res){
              app.pls = res.data.hotComments
              t.setData({pls: res.data.hotComments})
            }
        })
  },
  leftStart: function(){
    let leftIndex = app.startMusicIndex - 1
    let t = this
    if (leftIndex == -1){
      leftIndex = app.musics.length - 1
      
    }
    app.startMusicIndex = leftIndex
    this.setMusic(app.musics[leftIndex],t)
  },
  rightStart: function(){
    let rightIndex = app.startMusicIndex + 1
    let maxLength = app.musics.length - 1
    if(rightIndex > maxLength){
      rightIndex = 0
    }
    app.startMusicIndex = rightIndex
    let t = this
    this.setMusic(app.musics[rightIndex],t)
  },
  playMusic: function(){
     // 音乐是否停止
    let isStop = app.musicObj.isStop
    // 音乐是否正在播放
    let isStart = app.musicObj.isStart
    
    let backAudio = app.musicObj.music
    if(isStop == true){
          app.musicObj.isStop = false
          this.setData({isPlay: true})
          // 设置 音乐src
          app.musicObj.music.src = this.data.src
          // 设置 音乐名称
          app.musicObj.music.title = this.data.name
          // 设置 封面图 URL
          app.musicObj.music.coverImgUrl = this.data.alPicUrl
          // 设置专辑名称
          app.musicObj.music.epname = this.data.al
          //设置 歌手名
          app.musicObj.music.singer = this.data.ars
          app.musicObj.musicId = this.data.id
          app.musicObj.music.play()
          
    }else if(isStart == true){
      backAudio.pause()
      this.setData({isPlay: false})
      app.musicObj.isStart = false
    }else{
      backAudio.play()
      this.setData({isPlay: true})
      app.musicObj.isStart = true
    }

  },
  // 监听滚动条
  onPageScroll:function (e){
    let t = this
    if(e.scrollTop >1 ){
      t.setData({isZz: 'block'})
    }else{
      t.setData({isZz: 'none'})
    }
  },
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
          let url = sendUrl.baseUrl + 'song/url?id=' + t.data.id
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let dwObj = wx.getMenuButtonBoundingClientRect()
    let height_ = (
      20 + dwObj.height + dwObj.top
    )
    this.setData({
      navHeight: height_,
      capsuleTop: dwObj.top
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