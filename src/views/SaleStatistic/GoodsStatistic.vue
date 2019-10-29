<template>
  <el-card class="box-card goods-statistic">
    <div class="title">商品统计</div>
    <hr /> 
    <div>
      <goodsEcharts></goodsEcharts>
    </div>
  </el-card>
 
</template>
<script>
import goodsEcharts from "@/components/StatisticEcharts/goodsEcharts"
export default {
  components:{
    goodsEcharts
  }
};
</script>
<style lang="less" >
.goods-statistic {
  .title {
    font-size: 25px;
    font-weight: bold;
    line-height: 60px;
  }
}
</style>