// pages/log/log.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    help:0,
    count:0,
    request_: 0,
    id: '',
    time: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideToast();
    this.data.request_ = wx.getStorageSync("request");
    this.data.id = wx.getStorageSync("id");
    this.data.time = wx.getStorageSync("time");

    this.data.count=0;

    this.data.help = wx.getStorageSync("help");
    if(this.data.help==0)
      wx.showModal({
        title: '提示',
        content: '请确保调试功能打开，才能正常使用。',
        cancelText: "帮助",
        success: function (res) {
          if (res.cancel) {
            wx.navigateTo({
              url: '../help/help',
            });
          }
          wx.setStorageSync("help", 1);
        }
      })
  },

  look:function(){
    wx.showToast({
      title: '请稍候...',
      icon: "loading",
      duration: 5000,
      mask: true
    });
    var that=this;
    var time = that.data.time.substr(0, that.data.time.length - 9);
    wx.request({
      url: that.data.request_ + '/check.php',/////////////////////////////////////////
      data: {
        id: that.data.id,
        today: time,
      },
      success: function (res) {
        if (res.data=='1'){
          wx.navigateTo({
            url: '../look/look',
          });
        }
        else{
          wx.hideToast();
          wx.showModal({
            title: '提示',
            content: '您的服务已到期，请联系管理员续费。',
            showCancel: false,
          })
        }
      },
    })
  },

  help:function(){
    wx.navigateTo({
      url: '../help/help',
    });
  },
  manage:function(){
    this.data.count++;
    if (this.data.count>=10){
      this.data.count=0;
      wx.navigateTo({
        url: '../manage/manage',
      });
    }
  }
})