import { fetchHome } from '../../services/home/home';
import { fetchGoodsList } from '../../services/good/fetchGoods';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    imgSrcs: [],
    tabList: [],
    goodsList: [],
    goodsListLoadStatus: 1,
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: { type: 'dots' },
    swiperImageProps: { mode: 'scaleToFill' },
    pageIndex: 2,
    storeId: ''
  },

  goodListPagination: {
    index: 0,
    num: 10,
  },

  privateData: {
    tabIndex: 0,
  },

  onShow() {
    this.getTabBar().init();
  },
  updataLocation(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      isHighAccuracy: true,
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.request({
          url: getApp().globalData.server + '/student/updataLocation',
          data:{
            latitude: latitude,
            longitude: longitude,
          },
          complete(res){
            console.log(res)
          }
        })
        console.log(latitude,longitude)
      }
     })
  },

  onLoad() {
    this.init();
    this.updataLocation();
  },
  // 滑倒底部加载
  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList();
    }
  },

  onPullDownRefresh:function() {
    this.init();
  },

  init() {
    this.data.pageIndex= 1
    this.loadHomePage();
  },

  loadHomePage() {
    wx.stopPullDownRefresh();
    this.setData({
      pageLoading: true,
    });
    fetchHome().then(({ swiper, tabList }) => {
      this.setData({
        tabList,
        imgSrcs: swiper,
        pageLoading: false,
      });
      this.loadGoodsList(true);
    });
  },

  tabChangeHandle(e) {
    console.log("更改了")
    this.privateData.tabIndex = e.detail;
    
    this.setData({
      goodsList : ''
    })
    this.data.pageIndex = 2;
    this.loadGoodsList(true);
  },

  onReTry() {
    this.loadGoodsList();
  },

  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ goodsListLoadStatus: 1 });

    try {
      // 当前商品列表是否有数据，有数据就拼接到一起
      const nextList = await fetchGoodsList(this.data.pageIndex, this.storeId);
      this.setData({
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
        goodsListLoadStatus: nextList.length ==0 ? 2 : 0,
        // goodsListLoadStatus:0
      });
      this.data.pageIndex++;
      console.log(nextList)
      
    } catch (err) {
      this.setData({ goodsListLoadStatus: 3 });
    }
  },

  goodListClickHandle(e) {
    const { index } = e.detail;
    const { spuId } = this.data.goodsList[index];
    console.log(spuId)
    wx.navigateTo({
      url: `/pages/goods/pages/details/index?spuId=${spuId}`,
    });
  },

  goodListAddCartHandle() {
    wx.request({
      url: getApp().globalData.server,
      method:"GET",
      success(res){
        console.log(res.data)
      }
    })
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加入购物车',
    });
  },

  navToSearchPage() {
    wx.navigateTo({ url: '/pages/goods/pages/search/index' });
  },

  navToActivityDetail({ detail }) {
    const { index: promotionID = 0 } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },
});
