<template>
  <div
    id="myChart"
    class="index-echarts"
    :style="{width: '1200px',height:'500px',marginTop:'20px'}"
  ></div>
</template>

<script>
import { indexEc } from "@/api/order.js";
export default {
 
  methods: {
    async getEc() {
      let { date, data } = await indexEc();
     
      let { orderNum, amount } = data;
      let arr = [["title", "订单量", "销售额"]];
      date.map((v ,k)=> [v,orderNum[k],amount[k]] ).forEach(v => arr.push(v))
      this.drawLine(arr)
    },
    drawLine(arr) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        color: ['palegreen','#409eff'],
        title: {
          text: "订单统计"
        },
        legend: {},
        tooltip: {},
        dataset: {
          source: arr
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" },]
      });
    }
  },
  created() {
    this.getEc();
  }
};
</script>

<style lang="less">
.index-echarts {
  margin-top: 50px;
  background-color: #fff;
}
</style>