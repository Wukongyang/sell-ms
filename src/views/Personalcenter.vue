<template>
  <el-card class="box-card personal-center">
    <div slot="header" class="clearfix">
      <span class="title">管理员信息</span>
    </div>
   
    <div class="text item">
      <span>管理员ID：{{infoList.id}}</span>
      <el-divider></el-divider>
      <span>账号：{{infoList.acc}}</span>
      <el-divider></el-divider>
      <span>用户组：{{infoList.region}}</span>
      <el-divider></el-divider>
      <span>创建时间：{{infoList.ctime}}</span>
      <el-divider></el-divider>
      <div class="demo-fit">
        <div class="block">
          <span style="float:left">管理员头像：</span>
          <el-upload
            :disabled="flag"
            class="avatar-uploader"
            :action="dialogImageUrl"
            :show-file-list="false"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="infoList.imgUrl"
              width="100%"
              height="100%"
              :src="imgUrlapi+infoList.imgUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button type="primary" v-if="flag" @click="flag=!flag">修改头像</el-button>
          <el-button type="success" v-else @click="upload">确认上传</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { accountInfo, accAvatar } from "@/api/account.js";
import moment from "moment";
export default {
  data() {
    return {
      infoList: {
        id: "",
        acc: "",
        region: "",
        ctime: "",
        imgUrl: "default.jpg"
      },
      dialogImageUrl: "http://172.16.11.200:6060/goods/upload", //图片上传到的地址
      imgUrlapi: "http://172.16.11.200:6060/upload/goods/", //图片加载地址
      flag: true
    };
  },
  methods: {
    //获取账号信息
    async getaccountInfo() {
      let res = await accountInfo();
      // 格式化时间
      res.accountInfo.ctime = moment(res.accountInfo.ctime).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      this.infoList = res.accountInfo;
    },
    //图片上传
    handleAvatarSuccess(res, file) {
      let { code, imgUrl } = res;
      if (code === 0) {
        this.infoList.imgUrl = imgUrl;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async upload() {
      let { code } = await accAvatar({ imgUrl: this.infoList.imgUrl });//发送上传ajax
      if (code === 0) {
        this.flag = !this.flag;//切换按钮
        this.bus.$emit("sendImgUrl",this.infoList.imgUrl)//操作成功，将图片地址发给头部头像组件，改变头像
      }
    }
  },
  created() {
    this.getaccountInfo();
  }
};
</script>

<style lang="less">
.personal-center {
  .title {
    font-size: 25px;
    font-weight: bold;
    line-height: 60px;
  }
  .el-upload {
    margin-bottom: 20px;
  }
}
</style>