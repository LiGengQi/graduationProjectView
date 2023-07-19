/**
 *  * @param {number} spuId
 * @param {number} pageNum
 * @param {number} pageSize
 * @param {number} commentsLevel
 * @param {boolean} hasImage
 */
let commentList = [];
export function getGoodsAllComments(params) {

 wx.request({
   url: getApp().globalData.server + '/getDishCommentList',
   data:{
    dishNo: '1',
    pageSize: 5,
    pageIndex: 1
   },
   success(res){
     console.log(res.data)
     commentList = res.data
   },
   fail(res){
     console.log(res.errMsg);
   }
 })
 return commentList;
}

export function getGoodsCommentsCount() {
  return {
    commentCount: '47',
    badCount: '0',
    middleCount: '2',
    goodCount: '45',
    hasImageCount: '1',
    goodRate: 95.7,
    uidCount: '0',
  };
}
