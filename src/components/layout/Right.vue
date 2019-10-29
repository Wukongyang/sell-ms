<template>
  <el-container class="right">
    <el-header class="right-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(v,k) in navArr" :key="k" :to="{ path: v.path }">{{v.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="portrait">
        <span>欢迎你,{{acc}}</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar :size="60">
              <img v-if="imgUrl" :src="imgUrlapi+imgUrl" />
            </el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="iconfont icon-account" command="personalcenter">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-plus" command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main class="main">
      <!-- 路由出口 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { accountInfo } from "@/api/account.js";
import getlocal from "@/utils/getlocal.js";

export default {
  data() {
    return {
      navArr: [],
      acc: "小貂蝉", //用户名
      imgUrl: "default.jpg", //图片地址
      imgUrlapi: "http://172.16.11.200:6060/upload/goods/" //图片加载地址
    };
  },
  methods: {
    handleCommand(command) {
      if (command === "personalcenter") {
        this.$router.push("/home/personalcenter");
      } else {
        getlocal.remove("token");
        this.$router.push("/login");
      }
    },
    async getaccountInfo() {//获取用户信息
      let res = await accountInfo();
      this.acc = res.accountInfo.acc;
      this.imgUrl = res.accountInfo.imgUrl;
    },
    getNavArr() {
      //获取meta里的拼接路径
      this.navArr = this.$route.meta.navArr;
    }
  },
  created() {
     this.getNavArr();//刷新页面时调用
    this.getaccountInfo();
    // 接收个人中心组件发送的头像地址
    this.bus.$on("sendImgUrl", msg => {
      this.imgUrl = msg;
    });
  },
  watch: {
    "$route.path"() {//观察路由变化
      this.getNavArr();
    }
  }
};
</script>

<style lang="less">
.right {
  .right-header {
    display: flex;
    justify-content: space-between;
    height: 70px !important;

    .el-breadcrumb {
      line-height: 70px;
    }
    .portrait {
      display: flex;
      align-items: center;
      color: #409eff;
      cursor: pointer;
      .el-avatar {
        margin-left: 20px;
        vertical-align: middle;
      }
    }
  }
  .main {
    background-color: #fcfcfc;
  }
}
</style>