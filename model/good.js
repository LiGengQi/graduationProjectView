import { cdnBase } from '../config/index';
const imgPrefix = cdnBase;
var goodsList;
const defaultDesc = [`${imgPrefix}/goods/details-1.png`];

/**
 * @param {string} id
 * @param {number} [available] 库存, 默认1
 */
let goods = [];
export function genGood(pageIndex, storeId = 0,ID = -1) {
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
  if(ID != -1){
    const item = goods[0];
    return {
      ...item,
      spuId: 1,
      available: 0,
      desc: item?.desc || defaultDesc,
      images: item?.images || [item?.primaryImage],
    };
  }
  return goods;
}

function getDishes() {
  wx.request({
    url: getApp().globalData.server + '/getDishList',
    success(res){
      console.log(res)
      goodsList = res.data;
      console.log(goodsList)
    },
    fail(res){
      console.log(res.errMsg)
    }
  })
  console.log(goodsList)
  return goodsList;
}
