import Vue from 'vue'
import VueRouter from 'vue-router'


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/home",
    redirect: "/home/index",//重定向首页
    component: () => import("../views/Home.vue"),
    children: [
      // 首页
      {
        meta: {
          navArr: [
            { path: "/home/index", title: "首页" },
            { path: "/home/index", title: "后台首页" },
          ]
        },
        path: "index",
        component: () => import("../views/Index.vue")
      },
      {
        meta: {
          navArr: [
            { path: "/home/index", title: "首页" },
            { path: "/home/personalcenter", title: "个人中心" },
          ]
        },
        path: "personalcenter",
        component: () => import("../views/Personalcenter.vue")
      },
      // 订单管理
      {
        meta: {
          navArr: [
            { path: "/home/index", title: "首页" },
            { path: "/home/ordermanage", title: "订单管理" },
          ]
        },
        path: "ordermanage",
        component: () => import("../views/Order/OrderManage.vue")
      },
      {
        meta: {
          navArr: [
            { path: "/home/index", title: "首页" },
            { path: "/home/ordermanage", title: "订单管理" },
            { path: "/home/orderdatils", title: "订单详情" },
          ]
        },
        path: "orderdatils",
        component: () => import("../views/Order/orderEditanddatils.vue")
      },

      //店铺管理
      {
        meta: {
          navArr: [
            { path: "/home/index", title: "首页" },
            { path: "/home/shopmanage", title: "店铺管理" },
          ]
        },
        path: "shopmanage",
        component: () => import("../views/ShopManage")
      },
      //商品管理
      {
        meta: {
          navArr: [
            { path: "/home/index", title: "首页" },
            { path: "/home/goodlist", title: "商品管理" },
            { path: "/home/goodlist", title: "商品列表" },
          ]
        },
        path: "goodlist",
        component: () => import("../views/GoodsManage/GoodsList.vue")
      },
      {
        meta: {
          navArr: [
            { path: "/home/index", title: "首页" },
            { path: "/home/goodlist", title: "商品管理" },
            { path: "/home/goodadd", title: "商品添加" },
          ]
        },
        path: "goodadd",
        component: () => import("../views/GoodsManage/GoodsAdd.vue")
      },
      {
        meta: {
          navArr: [
            { path: "/home/index", title: "首页" },
            { path: "/home/goodlist", title: "商品管理" },
            { path: "/home/goodedit", title: "商品编辑" },
          ]
        },
        path: "goodedit",
        component: () => import("../views/GoodsManage/GoodsEdit.vue")
      },
      // 账号管理
      {
        meta: {
          navArr: [
            { path: "/home/index", title: "首页" },
            { path: "/home/accountlist", title: "账号管理" },
            { path: "/home/accountadd", title: "添加账号" },
          ]
        },
        path: "accountadd",
        component: () => import("../views/AccountManage/AccountAdd.vue")
      },
      {
        meta: {
          navArr: [
            { path: "/home/index", title: "首页" },
            { path: "/home/accountlist", title: "账号管理" },
            { path: "/home/accountlist", title: "账号列表" },
          ]
        },
        path: "accountlist",
        component: () => import("../views/AccountManage/AccountList.vue")
      },
      {
        meta: {
          navArr: [
            { path: "/home/index", title: "首页" },
            { path: "/home/accountlist", title: "账号管理" },
            { path: "/home/changepwd", title: "修改密码" },
          ]
        },
        path: "changepwd",
        component: () => import("../views/AccountManage/ChangePwd.vue")
      },
      //销售统计
      {
        meta: {
          navArr: [
            { path: "/home/index", title: "首页" },
            { path: "/home/orderstatistic", title: "销售统计" },
            { path: "/home/goodsstatistic", title: "商品统计" },
          ]
        },
        path: "goodsstatistic",
        component: () => import("../views/SaleStatistic/GoodsStatistic.vue")
      },
      {
        meta: {
          navArr: [
            { path: "/home/index", title: "首页" },
            { path: "/home/orderstatistic", title: "销售统计" },
            { path: "/home/orderstatistic", title: "订单统计" },
          ]
        },
        path: "orderstatistic",
        component: () => import("../views/SaleStatistic/OrderStatistic.vue")
      },
    ]
  }

]

const router = new VueRouter({

  routes
})

export default router
