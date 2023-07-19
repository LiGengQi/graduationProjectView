// 商品详情页面按钮
// 路线规划
import Toast from 'tdesign-miniprogram/toast/index';
Component({
  externalClasses: ['wr-sold-out', 'wr-class'],

  options: { multipleSlots: true },

  properties: {
    soldout: {
      // 商品是否下架
      type: Boolean,
      value: false,
    },
    jumpArray: {
      type: Array,
      value: [],
    },
    isStock: {
      type: Boolean,
      value: true,
    }, // 是否有库存
    isSlotButton: {
      type: Boolean,
      value: false,
    }, // 是否开启按钮插槽
    shopCartNum: {
      type: Number, // 购物车气泡数量
    },
    buttonType: {
      type: Number,
      value: 0,
    },
    minDiscountPrice: {
      type: String,
      value: '',
    },
    minSalePrice: {
      type: String,
      value: '',
    },
    dishImage: {
      type: String,
      value: '',
    },
    dishTitle: {
      type: String,
      value: '',
    },
    dishNo: {
      type: String,
      value: '',
    },
  },

  data: {
    fillPrice: false,
  },

  methods: {
    toAddCart() {
      // const { isStock } = this.properties;
      // if (!isStock) return;
      // this.triggerEvent('toAddCart');
      const that = this
      wx.navigateTo({
        url: '../../pages/comments/create/index?imageUrl=' + that.properties.dishImage 
              + '&dishNo=' + that.properties.dishNo + '&title=' + that.properties.dishTitle,
        complete(res){
          console.log(res)
        }
      });
    },
// 38.783786320892 121.1522403221911  
    toBuyNow(e) {
      // Toast({
      //   context: this,
      //   selector: '#t-toast',
      //   message: '当前菜品无法制作',
      // });
      const latitude = 38.783786320892
      const longitude = 121.1522403221911
      wx.openLocation({
        latitude,
        longitude,
        scale: 18
      })
      const { isStock } = this.properties;
      if (!isStock) return;
      this.triggerEvent('toBuyNow', e);
    },

    toNav(e) {
      const { url } = e.currentTarget.dataset;
      return this.triggerEvent('toNav', {
        e,
        url,
      });
    },
  },
});
