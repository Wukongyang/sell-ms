<template>
  <div id="myChart" class="index-echarts" :style="{width: '1200px', height: '500px'}"></div>
</template>

<script>
export default {
    mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "销售统计图" },
        tooltip: {},
        xAxis: {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月","八月","九月","十月","十一月","十二月"]
        },
        yAxis: {
          type: "value",
          data: [500, , 1000, 1500, 2000, 2500, 3000,79,80,100,36,89]
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130,79,80,100,36,89],
            type: "line",
            color:"#4ad2ff"
          },
           {
            data: [250, 20, 170, 100, 65, 150, 100,56,70,180,36,80],
            type: "line",
            color:"pink"
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>