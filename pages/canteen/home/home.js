import { fetchHome } from '../../../services/home/home';
import * as echarts from '../ec-canvas/echarts';
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '',
      left: 'center'
    },
    color: ["#37A2DA"],
    // legend: {
    //   data: ['A'],
    //   top: 50,
    //   left: 'center',
    //   backgroundColor: 'red',
    //   z: 100
    // },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['7:00', '8:00', '11:00', '12:00', '17:00', '18:00', '19:00'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: [18, 36, 30, 80, 70, 59, 30]
    }, ]
  };

  chart.setOption(option);
  return chart;
}
function initPChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['40%', '60%'],
      data: [{
        value: 55,
        name: '烤鸭捞饭'
      }, {
        value: 20,
        name: '飘香酱骨头'
      }, {
        value: 10,
        name: '蒜蓉烤扇贝'
      }, {
        value: 20,
        name: '牛杂盖饭'
      }, {
        value: 38,
        name: '小鸡炖蘑菇'
      }]
    }]
  };

  chart.setOption(option);
  return chart;
}
Page({
  data: {
    imgSrcs: [],
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: { type: 'dots' },
    swiperImageProps: { mode: 'scaleToFill' },
    //热力图数据
    ec: {
      onInit: initChart
    },
    ecP: {
      onInit: initPChart
    },
    
  },

  goodListPagination: {
    index: 0,
    num: 10,
  },

  privateData: {
    tabIndex: 0,
  },
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  onShow() {
    var tabbar = this.selectComponent("#tabbar")
    // 父组件里面执行子组件的方法
    tabbar.initCanteen();
  },

  onLoad() {
    this.init();
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
        imgSrcs: swiper,
        pageLoading: false,
      });
    });
  },
 

  onReTry() {
  },
  
  

 
   



  navToActivityDetail({ detail }) {
    const { index: promotionID = 0 } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },
});

