/* 
*  账号管理接口
*/

// 引入模块
import req from '@/utils/request'

// 添加账号，地址为接口地址
//添加账户
export const addAccount = params => req.post('/account/accountadd', params)
export const repeatAcc = params => req.post('/account/repeat', params)
// 获取列表
export const listAccount = params => req.get('/account/accountlist', params)
// 单个删除
export const singleDelete = params => req.get('/account/singledelete', params)
// 批量删除
export const batchDelete = params => req.get('/account/batchdelete', params)
//编辑
export const accountEdit = params => req.post('/account/accountedit', params)
//修改密码
export const changePwd = params => req.post('/account/passwordedit', params)
// 登录
export const checkLogin = params => req.post('/account/checklogin', params)
//确认旧密码
export const checkoldpwd = params => req.get('/account/checkoldpwd', params)
// 获取个人信息
export const accountInfo = params => req.get('/account/accountinfo', params)
// 上传头像

export const accAvatar = params => req.get('/account/avataredit', params)

