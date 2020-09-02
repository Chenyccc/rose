// pages/manage_info/manage_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    history: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideToast();
    this.data.time = wx.getStorageSync("time");

    var that = this;
    wx.showToast({
      title: '请稍候...',
      icon: "loading",
      duration: 5000,
      mask: true
    });
    var request_ = wx.getStorageSync("request");
    wx.request({
      url: request_ + '/info_re.php', //真实的接口地址////////////////////////////
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.length != 0) {
          var str1 = res.data;
          var arr1 = str1.split('$');
          for (var i = 0; i < arr1.length - 1; i++) {
            var arr2 = arr1[i].split(',');
            that.data.history.push(
              {
                idd: i,
                id: arr2[0],
                nickName: arr2[1],
                country: arr2[2],
                province: arr2[3],
                city: arr2[4],
                time: arr2[5],
              }
            )
          }
        }
        else
          that.data.history = [];
      },
      complete: function () {
        that.setData({
          history: that.data.history
        });
        wx.hideToast();
      }
    })
  },
  change:function(e){
    var that=this;
    var time = that.data.time.substr(0, that.data.time.length - 9);
    var flag=0;
    if (that.data.history[e.currentTarget.id].time != "0" && that.data.history[e.currentTarget.id].time != "永久"){
      var arr1 = that.data.history[e.currentTarget.id].time.split('/');
      var time1 = Number(arr1[0]) * 365 + Number(arr1[1]) * 30 + Number(arr1[2]);
      var arr2 = time.split('/');
      var time2 = Number(arr2[0]) * 365 + Number(arr2[1]) * 30 + Number(arr2[2]);
      if(time2-time1>=30)
        flag=1;
    }
    if (that.data.history[e.currentTarget.id].time=="0"||flag==1)
      wx.showModal({
        title: '提示',
        content: '确定修改该用户的服务时间吗？',
        success: function (res) {
          if (res.confirm) {
            wx.showToast({
              title: '请稍候...',
              icon: "loading",
              duration: 5000,
              mask: true
            });
            var request_ = wx.getStorageSync("request");
            
            wx.request({
              url: request_ + '/change_time.php',/////////////////////////////////////////
              data: {
                id: that.data.history[e.currentTarget.id].id,
                today: time,
              },
              success: function (res) {
                that.data.history[e.currentTarget.id].time=time;
                that.setData({history:that.data.history});
                wx.hideToast();
                wx.showToast({
                  title: '修改成功',
                  icon: 'success_no_circle',
                  duration: 500,
                  mask: true
                })
              },
            })
          }
        }
      })
  }

})