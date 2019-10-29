<template>
  <el-card class="box-card order-statistic">
    <div class="title">订单统计</div>
    <hr />
    <el-date-picker
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
    <el-button type="primary" style="margin-left:20px" @click="serach">查询</el-button>
    <div
      id="myChart"
      class="index-echarts"
      :style="{width: '1200px', height: '500px',marginTop:'20px'}"
    ></div>
  </el-card>
</template>
<script>
import { orderEc } from "@/api/order.js";
import moment from "moment";

export default {
  data() {
    return {
      date: ""
    };
  },
  methods: {
    async getOrder() {
      // 发送请求
      let { data } = await orderEc({ date: JSON.stringify(this.date) });
      // 处理时间
      data.forEach(v => (v.orderTime = moment(v.orderTime).format(" MM/DD ")));
      let obj = {};
      data.forEach(v => {
        // 判断obj对象中，如果存在就相加，不存在就赋值，数组去重
        if (!obj[v.orderTime]) {
          obj[v.orderTime] = v.orderAmount;
        } else {
          obj[v.orderTime] += v.orderAmount;
        }
      });
      // 定义空对象，保存echarts需要的数据
      let arr1=[],arr2=[]
      for (const i in obj) {
       arr1.push(i)
       arr2.push(obj[i])
      }
      this.drawLine(arr1,arr2)//调用echarts
    },
    // echarts
    drawLine(arr1,arr2) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "销售统计图" },
        tooltip: {},
        xAxis: {
          type: "category",
          data: arr1
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: arr2,
            type: "line",
            color: "#4ad2ff"
          }
         
        ]
      });
    },
    // 查询按钮
    serach(){
      // 直接调用方法
      this.getOrder()
    }
  },
  created() {
    this.getOrder();
  }
};
</script>
<style lang="less" >
.order-statistic {
  .title {
    font-size: 25px;
    font-weight: bold;
    line-height: 60px;
  }
}
</style>