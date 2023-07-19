

Page({
  data: {
    cartGroupData: null,
    cur: {value: 'bottom', text: '底部弹出'},
    conteenList: [{
      title: "麻辣炸鸡",
      description:"当前预估等待用户：100人次",
      align:"top",
      image:"https://localhost/view/jianggutou.jpg",
    },{
      title: "烤鸭捞饭",
      description:"当前预估等待用户：36人次",
      align:"top",
      image:"https://localhost/view/kaoshenghao.jpg",
    },{
      title: "肥牛盖饭",
      description:"当前预估等待用户：98人次",
      align:"top",
      image:"https://localhost/view/kaoya.jpg",
    },{
      title: "辣子鸡",
      description:"当前预估等待用户：100人次",
      align:"top",
      image:"https://localhost/view/liangbanniuza.jpg",
    },{
      title: "肥牛饭",
      description:"当前预估等待用户：100人次",
      align:"top",
      image:"https://localhost/view/malakaoyu.jpg",
    },{
      title: "多行带图片",
      description:"一段很长很长的内容文字",
      align:"top",
      image:"https://tdesign.gtimg.com/miniprogram/images/cell1.png",
    },{
      title: "多行带图片",
      description:"一段很长很长的内容文字",
      align:"top",
      image:"https://tdesign.gtimg.com/miniprogram/images/cell1.png",
    },{
      title: "多行带图片",
      description:"一段很长很长的内容文字",
      align:"top",
      image:"https://tdesign.gtimg.com/miniprogram/images/cell1.png",
    },{
      title: "多行带图片",
      description:"一段很长很长的内容文字",
      align:"top",
      image:"https://tdesign.gtimg.com/miniprogram/images/cell1.png",
    },{
      title: "多行带图片",
      description:"一段很长很长的内容文字",
      align:"top",
      image:"https://tdesign.gtimg.com/miniprogram/images/cell1.png",
    },{
      title: "多行带图片",
      description:"一段很长很长的内容文字",
      align:"top",
      image:"https://tdesign.gtimg.com/miniprogram/images/cell1.png",
    },{
      title: "多行带图片",
      description:"一段很长很长的内容文字",
      align:"top",
      image:"https://tdesign.gtimg.com/miniprogram/images/cell1.png",
    },{
      title: "多行带图片",
      description:"一段很长很长的内容文字",
      align:"top",
      image:"https://tdesign.gtimg.com/miniprogram/images/cell1.png",
    },{
      title: "多行带图片",
      description:"一段很长很长的内容文字",
      align:"top",
      image:"https://tdesign.gtimg.com/miniprogram/images/cell1.png",
    },{
      title: "多行带图片",
      description:"一段很长很长的内容文字",
      align:"top",
      image:"https://tdesign.gtimg.com/miniprogram/images/cell1.png",
    },{
      title: "多行带图片",
      description:"一段很长很长的内容文字",
      align:"top",
      image:"https://tdesign.gtimg.com/miniprogram/images/cell1.png",
    },{
      title: "多行带图片",
      description:"一段很长很长的内容文字",
      align:"top",
      image:"https://tdesign.gtimg.com/miniprogram/images/cell1.png",
    },],
    position: [
      { value: 'top', text: '顶部弹出' },
      { value: 'left', text: '左侧弹出' },
      { value: 'center', text: '中间弹出' },
      { value: 'bottom', text: '底部弹出' },
      { value: 'right', text: '右侧弹出' },
    ],
  },

  // 调用自定义tabbar的init函数，使页面与tabbar激活状态保持一致
  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.addTheMapLayer();
  },
  bindClick(res){
    console.log(res)
    this.setData({ visible: true });
  },
  addTheMapLayer(){
    this.mapCtx = wx.createMapContext('mapview',this)
    this.mapCtx.addVisualLayer({
      layerId: '5e828c1e98c5',
       complete(){
         console.log(1)
       },
       success(){
         console.log(1123)
       },
       fail(){
         console.log(789)
       }

    })
    this.mapCtx.on('visualLayerEvent', (res) => {console.log(res,'qiqi')})
  },
  handlePopup(e) {
    const { item } = e.currentTarget.dataset;

    this.setData(
      {
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
  

  
});
