Page({
  data: {
    //单选选中
    checked: false,
    style: 'border-radius: 12rpx;',
    // 示例图片
    imageSrc: 'https://tdesign.gtimg.com/miniprogram/images/image1.jpeg',
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
  handlePopup1(e) {
      const { item } = e.currentTarget.dataset;

      this.setData(
        {
          titleName:'菜品添加',
          cur: item,
        },
        () => {
          this.setData({ visible: true });
        },
      );
    },
   handlePopup(e) {
      const { item } = e.currentTarget.dataset;

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
    
  },
  getImage(){
    console.log(123123)
  },

  onUnload() {
   
  },

 
  init(id) {
   
  },
  
  
});
