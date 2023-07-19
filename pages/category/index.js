var app = getApp()
import Toast from 'tdesign-miniprogram/toast/index';
var that
Page({
  /**
   * 页面的初始数据
   */
  data: {
    visible:false,
    content:'',
    originFiles: [
      {
        url: 'https://tdesign.gtimg.com/miniprogram/images/example4.png',
        name: 'uploaded1.png',
        type: 'image',
      },
      
    ],
    gridConfig: {
      column: 2,
      width: 160, 
      height: 160,
    },
    config: {
      count: 1,
    },
    DataSource: [],
    photoWidth: wx.getSystemInfoSync().windowWidth / 5,
    popTop: 0, //弹出点赞评论框的位置
    popWidth: 0, //弹出框宽度
    isShow: true, //判断是否显示弹出框
  },
  showSuccessToast() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '发布成功',
      theme: 'success',
      direction: 'column',
    });
  },

  showWarningToast() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '请填写内容',
      theme: 'warning',
      direction: 'column',
    });
  },

  onShow() {
    if (getApp().globalData.userKind == 2) {
      this.getTabBar().initCanteen();
    }
    this.getTabBar().init();
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    this.onLoadData()
  },
  // 点击图片进行大图查看
  LookPhoto: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.photurl,
      urls: this.data.DataSource[e.currentTarget.dataset.index].resourceUrl,
    })
  },

  // 删除朋友圈
  delete: function(e) {
    const data = this.data.DataSource;
    
    const infoId = this.data.DataSource[e.currentTarget.dataset.index].infoId
    // wx.request({
    //   url: getApp().globalData.server + '/deleteUserInfo',
    //   data:{
    //     infoId: infoId
    //   },
    //   success(res){
    //     that.onLoad()
    //   }
    // })
    data.splice(e.currentTarget.dataset.index)
    this.setData({
      DataSource:data
    })
    // wx.request({
    //   url: getApp().globalData.server + '/deleteUserInfo',
    //   data:{
    //     infoId:infoId
    //   }
    // })
    wx.showToast({
      title: '删除成功',
    })
  },
  onLoadData(){
    const that = this
    wx.request({
      url: getApp().globalData.server + '/getInfoList',
      success(res){
        that.setData({
          DataSource: res.data
        })
      }
    })
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
  submitInfo: function(e){
    const that = this
    wx.uploadFile({
      url: getApp().globalData.server + '/pushUserInfo',
      filePath: that.data.originFiles[1].url,
      name: 'file',
      formData: {
        content:this.data.content,
        openId:getApp().globalData.openId,
      },
      success (res){
        const data = that.data.DataSource
        const info = {}
        data.add
      },
      fail(res){
        console.log(res.errMsg)
      }
    })
  },
  handleSuccess(e) {
    const { files } = e.detail;
    this.setData({
      originFiles: files,
    });
  },
  handleRemove(e) {
    const { index } = e.detail;
    const { originFiles } = this.data;
    originFiles.splice(index, 1);
    this.setData({
      originFiles,
    });
  },
  handleClick(e) {
    console.log(e.detail.file);
  },
})