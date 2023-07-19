import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchGoodsList(pageIndex = 1, storeId = 0) {
  const { delay } = require('../_utils/delay');
  const { getGoodsList } = require('../../model/goods');
  getGoodsList(pageIndex, storeId)
  return delay().then(() =>
    getGoodsList(pageIndex, storeId).map((item) => {
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
export function fetchGoodsList(pageIndex = 1, storeId = 0) {
  if (config.useMock) {
    return mockFetchGoodsList(pageIndex, storeId);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
