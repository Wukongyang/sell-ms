
/* 
*商品管理接口
*/

// 引入模块
import req from '@/utils/request'

// 增加商品
export const addGoods = params => req.post('/goods/goodsadd', params)
// 获取商品列表
export const goodsList = params => req.get('/goods/goodslist', params)
// 删除商品
export const goodsDel = params => req.get('/goods/goodsdel', params)

// 修改商品
export const goodsEdit = params => req.post('/goods/goodsedit', params)

