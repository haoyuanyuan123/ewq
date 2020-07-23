// // pages/details/details.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     //存储单一影片的信息
//     movie:[]
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     //获取当前影片的id
//     let id=options.id;
//     //异步获取影片的信息
//     wx.request({
//       url:'https://api.douban.com/v2/movie/subject/'  + id +'?apikey=0df993c66c0c636e29ecbb5344252a4a',
//       method:'GET',
//       header:{
//         'content-type':'application/x-www-form-urlencoded'
//       },
//       success:(res)=>{
//         this.setData({
//         movie:res.data
//       });
//       console.log(res.data.movie)

//       }
//     });
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })



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
         id:options.id
       })
       console.log(options)
  },
  getid(a){
    wx.navigateTo({
      url: '../list/list?type='+type+"&title="+title
    })
  },
  detail(e){
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?pid='+id,
    })
  },
  getdate(){
    // https://api.douban.com/v2/movie/subject/25924056
     request.request(
       "/movie/subject/"+this.data.id,
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