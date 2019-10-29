<template>
  <el-card class="box-card account-add">
    <p class="title">增加账户</p>
    <hr />
    <el-form
      status-icon
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item prop="acc" label="账户">
        <el-input type="text" v-model="ruleForm.acc" autocomplete="off">
          <i slot="prefix" class="iconfont icon-account boxIcon"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd" label="密码">
        <el-input :type="isOpen?'text':'password'" v-model="ruleForm.pwd" autocomplete="off">
          <i slot="prefix" class="iconfont icon-mima boxIcon"></i>
          <i
            slot="suffix"
            :class="isOpen?'iconfont icon-yanjing pwdClose':'iconfont icon-yanjing1 pwdClose'"
            @click="changeOpen"
          ></i>
        </el-input>
      </el-form-item>
      <el-form-item label="用户组" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择所属用户组">
          <el-option label="高级管理员" value="高级管理员"></el-option>
          <el-option label="普通管理员" value="普通管理员"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="iconfont icon-tijiao btnIcon" @click="loginBtn">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// 引入模块
import { accReg, pwdReg } from "../../utils/reg";
import { addAccount, repeatAcc } from "@/api/account.js";
import { async } from "q";
export default {
  data() {
    const validateAcc = async (rule, value, callback) => {
      let { code } = await repeatAcc({acc:value});
      if (code === "00") {
        return callback(new Error("该账户已存在"));
      } else if (!value) {
        return callback(new Error("账户不能为空"));
      } else if (!rule.parnent.test(value)) {
        return callback(new Error("中文或者英文"));
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
        callback();
      }
    };
    return {
      ruleForm: {
        acc: "",
        pwd: "",
        region: ""
      },
      rules: {
        acc: [
          {
            required: true,
            validator: validateAcc,
            parnent: accReg,
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            validator: validatePwd,
            parnent: pwdReg,
            trigger: "blur"
          }
        ],
        region: [{ required: true, message: "请选择用户组", trigger: "change" }]
      },
      isOpen: false
    };
  },
  methods: {
    loginBtn() {
      // 提交按钮固定用法
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          let res = await addAccount(this.ruleForm);
          if (res.code === 0) {
            // 前端验证成功执行
            this.ruleForm.acc = "";
            this.ruleForm.pwd = "";
            this.$router.push("/home/accountlist");
          }
        } else {
          // 前端验证失败执行
          this.$message({
            center: true,
            message: h("p", { style: { color: "red", fontSize: "18px" } }, [
              h("span", null, "请检查输入的字符！！！ ")
            ])
          });
        }
      });
    },
    changeOpen() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="less" >
.account-add {
  .title {
    font-size: 25px;
    font-weight: bold;
    line-height: 60px;
  }
  .el-form {
    width: 400px;
    .el-select {
      width: 250px;
    }
    .icon-tijiao {
      &:before {
        color: #fff;
        margin-right: 8px;
      }
    }
  }
}
</style>