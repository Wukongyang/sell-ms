/* 
*  店铺管理接口
*/

// 引入模块
import req from '@/utils/request'
// 获取店铺信息
export const getshopInfo = params => req.get('/shop/shopinfo', params)
//保存修改
export const shopEdit = params => req.post('/shop/shopedit', params)


