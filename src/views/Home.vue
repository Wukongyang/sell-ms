<template>
  <el-container class="home">
    <Aside></Aside>
    <Right></Right>
  </el-container>
</template>

<script>
// 引入模块
import Aside from "../components/layout/Aside.vue";
import Right from "../components/layout/Right.vue";
export default {
  components: {
    Right,
    Aside
  }
};
</script>

<style lang="less" >
.home{
  height: 100%;
}
</style>