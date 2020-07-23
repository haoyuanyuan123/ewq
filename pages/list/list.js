// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"",
    newMovies:[],
    title:"豆瓣详情"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type,
      title:options.title
    })
    console.log(options)
    
    wx.request({
        url: 'https://api.douban.com/v2/movie/'+options.type+'?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=20',
        method:'GET',
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success:(res)=>{
          console.log(res.data.subjects);
          this.setData({
            //怎么将变量变量名称?
            newMovies:res.data.subjects
          });
        }
      });  
                
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title:this.data.title,
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