// components/gdHead/index.js
let sendUrl = require('../../utils/sendUrl.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height:{
      type: Number
    },
    top:{
      type: Number
    },
    height2:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    search(){
      let url = 'https://www.liyangit.top/liyang/music/getSouSuoUrl.json'
      wx.request({
        url: url,
        success:function(res){
          let l = res.data.data.substring(1,res.data.data.length - 1)
          wx.navigateTo({
            url: l,
          })
        }
      })

    }

  },
  ready: function(){
    let t = this
  }
})
