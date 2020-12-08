// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [{name:'LiYang',age:18},{name:'XiaoXiao',age:18}],
    show: false,
    scanResult: ''


  },
  scanCode:function(){
    console.log('调用微信扫一扫');
    wx.scanCode({
      onlyFromCamera: true,
      success:(res)=>{
        console.log(res);
        let result = '\n 编码:'+res.charSet;
            result += '\n扫描状态:'+res.errMsg;
            result += '\n扫描返回数据:'+res.rawData;
            result += '\n扫描结果:'+res.result;
            result += '\n扫描类型:'+res.scanType;
            this.setData({scanResult:result});

      }
    })
  },
  isShow: function(){
    let show_ = !this.data.show;
    this.setData({show: show_});
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