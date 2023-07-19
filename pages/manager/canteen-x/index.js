import * as echarts from '../ec-canvas/echarts';
import Toast from 'tdesign-miniprogram/toast/index';
// import canteen from 'custom-tab-bar/canteen';
Page({
  data: {
    imageSrc: 'https://tdesign.gtimg.com/miniprogram/images/image1.jpeg',
    canteenList:[{
      poName:'一号档口',
      imageSrc:'https://img.zcool.cn/community/0126915e7342bea80120a895d50b95.png@2o.png',
      canName:'番茄小鸡店',
      detail:'是一家做番茄炖鸡的店',
      userName:'王琪琪',
      phoneNum:'18040120603'
    },{
      poName:'二号档口',
      imageSrc:'https://img.zcool.cn/community/01d8c656c091216ac7256cb025bf19.jpg@1280w_1l_2o_100sh.jpg',
      canName:'笨八戒木桶饭',
      detail:'是一家做盒饭的店',
      userName:'李琪琪',
      phoneNum:'18040120603'
    },{
      poName:'三号档口',
      imageSrc:'https://tdesign.gtimg.com/miniprogram/images/image1.jpeg',
      canName:'黄焖鸡米饭',
      detail:'是一家做黄焖鸡的店',
      userName:'李琪静',
      phoneNum:'18040120603'
    },{
      poName:'四号档口',
      imageSrc:'https://img.zcool.cn/community/012c475e524d4da801216518089919.jpg@3000w_1l_0o_100sh.jpg',
      canName:'米嫂余味面',
      detail:'是一家做面条的店',
      userName:'高晶',
      phoneNum:'18040120603'
    },{
      poName:'五号档口',
      imageSrc:'https://img.zcool.cn/community/01d9ba582a75cca84a0d304fb1c852.jpg@3000w_1l_2o_100sh.jpg',
      canName:'有家鸡店',
      detail:'是一家做炸鸡汉堡的店',
      userName:'高琪琪',
      phoneNum:'18040120603'
    },]
  },
  showSuccessToast(res) {
    console.log(res.currentTarget.dataset.index)
    const list = this.data.canteenList
    list[res.currentTarget.dataset.index].canName = '烤肉店'
    this.setData({
      canteenList:list
    })
    Toast({
      context: this,
      selector: '#t-toast',
      message: '修改成功',
      theme: 'success',
      direction: 'column',
    });
  },

  showWarningToast(res) {
    const list = this.data.canteenList
    list[res.currentTarget.dataset.index].imageSrc = ''
    list[res.currentTarget.dataset.index].canName = ''
    list[res.currentTarget.dataset.index].detail = ''
    list[res.currentTarget.dataset.index].userName = ''
    list[res.currentTarget.dataset.index].phoneNum = ''
    this.setData({
      canteenList:list
    })
    Toast({
      context: this,
      selector: '#t-toast',
      message: '删除成功',
      theme: 'warning',
      direction: 'column',
    });
  },

  onShow() {
    var tabbar = this.selectComponent("#tabbar")
    // 父组件里面执行子组件的方法
    tabbar.initManagement();
  },

  onLoad() {
    this.init();
  },


  onPullDownRefresh:function() {
    this.init();
  },

  init() {
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
// 热力图方法
function getBarOption() {
  return {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['历史平均销量', '今日销量', '差值']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['鱼香肉丝', '宫保鸡丁', '小酥肉拌饭', '辣子鸡', '北京烤鸭', '麻婆豆腐', '饸饹面'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '历史平均销量',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310]
      },
      {
        name: '今日销量',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220]
      },
      {
        name: '差值',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110]
      }
    ]
  };
}

function getScatterOption() {

  var data = [];
  var data2 = [];
  var list = ['11:00', '12:00', '13:00', '16:00', '17:00', '18:00', '19:00','20:00'];
  for (var i = 0; i < 10; i++) {
    data.push(
      [
        list[i],
        Math.round(Math.random() * 100),
      ]
    );
    data2.push(
      [
        list[i],
        Math.round(Math.random() * 100),
      ]
    );
  }

  var axisCommon = {
    axisLabel: {
      textStyle: {
        color: '#C8C8C8'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#C8C8C8'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#C8C8C8',
        type: 'solid'
      }
    },
    data: ['11:00', '12:00', '13:00', '16:00', '17:00', '18:00', '19:00','20:00']
  };
  var axisCommon1 = {
    axisLabel: {
      textStyle: {
        color: '#C8C8C8'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#C8C8C8'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#C8C8C8',
        type: 'solid'
      }
    },
  };

  return {
    color: ["#FF7070", "#60B6E3"],
    backgroundColor: '#eee',
    xAxis: axisCommon,
    yAxis: axisCommon1,
    legend: {
      data: ['本店客流量', '平均客流量']
    },
    visualMap: {
      show: false,
      max: 100,
      inRange: {
        symbolSize: [20, 70]
      }
    },
    series: [{
      type: 'scatter',
      name: '本店客流量',
      data: data
    },
    {
      name: '平均客流量',
      type: 'scatter',
      data: data2
    }
    ],
    animationDelay: function (idx) {
      return idx * 50;
    },
    animationEasing: 'elasticOut'
  };
}

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  const model = {
    yCates: ['周一', '周二', '周三',
      '周四', '周五', '周六',
      '周日'],
    xCates: ['12:00', '13:00', '17:00', '18:00', '19:00'],
    data: [
      // [yCateIndex, xCateIndex, value]
      [0, 0, 5], [0, 1, 7], [0, 2, 3], [0, 3, 5], [0, 4, 2],
      [1, 0, 1], [1, 1, 2], [1, 2, 4], [1, 3, 8], [1, 4, 2],
      [2, 0, 2], [2, 1, 3], [2, 2, 8], [2, 3, 6], [2, 4, 7],
      [3, 0, 3], [3, 1, 7], [3, 2, 5], [3, 3, 1], [3, 4, 6],
      [4, 0, 3], [4, 1, 2], [4, 2, 7], [4, 3, 8], [4, 4, 9],
      [5, 0, 2], [5, 1, 2], [5, 2, 3], [5, 3, 4], [5, 4, 7],
      [6, 0, 6], [6, 1, 5], [6, 2, 3], [6, 3, 1], [6, 4, 2]
    ]
  };

  const data = model.data.map(function (item) {
    return [item[1], item[0], item[2] || '-'];
  });

  const option = {
    tooltip: {
      position: 'top'
    },
    animation: false,
    grid: {
      bottom: 60,
      top: 10,
      left: 80
    },
    xAxis: {
      type: 'category',
      data: model.xCates
    },
    yAxis: {
      type: 'category',
      data: model.yCates
    },
    visualMap: {
      min: 1,
      max: 10,
      show: false,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 10,
      inRange: {
        color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
      }
    },
    series: [{
      name: 'Punch Card',
      type: 'heatmap',
      data: data,
      label: {
        normal: {
          show: true
        }
      },
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  chart.setOption(option);
  return chart;
}
