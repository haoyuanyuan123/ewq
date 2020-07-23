// components/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
        arr:{
          type:Array,
          value:""
        },
        title:{
          type:String,
          value:""
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
    id(a){
      var id=a.currentTarget.dataset.id
      this.triggerEvent("id",id)
    },
    detail(a){
           let {link}=a.currentTarget.dataset;
           let {title}=a.currentTarget.dataset
           wx.navigateTo({
             url: '../../pages/more/more?link='+link+"&title="+title,
           })
    }
  }
})
