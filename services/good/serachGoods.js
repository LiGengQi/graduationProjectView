import { config } from '../../config/index';
const imgPrefix = config;
const defaultDesc = [`${imgPrefix}/goods/details-1.png`];
let goods = [];
export function genGood(keywords) {
  wx.request({
    url: getApp().globalData.server + '/searchDishList',
    data:{
      dishKey: keywords,
    },
    success(res){
      goods = res.data;
    },
    fail(res){
      console.log(res.errMsg)
    },complete(res){
      console.log(res)
    }
  })
  // if(ID != -1){
  //   const item = goods[0];
  //   return {
  //     ...item,
  //     spuId: 1,
  //     available: 0,
  //     desc: item?.desc || defaultDesc,
  //     images: item?.images || [item?.primaryImage],
  //   };
  // }
  return goods;
}
/** 获取商品列表 */
function mockFetchGoodsList(keywords) {
  const { delay } = require('../_utils/delay');
  genGood(keywords)
  console.log(keywords)
  return delay().then(() =>
  genGood(keywords).map((item) => {
      return {
        spuId: item.dishNo,
        thumb: item.primaryImage,
        dishName: item.dishName,
        price: item.price,
      };
    }),
  );
}

/** 获取商品列表 */
export function fetchGoodsList(keywords = '饭') {
  
  if (config.useMock) {
    return mockFetchGoodsList(keywords);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
