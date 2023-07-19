Page({
  data: {
    //单选选中
    checked: false,
    style: 'border-radius: 12rpx;',
    popupFlag:0,
    conteenList: [{
      title: "麻辣炸鸡",
      description:"销量：100",
      align:"top",
      image:"https://localhost/view/jianggutou.jpg",
    },{
      title: "烤鸭捞饭",
      description:"销量：100",
      align:"top",
      image:"https://localhost/view/kaoshenghao.jpg",
    },{
      title: "肥牛盖饭",
      description:"销量：100",
      align:"top",
      image:"https://localhost/view/kaoya.jpg",
    },{
      title: "辣子鸡",
      description:"销量：100",
      align:"top",
      image:"https://localhost/view/liangbanniuza.jpg",
    },{
      title: "肥牛饭",
      description:"销量：100",
      align:"top",
      image:"https://localhost/view/malakaoyu.jpg",
    },{
      title: "麻辣炸鸡",
      description:"销量：100",
      align:"top",
      image:"https://localhost/view/jianggutou.jpg",
    },{
      title: "烤鸭捞饭",
      description:"销量：100",
      align:"top",
      image:"https://localhost/view/kaoshenghao.jpg",
    },{
      title: "肥牛盖饭",
      description:"销量：100",
      align:"top",
      image:"https://localhost/view/kaoya.jpg",
    },{
      title: "辣子鸡",
      description:"销量：100",
      align:"top",
      image:"https://localhost/view/liangbanniuza.jpg",
    },{
      title: "肥牛饭",
      description:"销量：100",
      align:"top",
      image:"https://localhost/view/malakaoyu.jpg",
    },],
    // 示例图片
    imageSrc: 'https://localhost/view/liangbanniuza.jpg',
    dishName:'',
    
    soldNum:0,
    price:0,
    detailedDescription:'',
    spuStockQuantity:0,
    dishIndex:0,
    cur: {},
    position: [
      { value: 'top', text: '顶部弹出' },
      { value: 'left', text: '左侧弹出' },
      { value: 'center', text: '中间弹出' },
      { value: 'bottom', text: '底部弹出' },
      { value: 'right', text: '右侧弹出' },
    ],
  },
  // 单选框
   handleChange(e) {
    this.setData({
      checked: e.detail.checked,
    });
  },
  handleSuccess(e) {
    const { files } = e.detail;
    this.setData({
      originFiles: files,
    });
  },
  handlePopup1(e) {
      const { item } = e.currentTarget.dataset;
      this.setData(
        {
          titleName:'菜品添加',
          cur: item,
          popupFlag : 1
        },
        () => {
          this.setData({ visible: true });
        },
      );
    },
   handlePopup(e) {
      const { item } = e.currentTarget.dataset;
      console.log(item)
      this.setData(
        {
          titleName:'菜品修改',
          cur: item,
        },
        () => {
          this.setData({ visible: true });
        },
      );
    },
    onVisibleChange(e) {
      this.setData({
        visible: e.detail.visible,
      });
    },
    onClose() {
      this.setData({
        visible: false,
      });
    },
  
  onLoad(options) {
    const that = this
    wx.request({
      url: getApp().globalData.server + '/getOwnDishes',
      data:{
        openId:getApp().globalData.openId,
      },
      success(res){
        that.setData({
          conteenList:res.data
        })
        that.conteenList = res.data
      },
      complete(res){
        console.log(res)
      }
    })
    
  },

  updataDish(res){
    console.log(res,this.conteenList[0])
    const index = res.currentTarget.dataset.index
    this.dishIndex = index
    this.setData({
      visible: true,
      imageSrc:this.conteenList[index].primaryImage,
      dishName:this.conteenList[index].dishName,
      soldNum:this.conteenList[index].soldNum,
      price:this.conteenList[index].price,
      detailedDescription:this.conteenList[index].detailedDescription,
      spuStockQuantity:this.conteenList[index].spuStockQuantity
    })
  },
  updataDishMsg(){
    const list = this.data.conteenList
    list.push({desc:null ,
      detailedDescription: "你好啊",
      dishImage: null,
      dishName: "骨头啊",
      dishNo: "1",
      price: 1500,
      primaryImage: "https://localhost/view/jianggutou.jpg",
      rawMaterials: "炸鸡",
      saasId: "88888888",
      soldNum: 0,
      spuId: null,
      spuStockQuantity: 1,
      storeId: "1"})
    this.setData({
      conteenList : list,
      visible: false
    })
  },

  getImage(){
    console.log(123123)
  },

  onUnload() {
   
  },

 
  init(id) {
   
  },
  
  
});
