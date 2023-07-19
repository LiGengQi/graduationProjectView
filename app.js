import updateManager from './common/updateManager';

App({
  onLaunch: function () {},
  onShow: function () {
    updateManager();
  },
  globalData: {
    server:'https://www.testwechat.com',
    openId: '',
    userKind:'',
    userName:'',
    userImg:''
  }
});
