var request=require("../../ajax/ajax.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
       arr1:{},
       arr2:{},
       bang:[{image:"../../images/board1.jpg",first:"肖申克的救赎",two:"霸王别姬",three:"阿甘正传",title:"top250",avg1:"9.7",avg2:"9.6",avg3:"9.5"},
             {image:"../../images/board5.jpg",first:"星际穿越",two:"黑客帝国",three:"头号玩家",title:"科幻片",avg1:"9.3",avg2:"9.0",avg3:"8.7"},
             {image:"../../images/board6.jpg",first:"三傻大闹宝莱坞",two:"大话西游之月光宝盒",three:"两杆大烟枪",title:"喜剧片",avg1:"9.2",avg2:"9.1",avg3:"9.0"},
             {image:"../../images/board7.jpg",first:"蝙蝠侠：黑暗骑士崛起",two:"谍影重重3",three:"复仇者联盟4",title:"动作片",avg1:"8.8",avg2:"8.8",avg3:"8.5"}]
      },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getData1(){
    wx.showLoading({
      title: '加载中',
    })
    return request.request(
      "/movie/us_box",
      {apikey:"0df993c66c0c636e29ecbb5344252a4a"},
      {"Content-Type":"application/text"}
    )
    .then(res=>{
      console.log(res)
       var result=res.data
       result.title=result.title.slice(4);
      this.setData({
        arr1:result
      })
    })
  },
  getdatat11(){
    return request.request(
      "/movie/subject/"+this.data.arr1.subjects[0].subject.id,
      {apikey:"0df993c66c0c636e29ecbb5344252a4a"},
      {"Content-Type":"application/text"},
      "GET"
    ).then(res=>{
      console.log(res)
      var arr=this.data.arr1;
      arr.bac=res.data.trailers[0].medium;
      wx.setStorageSync('list1', arr);
      wx.setStorageSync('listtime', Date.now());
      this.setData({
        arr1:arr
      })
    })
  },
  getData2(){
    return request.request(
      "/movie/weekly",
      {apikey:"0df993c66c0c636e29ecbb5344252a4a"},
      {"Content-Type":"application/text"}
    ).then(res=>{
      console.log(res)
      var result=res.data
      result.title=result.title.slice(4);
     this.setData({
       arr2:result
     })
    })
  },
  getdatat22(){
    return request.request(
      "/movie/subject/"+this.data.arr2.subjects[0].subject.id,
      {apikey:"0df993c66c0c636e29ecbb5344252a4a"},
      {"Content-Type":"application/text"},
      "GET"
    ).then(res=>{
     wx.hideLoading();
      var arr=this.data.arr2;
      arr.bac=res.data.trailers[0].medium;
      wx.setStorageSync('item2', arr);
      this.setData({
        arr2:arr
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
   var list1= wx.getStorageSync('list1')
   var list2= wx.getStorageSync('item2')
   var listtime= wx.getStorageSync('listtime')
     if(!list1){
      this.getData1().then(this.getdatat11).then(this.getData2).then(this.getdatat22)
     }else{
       if(Date.now()-listtime>1000*600){
        this.getData1().then(this.getdatat11).then(this.getData2).then(this.getdatat22)
       }else{
         this.setData({
           arr1:list1,
           arr2:list2,
         })
       }
     }
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