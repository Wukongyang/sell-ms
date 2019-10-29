<template>
  <el-card class="box-card order-manage">
    <div class="title">订单管理</div>
    <hr />
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="formInline.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="formInline.consignee" placeholder="收货人"></el-input>
      </el-form-item>

      <el-form-item label="订单状态">
        <el-select v-model="formInline.orderState" placeholder="订单状态">
          <el-option label="已处理" value="已处理"></el-option>
          <el-option label="未处理" value="未处理"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间">
        <el-date-picker v-model="formInline.date" type="datetimerange" align="right"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryBtn">查询</el-button>
        <el-button type="primary" @click="clear">清除查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="orderData" border style="width: 100%">
      <el-table-column fixed prop="orderNo" label="订单号" width="100"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
      <el-table-column prop="consignee" label="收货人" width="100"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="200"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="180"></el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="180"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="100"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="100"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
         
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top:30px">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>
<script>
// 引入获取订单接口
import { orderList } from "@/api/order.js";
import moment from "moment";
// 引入获取本地存储的模块
import getlocal from "@/utils/getlocal.js"
export default {
  data() {
    return {
      orderData: [
        {
          orderNo: "",
          orderTime: "",
          phone: "",
          consignee: "",
          deliverAddress: "",
          deliveryTime: "",
          remarks: "",
          orderAmount: "",
          orderState: "已处理"
        }
      ],
      //查询的数据
      formInline: {
        orderNo: "",
        phone: "",
        consignee: "",
        orderState: "",
        date: []
      },
      currentPage: 1,
      pageSize: 5,
      total: 30
      //时间选择
    };
  },
  methods: {
    //拿到查看的行
    handleClick(row) {
      getlocal.set("id",row.id)

      this.$router.push("/home/orderdatils")
    },
    //查询按钮
    queryBtn() {
      //点击就调用方法，且为第一页
      this.currentPage = 1;
      this.getlist();
    },
    // 清除查询
    clear() {
      this.formInline = {
        orderNo: "",
        phone: "",
        consignee: "",
        orderState: "",
        date: []
      };
      this.getlist();
    },
    //分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist(); //调用
    },
    //获取订单列表
    async getlist() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.formInline.orderNo,
        consignee: this.formInline.consignee,
        phone: this.formInline.phone,
        orderState: this.formInline.orderState,
        date: JSON.stringify(this.formInline.date)
      };
      let { total, data } = await orderList(params);
      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format("YYYY-MM-DD hh:hh:ss");
        v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD hh:hh:ss");
      });
      this.total = total;
      this.orderData = data;
    }
  },
  created() {
    this.getlist();
  }
};
</script>
<style lang="less" >
.order-manage {
  .title {
    font-size: 25px;
    font-weight: bold;
    line-height: 60px;
  }
}
</style>