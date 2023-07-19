//登录页面
import Toast from 'tdesign-miniprogram/toast/index';
// 获取应用实例
const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({
  data: {
    cur: {},
    motto: '同学，下午好',
    code:'',
    avatarUrl: defaultAvatarUrl,
    avatar:'',
    userName:'',
    sessionKey:'',
    userKind:'',
    userInfo: {},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  // dasdsa
  /**
   * 输入框更改事件
   * @param {*} e 
   */
  bindKeyInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      userName: e.detail.value
    });
    this.userName = e.detail.value
  },
  handlePopup() {
    this.setData({ visible: true });
    // const { item } = e.currentTarget.dataset;

    // this.setData(
    //   {
    //     cur: item,
    //   },
    //   () => {
    //     this.setData({ visible: true });
    //   },
    // );
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
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    console.log(avatarUrl)
    this.setData({
      avatarUrl,
    })
    this.avatar = avatarUrl
    
    console.log(this.avatar)
  },

  register(){
    console.log(this.avatar,123,this.userName)
    if(this.avatar == defaultAvatarUrl || this.avatar == null){
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请上传头像',
      });
      return;
    } else if(this.userName == '' || this.userName == null) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请填写用户名',
      });
      return;
    }
    const that = this
    const code = this.code;
    console.log(that.avatar)
    wx.uploadFile({
      url: getApp().globalData.server + '/register',
      filePath: that.avatar,
      name:'file',
      formData:{
        code:code,
        userName:that.userName,
        userKind:that.userKind,
        sessionKey: that.sessionKey
      },
      name: "file",
      header: {
        "content-type": "multipart/form-data"
      },
      success: function (res) {
        console.log(res)
        getApp().globalData.openId = res.data.openId;
        getApp().globalData.userKind = res.data.userKind;
        getApp().globalData.userName = res.data.userName;
        getApp().globalData.userImg = res.data.userImg;
        console.log(getApp().globalData.userName)
        if(res.data.userKind == 1){
          wx.switchTab({
            url: `../../pages/home/home` ,
            fail(res){
              console.log(res)
            }
          })
        } else {
          wx.navigateTo({
            url: that.userKind == 2 ? 
                                `../../pages/canteen/home/home` : 
                                `../../pages/manager/home/home`,
            fail(res){
              console.log(res)
            }
          })
        }   
      },
      complete(res){
        console.log(res)
      }
    })
  },
  // dsadsa
  userLogin(userInfo,userKind){
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: getApp().globalData.server + '/login',
            data: {
              code: res.code,
              userImg: userInfo.avatarUrl,
              userName: userInfo.nickName,
              userKind: userKind
            },
            success(res){
              console.log(res)
              getApp().globalData.openId = res.data.openId;
              getApp().globalData.userKind = res.data.userKind;
              getApp().globalData.userName = res.data.userName;
              getApp().globalData.userImg = res.data.userImg;
              if(userKind == 1){
                wx.switchTab({
                  url: `../../pages/home/home` ,
                  fail(res){
                    console.log(res)
                  }
                })
              } else {
                wx.navigateTo({
                  url: userKind == 2 ? 
                                      `../../pages/canteen/home/home` : 
                                      `../../pages/manager/home/home`,
                  fail(res){
                    console.log(res)
                  }
                })
              }
              // navigateTo
              // switchTab
              
            },
            complete(res){
              console.log(res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
        console.log(getApp().globalData)
      },
      fail(res){
        console.log(res)
      }
    })
  },
  getUserProfile(e) {
    // getApp().globalData.userKind = 1
    // wx.switchTab({
    //   url: `../../pages/home/home` ,
    //   fail(res){
    //     console.log(res)
    //   }
    // })
    const latitude = 38.783786320892
    const longitude = 121.1522403221911
    wx.openLocation({
      latitude,
      longitude,
      scale: 18
    })
    
    // console.log(e.currentTarget.dataset.id)
    // this.userKind = e.currentTarget.dataset.id
    // const that = this
    // wx.login({
    //   success (res) {
    //     that.setData({
    //       code: res.code,
    //     })
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: getApp().globalData.server + '/login',
    //         data: {
    //           code: res.code,
    //           userKind: e.currentTarget.dataset.id
    //         },
    //         success(res){
    //           that.code = res.data.openId;
    //           that.sessionKey = res.data.sessionKey
    //           console.log(res.data.openId)
    //           if(res.data.userName == null){
    //               that.handlePopup()
    //           } else{
    //             console.log(res)
    //             getApp().globalData.openId = res.data.openId;
    //             getApp().globalData.userKind = res.data.userKind;
    //             getApp().globalData.userName = res.data.userName;
    //             getApp().globalData.userImg = res.data.userImg;
    //             if(res.data.userKind == 1){
    //               wx.switchTab({
    //                 url: `../../pages/home/home` ,
    //                 fail(res){
    //                   console.log(res)
    //                 }
    //               })
    //             } else {
    //               wx.navigateTo({
    //                 url: res.data.userKind == 2 ? 
    //                                     `../../pages/canteen/home/home` : 
    //                                     `../../pages/manager/home/home`,
    //                 fail(res){
    //                   console.log(res)
    //                 }
    //               })
    //             }      
    //           }       
    //         },
    //         complete(res){
    //           console.log(res)
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //     console.log(getApp().globalData)
    //   },
    //   fail(res){
    //     console.log(res)
    //   }
    // })
// dasd

// dsads

    // wx.getUserProfile({
    //   desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //   success: (res) => {
    //     this.userLogin(res.userInfo,e.currentTarget.dataset.id)
    //     console.log(res)
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
        
    //   }
    // })
  },
})
