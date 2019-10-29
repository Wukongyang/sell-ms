<template>
  <el-card class="box-card order-manage">
    <div class="title">订单详情与修改</div>
     <el-button v-if="isEdit" @click="isedit" type="primary" size="middle">编辑</el-button>
     <el-button v-else @click="submitForm" type="success" size="middle">保存</el-button>
    <hr />

    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="订单号:">
          <span  v-if="isEdit">{{form.orderNo}}</span>
          <el-input v-else v-model="form.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="下单时间:">
          <span v-if="isEdit">
            {{form.orderTime}}
          </span>
          <el-date-picker v-else v-model="form.orderTime" type="datetime" placeholder="送达时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="联系方式:">
          <span v-if="isEdit">{{form.phone}}</span>
          <el-input v-else v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="收货人:">
          <span v-if="isEdit">{{form.consignee}}</span>
          <el-input v-else v-model="form.consignee"></el-input>
        </el-form-item>
        <el-form-item label="收货地址:">
          <span v-if="isEdit">{{form.deliverAddress}}</span>
          <el-input v-else v-model="form.deliverAddress"></el-input>
        </el-form-item>
        <el-form-item label="送达时间:">
          <span v-if="isEdit">
           {{form.deliveryTime}}
          </span>
           <el-date-picker v-else v-model="form.deliveryTime" type="datetime" placeholder="送达时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注:">
          <span v-if="isEdit">{{form.remarks}}</span>
          <el-input v-else v-model="form.remarks"></el-input>
        </el-form-item>
        <el-form-item label="订单金额:">
          <span v-if="isEdit">{{form.orderAmount}}</span>
          <el-input v-else v-model="form.orderAmount"></el-input>
        </el-form-item>
        <el-form-item label="订单状态:">
          <span v-if="isEdit">{{form.orderState}}</span>
          <el-select v-else  v-model="form.orderState" :placeholder="form.orderState">
            <el-option label="未处理" value="未处理"></el-option>
            <el-option label="已处理" value="已处理"></el-option>
          </el-select>
        </el-form-item>
      
      </el-form>
    </div>
  </el-card>
</template>

<script>
// 引入获取本地存储的模块
import getlocal from "@/utils/getlocal.js";
import { orderDetail, orderEdit } from "@/api/order.js";
import moment from "moment";
export default {
  data() {
    return {
      form: {
        orderNo: "",
        orderTime: "",
        phone: "",
        consignee: "",
        deliverAddress: "",
        deliveryTime: "",
        remarks: "",
        orderAmount: "",
        orderState: "已受理",
        id: 1
      },
      isEdit:true
    };
  },
  methods: {
    async getlist() {
      let id = getlocal.get("id");

      let res = await orderDetail({ id });
      res.data.orderTime = moment(res.data.orderTime).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      res.data.deliveryTime = moment(res.data.deliveryTime).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      this.form = res.data;
    },
    submitForm() {
      orderEdit(this.form);
       this.isEdit=!this.isEdit
      getlocal.remove("id");
      this.$router.push("/home/ordermanage");
    },
    isedit(){
      this.isEdit=!this.isEdit
    }
  },
  created() {
    this.getlist();
  }
};
</script>

<style lang="less">
.order-manage {
  .title {
    font-size: 25px;
    font-weight: bold;
    line-height: 60px;
  }
}
</style>