
Page({

  /**
   * 页面的初始数据
   */
  data: {
      arr:[]
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
  getInfo(a){
    console.log(a);
    this.setData({
      arr:a.detail.userInfo,
    })
    wx.setStorageSync('user', a.detail.userInfo)
     wx.login({
       complete: (res) => {
          console.log(res)
       },
     })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
           var user=wx.getStorageSync('user')
           if(user){
             this.setData({
               arr:user
             })
           }
  },
  loginout(){
    wx.removeStorageSync('user')
    this.setData({
      arr:""
    })
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