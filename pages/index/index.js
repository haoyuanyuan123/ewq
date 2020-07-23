//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    type:"",
    title:"豆瓣详情",
    //存储轮播图的文告
    swiperMovies:[],
      
    //存储各类的影片信息--对象类型
    boards:{
      //正在上映的影片
      'in_theaters':{
      //从第几条记录开始
        start:0,
        count:4,
        movies:[],
        title:"",
        type:""
      },
      //即将上映的影片
      'coming_soon':{
        start:0,
        count:4,
        movies:[],
        title:"",
        type:""
      },
      //TOP250的影片
      'top250':{
        start:0,
        count:12,
        movies:[],
        title:"",
        type:""
      }
    }
    
  },
  
  //加载影片信息
  /**
   * type表示影片的类型,字符串,可选值有in_theaters coming_soon top250
  */
  loadMovies(type,start,count){
    wx.request({
      url: 'https://api.douban.com/v2/movie/'+type +'?apikey=0df993c66c0c636e29ecbb5344252a4a&start='+start+'&count=' +count,
      method:'GET',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        //console.log(res.data.subjects);
         //this.setData({
           //怎么将变量变量名称?
           //'boards.type':res.data.subjects
         //});
        //对象暂存
        let object={};
        //存储所有的影片信息
        object['boards.'+type+'.movies']=res.data.subjects;
        //存储分类的标题类型
       // object['boards.'+type+'.title']=res.data.subjects;
        object['boards.'+type+'.title']=res.data.title.toUpperCase();
        object['boards.'+type+'.type'] = type
        // console.log(object);
        this.setData(object);
      }
    });   
  },
  
  onLoad: function () {
  
    //测试
    // this.loadMovies('in_theater',10);
    // this.loadMovies('coming_soon',10);
    // this.loadMovies('top250',10);
    // console.log(this.data.boards);

    //显示加载的提示框
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
    //通过循环结构加载相关分类的影片信息
    Object.keys(this.data.boards).map(key=>{
      this.loadMovies(key,this.data.boards[key].start,this.data.boards[key].count);
    });
    //console.log(this.data.boards);
    //获取轮播广告 
    wx.request({
      url: 'https://api.douban.com/v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10',
      method:'GET',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:(res)=>{
    console.log(res.data.subjects);
        
        this.setData({
          
          swiperMovies:res.data.subjects
        })
      }
    });

//隐藏加载
wx.hideLoading();

    //获取现在上映的电影

    // wx.request({
    //   url: 'https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=4',
    //   method:'GET',
    //   header:{
    //     'content-type':'application/x-www-form-urlencoded'
    //   },
    //   success:(res)=>{
    //     //console.log(res.data.subjects);
    //     this.setData({
    //       //怎么将变量变量名称?
    //       'boards.new':res.data.subjects
    //     });
    //   }
    // });       

    // //获取即将上映的影片
    // wx.request({
    //   url: 'https://api.douban.com/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=4',
    //   method:'GET',
    //   header:{
    //     'content-type':'application/x-www-form-urlencoded'
    //   },
    //   success:(res)=>{
    //     this.setData({
    //       'boards.coming':res.data.subjects
    //     });
    //   }
    // });    

    // //获取TOP250的影片
    // wx.request({
    //   url: 'https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=12',
    //   method:'GET',
    //   header:{
    //     'content-type':'application/x-www-form-urlencoded'
    //   },
    //   success:(res)=>{
    //     this.setData({
    //       'boards.top':res.data.subjects
    //     });
    //   }
    // });     
  }
})
