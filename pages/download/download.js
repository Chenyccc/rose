// pages/download/download.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    download:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.download = wx.getStorageSync("download");
    if (this.data.download==0)
      wx.showModal({
        title: '提示',
        content: '请自行复制链接到浏览器下载文件。',
        showCancel: false,
        success: function (res) {
          wx.setStorageSync("download", 1);
        }
      })
  },
})