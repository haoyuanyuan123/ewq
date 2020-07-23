var request=require("../../ajax/ajax.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      link:"",
      title:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        //console.log(options);
        
        this.setData({
          link:options.link,
          title:options.title
        })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  getData1(){
    wx.showLoading({
      title: '加载中',
    })
    return request.request(
      // "/movie/weekly",
      this.data.link,
      {apikey:"0df993c66c0c636e29ecbb5344252a4a"},
      {"Content-Type":"application/text"}
    ).then(res=>{
      console.log(res)
      var result=res.data
      result.title=result.title.slice(4);
     this.setData({
       arr:result
     })
    })
  },
  getdatat11(){
    return request.request(
      "/movie/subject/"+this.data.arr.subjects[0].subject.id,
      {apikey:"0df993c66c0c636e29ecbb5344252a4a"},
      {"Content-Type":"application/text"},
      "GET"
    ).then(res=>{
      wx.hideLoading();
      console.log(res)
      var arr=this.data.arr;
      var tagc=["#ED707A","#EB9161","#F6C470"]
      arr.bac=res.data.trailers[0].medium;
      arr.tagc=tagc
      wx.setStorageSync('list2', arr);
      this.setData({
        arr:arr
      })
    })
    
  },
   detail(e){
     var id=e.currentTarget.dataset.id;
     wx.navigateTo({
       url: '../detail/detail?pid='+id,
     })
   },
  onShow: function () {
     this.getData1().then(this.getdatat11)
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