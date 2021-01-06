//app.js
App({
  onLaunch: function () {
    // 获取 右上角胶囊定位信息
    let dwObj = wx.getMenuButtonBoundingClientRect()
    let height_ = (
      20 + dwObj.height + dwObj.top
    )
    this.appHead.navHeight = height_
    this.appHead.capsuleTop = dwObj.top
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  globalData: {
    userInfo: null
  },
  musicObj:{
    isStart:false,
    startMusicId: '',
    music:{},
    musicId: '',
    isStop: false,
    music2:{}
  },
  pls: [],
  musics:[], // 歌单音乐集合
  startMusicIndex:0, //当前播放的音乐数组下标

  appHead:{
    navHeight: 0,
    capsuleTop: 0
  }
})