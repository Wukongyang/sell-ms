<template>
  <el-card class="box-card change-pwd">
    <div class="title">修改密码</div>
    <hr />
    <el-form
      :model="ruleForm"
      :rules="rules"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码" prop="originalPwd">
        <el-input
          :type="isOpen?'text':'password'"
          v-model="ruleForm.originalPwd"
          autocomplete="off"
        >
          <i
            slot="suffix"
            :class="isOpen?'iconfont icon-yanjing pwdClose':'iconfont icon-yanjing1 pwdClose'"
            @click="changeOpen"
          ></i>
        </el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input :type="isOpen?'text':'password'" v-model="ruleForm.newPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmNewPwd">
        <el-input
          :type="isOpen?'text':'password'"
          v-model="ruleForm.confirmNewPwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitBtn" class="iconfont icon-tijiao1">提交</el-button>
        <el-button @click="resetBtn" class="iconfont icon-zhongzhi">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// 引入接口模板
import { changePwd, checkoldpwd } from "@/api/account.js";
import { pwdReg } from "../../utils/reg";
import getlocal from "@/utils/getlocal.js"; //引入模块
import { async } from "q";
export default {
  data() {
    const validateOldPwd = async (rule, value, callback) => {
      let { code } = await checkoldpwd({ oldPwd: this.ruleForm.originalPwd });
      if (code === "11") {
        return callback(new Error("原密码错误"));
      } else if (!value) {
        return callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    const validatePwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else if (!rule.parnent.test(value)) {
        return callback(new Error("6~20位字母和数字"));
      } else {
        if (this.ruleForm.confirmNewPwd !== "") {
          this.$refs.ruleForm.validateField("confirmNewPwd");
        } 
          callback();
        
      }
    };
    const validateSame = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("确认密码不能为空"));
      } else if (!(value === this.ruleForm.newPwd)) {
        return callback(new Error("两次输入的新密码必须相同"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        originalPwd: "",
        newPwd: "",
        confirmNewPwd: ""
      },
      rules: {
        originalPwd: [{ validator: validateOldPwd, trigger: "blur" }],
        newPwd: [{ validator: validatePwd, parnent: pwdReg, trigger: "blur" }],
        confirmNewPwd: [{ validator: validateSame, trigger: "blur" }]
      },
      isOpen: false
    };
  },
  methods: {
    //改变密码框type
    changeOpen() {
      this.isOpen = !this.isOpen;
    },
    submitBtn() {
      // 提交按钮固定用法
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          let { newPwd } = this.ruleForm;
          let { code } = await changePwd({ newPwd });
          // 前端验证成功执行
          if (code === 0) {
            getlocal.remove("token"); //清除token
            this.$router.push("/login"); //跳转登录页面
          }
        } else {
          // 前端验证失败执行
          this.$message({
            center: true,
            message: "修改密码失败"
          });
        }
      });
    },
    resetBtn() {
      this.ruleForm.originalPwd = "";
      this.ruleForm.newPwd = "";
      this.ruleForm.confirmNewPwd = "";
    }
  }
};
</script>

<style lang="less" >
.change-pwd {
  .title {
    font-size: 25px;
    font-weight: bold;
    line-height: 60px;
  }
  .el-form {
    width: 400px;
    .pwdClose {
      color: #409eff;
      font-size: 16px;
    }
    .icon-tijiao1 {
      &:before {
        color: #fff;
        margin-right: 8px;
      }
    }
  }
}
</style>