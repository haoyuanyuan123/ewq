// miniprogram/pages/detail/detail.js
var request=require("../../ajax/ajax.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pid:"",
      arr:[],
      one:"",
      two:'',
      three:"",
      four:"",
      five:"",
      filmmaker:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       this.setData({
         pid:options.pid
       })
       console.log(options)
  },
  getdate(){
    // https://api.douban.com/v2/movie/subject/25924056
     request.request(
       "/movie/subject/"+this.data.pid,
      // "/movie/subject/27000084",
       {apikey:"0df993c66c0c636e29ecbb5344252a4a"},
       {"Content-Type":"application/text"},
       "GET"
     ).then(res=>{
        console.log(res)
        var obj=res.data.directors;
        var result=res.data.casts;
        for(let i=0;i<result.length;i++){
          obj.push(result[i])
        }
        this.setData({
          arr:res.data,
          one:res.data.rating.details[1]/res.data.ratings_count*50*(Math.abs(48-res.data.rating.stars)||"2"),
          two:res.data.rating.details[2]/res.data.ratings_count*50*(Math.abs(48-res.data.rating.stars)||"2"),
          three:res.data.rating.details[3]/res.data.ratings_count*50*(Math.abs(48-res.data.rating.stars)||"2"),
          four:res.data.rating.details[4]/res.data.ratings_count*50*(Math.abs(48-res.data.rating.stars)||"2"),
          five:res.data.rating.details[5]/res.data.ratings_count*50*(Math.abs(48-res.data.rating.stars)||"2")
        });
        wx.setNavigationBarTitle({
          title: this.data.arr.title,
        })
    })
  },
  detail(e){
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?pid='+id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.getdate();
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