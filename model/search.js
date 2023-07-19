import { getGoodsList } from './goods';

/**
 * @param {number} sort
 * @param {number} pageNum
 * @param {number} pageSize
 * @param {number} minPrice
 * @param {number} maxPrice
 * @param {string} keyword
 */

export function getSearchHistory() {
  return {
    historyWords: [
      '鸡',
      '沙拉',
      '蘑菇',
      '牛肉拌饭',
      '小锅饭',
      '牛肉拌饭',
      '最好吃的饭包',
    ],
  };
}

export function getSearchPopular() {
  return {
    popularWords: [
      '鸡',
      '沙拉',
      '蘑菇',
      '牛肉拌饭',
      '小锅饭',
      '牛肉拌饭',
      '最好吃的饭包',
    ],
  };
}

export function getSearchResult() {
  return {
    saasId: null,
    storeId: null,
    pageNum: 1,
    pageSize: 30,
    totalCount: 1,
    spuList: getGoodsList(7),
    algId: 0,
  };
}
