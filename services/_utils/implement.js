var mydata;
export function getCateenList() {
  wx.request({
    url: getApp().globalData.server + '/getCanteenList',
    success(res){
      mydata = res.data
    },
    fail(res){
      console.log(res.errMsg);
    }
  })
  return mydata;
}

