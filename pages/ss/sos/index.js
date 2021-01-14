// pages/ss/sos/index.js
let sendUrl = require('../../../utils/sendUrl.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor: '#666666',
    value:'',
    hots:[],
    searchs:[],
    results:[],
    showHot: true,
    showSearch:false,
    showResult:false,
    limit: 50,
    page: 1,
    resultCount: 0,
    showXq: false,
    music:{},
    showGss:false,
    gss:'',
    his_search:[],
    show_his_search:false
  },
  okSearch:function(){
    if(this.data.value.length == 0){
      return
    }
    this.getResult(this.data.value,this.data.limit)
    this.addSearchs(this.data.value,this)
  },
  onSearch:function(e){
    console.info('我是回车搜索')
    if(e.detail.length == 0){
      return
    }
    this.getResult(e.detail,this.data.limit)
    this.addSearchs(e.detail,this)
  },
  onChange:function(e){
    let t = this
    if(e.detail.length >=1){
      t.setData({showHot: false,showSearch: true,showResult:false})
      let url = sendUrl.baseUrl+ 'search/suggest?keywords='+e.detail+'&type=mobile'
      wx.request({
        url: url,
        success:function(res){
          t.setData({searchs:res.data.result.allMatch})
        }
      })
    }else{
      t.setData({showHot: true,showSearch: false,showResult:false})
    }
    t.setData({
      value: e.detail,
    });
  },
  openResult:function(e){
    let value = e.currentTarget.dataset.text
    this.addSearchs(value,this)
    this.getResult(value,this.data.limit)
  },
  addSearchs:(v,t)=>{
    let searchs = []
    if(wx.getStorageSync('his_search') == null || wx.getStorageSync('his_search') == ''){
      searchs.push(v)
      wx.setStorageSync('his_search', JSON.stringify(searchs))
    }else{
      searchs = JSON.parse(wx.getStorageSync('his_search'))
      // 判断一下 记录中是否有重复值
      if(searchs.includes(v) == false){
        searchs.push(v)
        wx.setStorageSync('his_search', JSON.stringify(searchs))
      }
    }
    t.setData({his_search:searchs.reverse(),show_his_search:true})
  },
  getResult:function(v,limit){
    wx.showLoading({
      title: '加载中...',
    })
    let t = this
    let url = sendUrl.baseUrl + 'search?keywords='+v+'&type=1&offset=0&limit='+limit
    t.setData({showHot: false,showSearch: false,value: v,showResult:true})
    wx.request({
      url: url,
      success:function(res){
        if(res.data.result.songs != undefined){
          console.info(res.data.result.songs)
          app.musics = res.data.result.songs
          t.setData({results: res.data.result.songs,resultCount:res.data.result.songCount})
        }
        wx.hideLoading()
      }
    })
  },
  startMusic: function(item){
    // 将当前播放的音乐下标赋值给全局变量
    app.startMusicIndex = item.currentTarget.dataset.index
    wx.request({
      url: sendUrl.baseUrl+'song/detail?ids='+item.currentTarget.dataset.text.id,
      success:function(res){
        // 获取音乐对象值 进行传递
        let id = item.currentTarget.dataset.text.id
        let name = item.currentTarget.dataset.text.name
        let alPicUrl = res.data.songs[0].al.picUrl
        let ars = JSON.stringify(item.currentTarget.dataset.text.artists)
        let al = item.currentTarget.dataset.text.album.name
        let urls = ''+id+'&'+name+'&'+alPicUrl+'&'+ars+'&'+al
        wx.navigateTo({
          url: '/pages/ybf/index?url=' + encodeURIComponent(urls),
        })
      }
    })

  },
  onClose: function(){
    this.setData({showXq: false})
  },
  showXqView: function(item){
    console.info(item)
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
    let ars = this.getArs(this.data.music.artists)
    wx.navigateTo({
      url: '/pages/dp/index?id='+ this.data.music.mvid+'&name='+this.data.music.name+'&ars='+ars,
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
  openGs: function(){
    this.setData({showGss:true,gss:this.data.music.artists})
  },
  onClose2:function(){
    this.setData({showGss:false})
  },
  openGs2:function(item){
    wx.navigateTo({
      url: '/pages/sg/index?id='+item.currentTarget.dataset.obj.id+'&name='+item.currentTarget.dataset.obj.name,
    })
  },
  loadGq:function(){
    let t = this
    let page = t.data.page + 1
    t.setData({page: page})
    wx.showLoading({
      title: '加载中...',
    })
    let url = sendUrl.baseUrl + 'search?keywords='+t.data.value+'&type=1&offset='+((page - 1) * t.data.limit)+'&limit='+t.data.limit
    t.setData({showHot: false,showSearch: false,value: t.data.value,showResult:true})
    wx.request({
      url: url,
      success:function(res){
        if(res.data.result.songs != undefined){
          app.musics = app.musics.concat(res.data.result.songs)
          t.setData({results: t.data.results.concat(res.data.result.songs),resultCount:res.data.result.songCount})
        }
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this

    if(wx.getStorageSync('his_search') == null || wx.getStorageSync('his_search') == ''){
      return
    }
    let searchs = JSON.parse(wx.getStorageSync('his_search'))
    if(searchs.length >=1){
      t.setData({show_his_search:true,his_search : searchs.reverse()})
    }else{
      t.setData({show_his_search:false})
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中...',
    })
    let t = this
    let url = sendUrl.baseUrl + 'search/hot/detail'
    wx.request({
      url: url,
      success:function(res){
        t.setData({hots:res.data.data})
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