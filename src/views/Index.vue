<template>
 
 <el-card class="box-card index">
 <div slot="header" class="clearfix">
      <span class="title">后台首页</span>
    </div>
 


    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content pandect">
          <i class="iconfont icon-order list-icon ft-rb"></i>
          <div class="list-content">
            <p class="title">总订单</p>
            <span>{{pandectList.totalOrder}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content pandect">
          <i class="iconfont icon-xiaoshou1 list-icon ft-tm"></i>
          <div class="list-content">
            <p class="title">总销售额</p>
            <span>{{pandectList.totalSale}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content pandect">
          <i class="iconfont icon-dingdan list-icon ft-lg"></i>
          <div class="list-content">
            <p class="title">今日订单</p>
            <span>{{pandectList.todayOrder}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content pandect">
          <i class="iconfont icon-xiaoshou list-icon ft-ca"></i>
          <div class="list-content">
            <p class="title">今日销售额</p>
            <span>{{pandectList.todaySale}}</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 图表 -->
    <IndexEcharts></IndexEcharts>
 </el-card>
</template>

<script>
// 引入模块
import IndexEcharts from "../components/IndexEcharts";
export default {
  components: {
    IndexEcharts
  },
  data() {
    return {
      pandectList: {
        totalOrder: 2134,
        totalSale: 23416,
        todayOrder: 378,
        todaySale: 3896
      }
    };
  }
};
</script>

<style lang="less" >
.index {
  .title {
    font-size: 25px;
    font-weight: bold;
    line-height: 30px;
  }
  height: 100%;
  .el-col {
    .pandect {
      height: 110px;
      background-color: #fff;
      display: flex;
      text-align: center;
      .list-content {
        flex: 1;
        font-size: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          color: lightsteelblue;
          margin-bottom: 10px;
        }
      }
      .list-icon {
        flex: 1;
        font-size: 70px;
        line-height: 110px;
      }
      .ft-rb {
        color: royalblue;
      }
      .ft-tm {
        color: tomato;
      }
      .ft-lg {
        color: limegreen;
      }
      .ft-ca {
        color: cyan;
      }
    }
  }
}
</style>