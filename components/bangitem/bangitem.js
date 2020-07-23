// components/bangitem/bangitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
         arr:{
           type:Object,
           value:''
         },
         a:{
           type:String,
           value:""
         }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    detail(a){
      let {link}=a.currentTarget.dataset;
      let {title}=a.currentTarget.dataset
           wx.navigateTo({
             url: '../../pages/logs/logs?link='+link+"&title="+title,
           })
    }
  }
})
