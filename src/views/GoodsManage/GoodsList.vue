<template>
  <el-card class="box-card goods-list">
    <div class="title">商品管理</div>
    <hr />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品ID：">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称：">
              <span>{{ props.row.goodsname }}</span>
            </el-form-item>
            <el-form-item label="商品图片：">
              <div class="demo-fit">
                <el-avatar
                  shape="square"
                  :size="100"
                  fit="cover"
                  :src="'http://172.16.11.200:6060/upload/goods/'+props.row.imgUrl"
                ></el-avatar>
              </div>
            </el-form-item>
            <el-form-item label="商品分类：">
              <span>{{ props.row.goodscategory }}</span>
            </el-form-item>
            <el-form-item label="商品特色：">
              <span>{{ props.row.goodsfeature |filterF}}</span>
            </el-form-item>
            <el-form-item label="是否促销：">
              <span>{{ props.row.isPromotion }}</span>
            </el-form-item>
            <el-form-item label="商品规格：">
              <span>{{ props.row.standard |filterS}}</span>
            </el-form-item>
            <el-form-item label="商品描述：">
              <span>{{ props.row.goodsdesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id" align="center"></el-table-column>
      <el-table-column label="商品名称" prop="goodsname" align="center"></el-table-column>
      <el-table-column label="描述" prop="goodsdesc" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:30px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>
<script>
import { goodsList,goodsDel } from "@/api/goods.js";
import getlocal from "@/utils/getlocal.js"
import { format } from "path";
export default {
  data() {
    return {
      tableData: [
        {
          goodsname: "",
          goodscategory: "",
          goodsfeature: "",
          imgUrl: "",
          isPromotion: "",
          goodsdesc: "",
          standard: ""
        }
      ],
      currentPage: 1,
      pageSize: 6,
      total: 0
    };
  },
  methods: {
    //表单内的方法
    handleEdit(index, row) {
      //将商品信息储存到本地
      getlocal.set("goods",row)
      // 跳到编辑页面
      this.$router.push("/home/goodedit")


    },
   async handleDelete(index, row) {
      let {id}=row
    let {code}= await goodsDel({id})
     if(code===0){
        this.getlist();
     }
    },
    //  分页的方法
    handleSizeChange(val) {
      this.pageSize = val;
      this.getlist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
    },
    async getlist() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      let { total, data } = await goodsList(params);
      this.total = total;
      this.tableData = data;
    }
  },
  created() {
    this.getlist();
  },
  filters: {
    //将后台的数据处理再渲染页面
    filterF(v) {
      return JSON.parse(v).join(" */* ");
    },
    filterS(v) {
      let arr = JSON.parse(v);
      let newarr = arr.map(
        v =>
          `${v.goodsstandard}，价格：${v.goodsPrice}，打包费：${v.packingexpense}`
      );
      return newarr.join(" ** ");
    }
  }
};
</script>
<style lang="less" >
.goods-list {
  .title {
    font-size: 25px;
    font-weight: bold;
    line-height: 60px;
  }
  .el-table {
    .el-table__expanded-cell {
      .demo-table-expand {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>