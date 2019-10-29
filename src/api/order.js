/* 
*  商品管理接口
*/

// 引入模块
import req from '@/utils/request'

//获取订单列表
export const orderList = params => req.get('/order/orderlist', params)
export const orderDetail = params => req.get('/order/orderdetail', params)
export const orderEdit = params => req.post('/order/orderedit', params)
//首页报表
export const indexEc = params => req.get('/order/indexcharts', params)
// 订单统计报表
export const orderEc = params => req.get('/order/ordertotal', params)



