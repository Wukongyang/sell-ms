<template>
  <el-aside class="aside" width="250px">
    <h5 class="iconfont icon-qiye title">云团后台管理系统</h5>
    <el-menu
      :default-active="path"
      background-color="#409eff"
      text-color="#fff"
      active-text-color="#fff"
      router
      unique-opened
      class="el-menu-vertical-demo"
    >
      <template v-for="(v,k) in navmeans">
        <el-menu-item v-if="!(v.children)" :index="v.index" :key="k">
          <i class="iconfont corlorfff" :class="v.icon"></i>
          <span slot="title" class="font18">{{v.title}}</span>
        </el-menu-item>

        <el-submenu v-else :index="v.index" :key="k">
          <template slot="title">
            <i class="iconfont corlorfff" :class="v.icon"></i>
            <span class="font18">{{v.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(v,k) in v.children"
              :key="k"
              :index="v.index"
              class="font16"
            >{{v.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      path: "",
      navmeans: ""
    };
  },
  methods: {
    setpath() {
      // 设置菜单默认高粱
      if (this.$route.path === "/home/orderdatils") {
        this.path = "/home/redermanage";
      }
      this.path = this.$route.path;
    },
    means() {
      let role =JSON.parse(window.localStorage.getItem("role")) ;
      let means = [
        {
          index: "/home/index",
          icon: "icon-shouye",
          title: "后台首页",
          role: ["super", "general"]
        },
        {
          index: "/home/ordermanage",
          icon: "icon-order",
          title: "订单管理",
          role: ["super", "general"]
        },
        {
          role: ["super", "general"],
          index: "/home/goods",
          icon: "icon-shouye",
          title: "商品管理",
          children: [
            { index: "/home/goodlist", title: "商品列表" },
            { index: "/home/goodadd", title: "添加商品" }
          ]
        },
        {
          index: "/home/shopmanage",
          icon: "icon-dianpu1",
          title: "店铺管理",
          role: ["super", "general"]
        },
        {
          role: ["super"],
          index: "/home/account",
          icon: "icon-zhanghao",
          title: "账号管理",
          children: [
            { index: "/home/accountlist", title: "账号列表" },
            { index: "/home/accountadd", title: "添加账号" },
            { index: "/home/changepwd", title: "修改密码" }
          ]
        },
        {
          role: ["super"],
          index: "/home/statistic",
          icon: "icon-tongji",
          title: "销售统计",
          children: [
            { index: "/home/orderstatistic", title: "订单统计" },
            { index: "/home/goodsstatistic", title: "商品统计" }
          ]
        }
      ];
      this.navmeans = means.filter(v => v.role.includes(role));
    }
  },
  created() {
    this.setpath();
    this.means()
  },
  computed: {}
};
</script>

<style lang="less">
.aside {
  background-color: #409eff;
  border-radius: 5px;
  .title {
    text-align: center;
    line-height: 70px;
    color: #fff;
    background-color: #409eff;
    font-size: 25px;
    font-weight: bold;
  }
  .el-menu {
    .el-menu-item {
      &.is-active {
        background-color: royalblue !important;
        .corlorfff {
          color: #409eff;
        }
      }
    }
    border: none;
    overflow: hidden;
    .el-submenu__icon-arrow {
      color: #fff;
      font-size: 18px;
      font-weight: bold;
    }
    .corlorfff {
      color: #fff;
      font-size: 18px;
      margin-right: 10px;
      font-weight: bold;
    }
    .font18 {
      font-size: 18px;
      font-weight: bold;
    }
    .font16 {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>