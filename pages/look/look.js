// pages/look/look.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    request_:'',
    vemss:'',
    ss:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '请稍候...',
      icon: "loading",
      duration: 5000,
      mask: true
    });
    var flag=0;
    this.data.request_ = wx.getStorageSync("request");
    var that = this;
    wx.request({
      url: that.data.request_ + '/v2ray_url.php', //真实的接口地址/////////////////////////////////////
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var vemss = '';
        var t = 0;
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i] == 'v') {
            t++;
          }
          if (res.data[i] == '[' && t >= 4) {
            break;
          }
          if (t >= 4) {
            vemss = vemss + res.data[i]
          }
        }
        vemss = vemss.substr(0, vemss.length - 1);
        that.setData({
          vemss: vemss
        })
        console.log(vemss)

        // var ss = '';
        // t = 0;
        // for (; i < res.data.length; i++) {
        //   if (res.data[i] == 'h') {
        //     t++;
        //   }
        //   if (res.data[i] == '[' && t >= 3) {
        //     break;
        //   }
        //   if (t >= 3) {
        //     ss = ss + res.data[i]
        //   }
        // }
        // ss = ss.substr(0, ss.length - 1);
        // that.setData({
        //   ss: ss
        // })
        // console.log(ss)
      },
      complete:function(){
         wx.hideToast();
         flag=1;
      }
    })
    setTimeout(function () {
      if(flag==0)
        wx.showModal({
          title: '提示',
          content: '获取失败，请打开调试并保持网络通畅。',
          cancelText: "打开调试",
          success: function (res) {
            if (res.cancel) {
              wx.navigateTo({
                url: '../help/help',
              });
            }
          }
        })
    }, 5000);
  },

  go:function(){
    wx.navigateTo({
      url: '../download/download',
    });
  },
})