<template>
  <div class="login">
    <div class="login-bg"></div>
    <div class="login-box">
      <p class="title">欢迎登录</p>
      <p class="title marb">云团后台管理系统</p>

      <el-form
        status-icon
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item prop="acc">
          <el-input type="text" v-model="ruleForm.acc" autocomplete="off">
            <i slot="prefix" class="iconfont icon-account boxIcon"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input :type="isOpen?'text':'password'" v-model="ruleForm.pwd" autocomplete="off"  @keyup.enter.native="submit">
            <i slot="prefix" class="iconfont icon-mima boxIcon"></i>
            <i
              slot="suffix"
              :class="isOpen?'iconfont icon-yanjing pwdClose':'iconfont icon-yanjing1 pwdClose'"
              @click="changeOpen"
            ></i>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="iconfont icon-tijiao btnIcon" @click="loginBtn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入模块
import { accReg, pwdReg } from "@/utils/reg";
import { checkLogin } from "@/api/account";
import getlocal from "@/utils/getlocal.js"; //引入模块
export default {
  data() {
    var validateAcc = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账户不能为空"));
      } else if (!rule.parnent.test(value)) {
        return callback(new Error("中文或英文"));
      } else {
        callback();
      }
    };
    var validatePwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else if (!rule.parnent.test(value)) {
        return callback(new Error("6~20位字母和数字"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        acc: "",
        pwd: ""
      },
      rules: {
        acc: [{ validator: validateAcc, parnent: accReg, trigger: "blur" }],
        pwd: [{ validator: validatePwd, parnent: pwdReg, trigger: "blur" }]
      },
      isOpen: false
    };
  },
  methods: {
    loginBtn() {
      // 提交按钮固定用法
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          let { code, token,role } = await checkLogin(this.ruleForm);

          if (code === 0) {
            getlocal.set("token", token);
           
            getlocal.set("role", role);
            // localStorage.setItem("token",token)
            this.$router.push("/home/index");
          }
          // 前端验证成功执行
          // this.ruleForm.acc="";
          // this.ruleForm.pwd=""
        } else {
          // 前端验证失败执行
          this.$message({
            center: true,
            message: "请检查参数",
            type: "danger"
          });
        }
      });
    },
    submit(){
      this.loginBtn()
    },
    changeOpen() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="less" >
.login {
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-bg {
    height: 100%;
    width: 100%;
    background: url(../assets/imgs/bg-Login.jpeg);
    filter: blur(5px);
    z-index: -1;
    background-size: cover;
  }
  .login-box {
    position: absolute;
    .title {
      color: #fff;
      font-size: 40px;
      text-align: center;
      margin-bottom: 20px;
      font-weight: bold;
    }
    .marb {
      margin-bottom: 60px;
    }
    .el-input__icon {
      font-size: 20px;
    }
    .el-button {
      width: 100%;
      font-size: 25px;
    }
    .el-form {
      text-align: center;
    }
    .el-form-item__content {
      .boxIcon {
        color: #409eff;
      }
      .btnIcon {
        margin-right: 10px;
      }
      .pwdClose {
        font-size: 30px;
        color: #409eff;
      }
      margin-left: 0px !important;
      width: 350px;
      text-align: center;
    }
  }
}
</style>