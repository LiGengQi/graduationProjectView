import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    goodRateValue: 1,
    isAnonymous: false,
    uploadFiles: [],
    gridConfig: {
      width: 218,
      height: 218,
      column: 3,
    },
    isAllowedSubmit: false,
    imgUrl: '',
    title: '',
    dishNo:'',
    goodsDetail: '',
    imageProps: {
      mode: 'aspectFit',
    },
   
  },

  onLoad(options) {
    console.log(options)
    this.dishNo = options.dishNo
    this.setData({
      imgUrl: options.imageUrl,
      title: options.title,
      dishNo: options.dishNo,
      goodsDetail: options.specs,
    });
  },


  onRateChange(e) {
    const { value } = e?.detail;
    const item = e?.currentTarget?.dataset?.item;
    this.setData({ [item]: value }, () => {
      this.updateButtonStatus();
    });
  },
 
  onAnonymousChange(e) {
    const status = !!e?.detail?.checked;
    this.setData({ isAnonymous: status });
  },

  handleSuccess(e) {
    const { files } = e.detail;
    console.log(files)
    this.commentUrl = files[0].url,
    this.setData({
      commentUrl:files.url,
      uploadFiles: files,
    });
  },

  handleRemove(e) {
    const { index } = e.detail;
    const { uploadFiles } = this.data;
    uploadFiles.splice(index, 1);
    this.setData({
      uploadFiles,
    });
  },

  onTextAreaChange(e) {
    const value = e?.detail?.value;
    this.textAreaValue = value;
    this.updateButtonStatus();
  },

  updateButtonStatus() {
    const {  goodRateValue,  isAllowedSubmit } = this.data;
    const { textAreaValue } = this;
    this.goodRateValue = goodRateValue
    const temp = goodRateValue  && textAreaValue;
    if (temp !== isAllowedSubmit) this.setData({ isAllowedSubmit: temp });
  },

  onSubmitBtnClick() {
    const { isAllowedSubmit } = this.data;
    if (!isAllowedSubmit) return;
    const that = this;
    console.log(getApp().globalData.userNo)
    wx.uploadFile({
      filePath: that.commentUrl,
      name: 'commentImage',
      formData:{
        dishNo:that.dishNo,
        commentContent:that.textAreaValue,
        commentScore:that.goodRateValue,
        userNo: getApp().globalData.openId
      },
      url:  getApp().globalData.server + '/uploadComment',
      complete(res){
        console.log(res)
      }
    })
    Toast({
      context: this,
      selector: '#t-toast',
      message: '评价提交成功',
      icon: 'check-circle',
    });
    wx.navigateBack();
  },
});
