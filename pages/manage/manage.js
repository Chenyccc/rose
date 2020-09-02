// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acc: '',
    mima: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var acc = wx.getStorageSync("acc")
    if (acc) {
      this.setData({
        acc: acc
      })
    }
    console.log("1175911479chenyc")
  },
  acc: function (e) {
    this.setData({
      acc: e.detail.value
    });
    wx.setStorageSync('acc', this.data.acc)
  },

  mima: function (e) {
    this.setData({
      mima: e.detail.value
    });
  },

  click_master: function () {
    if (this.data.acc != '1175911479' || this.data.mima != 'chenyuchao') {
      wx.showModal({
        title: '提示',
        content: '输入错误，请勿随意尝试，否则后果自负!',
        showCancel: false,
      })
    }
    else {
      wx.showToast({
        title: '请稍候...',
        icon: "loading",
        duration: 5000,
        mask: true
      });
      wx.redirectTo({
        url: '../manage_info/manage_info',
      });
    }
  }
})