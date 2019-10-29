<template>
  <el-card class="box-card accountList">
    <p class="title">账号列表</p>
    <hr />
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">{{ scope.row.acc }}</template>
      </el-table-column>
      <el-table-column prop="name" label="日期" width="180">
        <template slot-scope="scope">{{ scope.row.ctime }}</template>
      </el-table-column>
      <el-table-column prop="address" width="180" label="职级" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.region }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑按钮框 -->
    <el-dialog title="编辑信息" width="40%" :visible.sync="dialogFormVisible">
      <el-form :model="editform">
        <el-form-item label="账户名" label-width="120px">
          <el-input v-model="editform.acc" autocomplete="off" style="200px"></el-input>
        </el-form-item>
        <el-form-item label="用户组" label-width="120px">
          <el-select v-model="editform.region" placeholder="请选择用户组">
            <el-option label="高级管理员" value="高级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.currentpage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="params.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <div style="margin-top: 20px">
      <el-button @click.native="sleDelete(ids)" type="danger">批量删除</el-button>
      <el-button @click.native="toggleSelection()" type="primary">取消选择</el-button>
    </div>
  </el-card>
</template>

<script>
// 引入axios
import {
  listAccount,
  singleDelete,
  batchDelete,
  accountEdit
} from "@/api/account";
import moment from "moment";
export default {
  data() {
    return {
      tableData: [{ acc: "", ctime: "", region: "", id: "" }],
      ids: [],
      params: {
        //分页内容
        currentpage: 1,
        pagesize: 5
      },
      total: 40, //总条数
      //编辑内容
      editform: {
        region: "",
        acc: ""
      },
      dialogFormVisible: false
    };
  },
  methods: {
    //表单内的方法
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editform = { ...row };
    },
    //确认编辑
    async confirmEdit() {
      this.dialogFormVisible = false;
      let { acc, region, id } = this.editform;
      let { code } = await accountEdit({ acc, region, id });
      if (code === 0) {
        this.getList();
      }
    },
    //单个删除
    handleDelete(index, row) {
      // 单独删除。弹出确认框
      this.$confirm("确定删除该管理员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { id } = row;
         let{code}= await singleDelete({ id });
         if(code===0){
            this.getList()
         }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //分页内的方法
    handleSizeChange(val) {
      this.params.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.params.currentpage = val;
      this.getList();
    },

    //选中的项准备后台
    handleSelectionChange(val) {
      this.isDisabled = false;
      //val选中的项
      this.ids = val.map(v => v.id);
    },
    //批量删除按钮
    sleDelete(ids) {
      if (!ids.length) {
        this.$message.error("请选择删除项");
        return;
      }
      ids = JSON.stringify(ids);
      this.$confirm("确定删除该管理员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code } = await batchDelete({ ids });
          if(code===0){
            this.getList()
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
        this.isDisabled = true;
      }
    },
    // 获取列表
    async getList() {
      let { total, data } = await listAccount(this.params);
      this.total = total;
      //判断当前页删除完后自动跳到上一页
      if (!data.length && this.params.currentpage !== 1) {
        this.params.currentpage--;
        this.getList();
      }
      data.forEach(
        v => (v.ctime = moment(v.ctime).format("YYYY-MM-DD hh:mm:ss"))
      ); //处理时间格式
      this.tableData = data;
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="less" >
.accountList {
  .title {
    font-size: 25px;
    font-weight: bold;
    line-height: 60px;
  }
  .el-table {
    margin-top: 30px;
    margin-bottom: 30px;
    .el-table_1_column_1 {
      margin-left: 20px;
    }
  }
  .el-dialog {
    .el-input {
      width: 200px;
    }
  }

  .el-pagination {
    margin-bottom: 30px;
  }
}
</style>