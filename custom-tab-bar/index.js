import TabMenu from './data';
import CTabMenu from './canteen';
import MTabMenu from './mangant';
//底部导航栏
Component({
  data: {
    active: 0,
    list: TabMenu,
  },

  methods: {
    onChange(event) {
      this.setData({ active: event.detail.value });
      console.log(getApp().globalData.userKind == 2, getApp().globalData.userKind)
      // 商家
      if(getApp().globalData.userKind == 2 && event.detail.value == 0){
        wx.navigateTo({
          url: `../canteen/home/home`,
        })
      } else if(getApp().globalData.userKind == 2 && event.detail.value == 2){
        wx.navigateTo({
          url: `../canteen/statistics/index`,
          fail(res){
            console.log(res)
          }
        })
      } else if(getApp().globalData.userKind == 2 && event.detail.value == 3){
        wx.navigateTo({
          url: `../canteen/index`,
          fail(res){
            console.log(res)
          }
        })
      } else if(getApp().globalData.userKind == 2 && event.detail.value == 1){
       wx.switchTab({
        url: this.data.list[event.detail.value].url.startsWith('/')
          ? this.data.list[event.detail.value].url
          : `/${this.data.list[event.detail.value].url}`,
      });
      }
      // 商家
      // 管理员
      if(getApp().globalData.userKind == 3 && event.detail.value == 0){
        console.log('initManagement')
        wx.navigateTo({
          url: `../manager/home/home`,
          fail(res){
            console.log(res)
          }
        })
      } else if(getApp().globalData.userKind == 3 && event.detail.value == 1){
        wx.navigateTo({
          url: `../canteen-x/index`,
          fail(res){
            console.log(res)
          }
        })
      } else if(getApp().globalData.userKind == '3' && event.detail.value == 2){
        wx.navigateTo({
          url: `../index`,
          fail(res){
            console.log(res)
          }
        })
      }
      // 管理员

      // 学生
      if (getApp().globalData.userKind == 1) {
        wx.switchTab({
        url: this.data.list[event.detail.value].url.startsWith('/')
          ? this.data.list[event.detail.value].url
          : `/${this.data.list[event.detail.value].url}`,
      });
      }
      console.log(this.data.active)
    },

    init() {
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      const active = this.data.list.findIndex(
        (item) =>
          (item.url.startsWith('/') ? item.url.substr(1) : item.url) ===
          `${route}`,
      );
      this.setData({ active });
    },
    initCanteen() {
      this.setData({
        list:CTabMenu
      })
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      const active = this.data.list.findIndex(
        (item) =>
          (item.url.startsWith('/') ? item.url.substr(1) : item.url) ===
          `${route}`,
      );
      this.setData({ active });
    },
    initManagement() {
      this.setData({
        list:MTabMenu
      })
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      const active = this.data.list.findIndex(
        (item) =>
          (item.url.startsWith('/') ? item.url.substr(1) : item.url) ===
          `${route}`,
      );
      this.setData({ active });
    },
  },
  

});
