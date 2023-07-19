import { genGood } from './good';

export function getGoodsList(pageIndex = 1, storeId = 0) {
  return genGood(pageIndex,storeId);
}

export const goodsList = getGoodsList();
