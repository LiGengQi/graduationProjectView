import { config } from '../../config/index';
import { cdnBase } from '../../config/index';

let goods = [];
let item1 = {};
const imgPrefix = cdnBase;
const defaultDesc = [`${imgPrefix}/goods/details-1.png`];
function requestGoods(pageIndex, storeId = 0,ID = -1){
  wx.request({
    url: getApp().globalData.server + '/getDishList1',
    data:{
      pageIndex: pageIndex,
      storeId: storeId,
      dishNo: ID
    },
    success(res){
      goods = res.data;
    },
    fail(res){
      console.log(res.errMsg)
    }
  })
  console.log(goods)
  return genGood(goods)
}
function genGood(items) {
  item1 = items;
    const item = items[0];
    return {
      ...item,
      spuId: 1,
      available: 0,
      desc: item?.desc || defaultDesc,
      images: item?.images || [item?.primaryImage],
  }
}
/** 获取商品列表 */
function mockFetchGood(pageIndex,storeId,ID = 0) {
  requestGoods(pageIndex,storeId,ID)
  const { delay } = require('../_utils/delay');
  return delay().then(() => requestGoods(pageIndex,storeId,ID));
}

/** 获取商品列表 */
export function fetchGood(pageIndex,storeId,ID = 0) {
  if (config.useMock) {
    return mockFetchGood(pageIndex,storeId,ID);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
