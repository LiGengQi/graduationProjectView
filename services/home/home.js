import { config, cdnBase } from '../../config/index';

/** 获取首页数据 */
function mockFetchHome() {
  const { delay } = require('../_utils/delay');
  const { genSwiperImageList } = require('../../model/swiper');
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      tabList: [
        {
          text: '精选推荐',
          key: 0,
        },
        {
          text: '一食堂',
          key: 1,
        },
        {
          text: '二食堂',
          key: 2,
        },
        {
          text: '三食堂',
          key: 3,
        },
        {
          text: '四食堂',
          key: 4,
        },
        {
          text: '美食城',
          key: 5,
        },
        {
          text: '手机也疯狂',
          key: 6,
        },
      ],
      activityImg: `${cdnBase}/activity/banner.png`,
    };
  });
}
function myFetchHome() {
  const { delay } = require('../_utils/delay');
  const { genSwiperImageList } = require('../../model/swiper');
  const { getCateenList } = require('../_utils/implement')
  console.log(getCateenList())
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      tabList: getCateenList(),
      activityImg: `${cdnBase}/activity/banner.png`,
    };
  });
}
/** 获取首页数据 */
export function fetchHome() {
  if (config.useMock) {
    // return mockFetchHome();
    return myFetchHome();
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
