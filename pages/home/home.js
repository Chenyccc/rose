// pages/home/home.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    request_: "http://149.28.52.231:10002",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    id:'',
    flag1:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.setStorageSync("request", this.data.request_);

    wx.getNetworkType({
      success: function (res) {
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        if (res.networkType == 'none') {
          wx.showModal({
            title: '提示',
            content: '网络连接不可用，请检测网络！',
            showCancel: false,
          })
          return;
        }
      }
    });
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              //填上自己的小程序唯一标识
              appid: 'wx4b7b239af543fd7c',
              //填上自己的小程序的 app secret
              secret: 'bd33ef852f5adb76f1024fa4619a81ca',
              grant_type: 'authorization_code',
              js_code: res.code
            },
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: function (openIdRes) {
              that.data.id=openIdRes.data.openid;
              wx.setStorageSync("id", that.data.id);
            },
            complete:function(){
              that.data.flag1=1
            }
          })
        }
      }
    })
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
            }
          })
        }
      }
    })
  },
  onShareAppMessage: function () {

  },
  bindGetUserInfo: function (e) {
    var that=this;
    if (e.detail.userInfo&&that.data.flag1==1){
      wx.showToast({
        title: '请稍候...',
        icon: "loading",
        duration: 5000,
        mask: true
      });
      var time = util.formatTime(new Date());
      wx.setStorageSync("time", time);
      wx.request({
        url: that.data.request_ + '/userinfo_wr.php',/////////////////////////////////////////
        data: {
          id: that.data.id,
          nickName: e.detail.userInfo.nickName,
          country: e.detail.userInfo.country,
          province: e.detail.userInfo.province,
          city: e.detail.userInfo.city,
          time:time,
        },
        success: function (res) {
          console.log(res)
        },
      })
      wx.navigateTo({
        url: '../log/log',
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '程序初始化失败，请重启小程序。',
        showCancel: false,
      });
    }
  }

})