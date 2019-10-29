<template>
  <el-card class="box-card goods-edit">
    <div class="title">查看编辑商品</div>
    <hr />
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="商品名称" prop="goodsname">
        <el-input :disabled="flag" v-model="form.goodsname"></el-input>
      </el-form-item>

      <el-form-item label="商品分类" prop="goodscategory">
        <el-select :disabled="flag" v-model="form.goodscategory" placeholder="请选择商品分类">
          <el-option label="火锅" value="火锅"></el-option>
          <el-option label="串串" value="串串"></el-option>
          <el-option label="烧烤" value="烧烤"></el-option>
          <el-option label="烤鱼" value="烤鱼"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品特点" prop="goodsfeature">
        <el-checkbox-group :disabled="flag" v-model="form.goodsfeature">
          <el-checkbox label="新品上市" name="type"></el-checkbox>
          <el-checkbox label="第二单半价" name="type"></el-checkbox>
          <el-checkbox label="主打产品" name="type"></el-checkbox>
          <el-checkbox label="火爆产品" name="type"></el-checkbox>
          <el-checkbox label="祖传手艺" name="type"></el-checkbox>
          <el-checkbox label="源自四川" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="商品图片" prop="dialogImageUrl">
        <el-upload
          :disabled="flag"
          class="avatar-uploader"
          :action="dialogImageUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          list-type="picture-card"
        >
          <img
            v-if="form.imgUrl"
            width="100%"
            height="100%"
            :src="imgUrlapi+form.imgUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="是否促销">
        <el-radio :disabled="flag" v-model="form.isPromotion" label="促销">促销</el-radio>
        <el-radio :disabled="flag" v-model="form.isPromotion" label="不促销">不促销</el-radio>
      </el-form-item>

      <el-form-item label="食品规格">
        <el-radio :disabled="flag" v-model="form.goodsstandard" label="单规格">单规格</el-radio>
        <el-radio :disabled="flag" v-model="form.goodsstandard" label="多规格">多规格</el-radio>
      </el-form-item>

      <!-- 多规格选择 -->
      <div class="duoguige" v-if="!size">
        <el-button  :disabled="flag" type="primary" @click="dialogFormVisible = true">添加规格</el-button>
        <!-- 多规格弹出框 -->
        <el-dialog title="添加规格" :visible.sync="dialogFormVisible">
          <el-form :model="dialoglist">
            <el-form-item label="规格:">
              <el-input v-model="dialoglist.goodsstandard"></el-input>
            </el-form-item>
            <el-form-item label="包装费:">
              <el-input-number v-model="dialoglist.packingexpense" :min="1" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="价格:">
              <el-input-number v-model="dialoglist.goodsPrice" :min="1" :max="100"></el-input-number>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="btnStandard">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 多规格表格 -->
        <el-table   :data="tableData">
          <el-table-column label="规格" width="120">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.goodsstandard }}</span>
            </template>
          </el-table-column>
          <el-table-column label="包装费" width="120">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.packingexpense }}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格" width="120">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.goodsPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button :disabled="flag" size="mini" type="danger" @click="handleEdit(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 单规格选择 -->
      <div v-else>
        <el-form-item label="包装费">
          <el-input-number :disabled="flag" v-model="form.packingexpense" :min="1" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number :disabled="flag" v-model="form.goodsPrice" :min="1" :max="100"></el-input-number>
        </el-form-item>
      </div>
      <el-form-item label="商品描述" prop="goodsdesc">
        <el-input
          :disabled="flag"
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="form.goodsdesc"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="flag=!flag" v-if="flag">开始编辑</el-button>
        <el-button type="primary" @click="onSubmit" v-else>确认提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// 引入模块
import { goodsEdit } from "@/api/goods.js";
import getlocal from "@/utils/getlocal.js";
export default {
  data() {
    return {
      flag: true,
      //多规格表格
      tableData: [
        {
          goodsstandard: "默认",
          packingexpense: "13",
          goodsPrice: "56"
        }
      ],
      //多规格弹出框
      dialoglist: {
        goodsstandard: "默认",
        packingexpense: "13",
        goodsPrice: "56"
      },
      // 添加商品表单
      form: {
        goodsname: "",
        goodscategory: "",
        goodsfeature: [],
        imgUrl: "",
        isPromotion: "促销",
        goodsstandard: "单规格",
        packingexpense: 1,
        goodsPrice: 21,
        goodsdesc: ""
      },

      dialogImageUrl: "http://172.16.11.200:6060/goods/upload", //图片上传到的地址
      imgUrlapi: "http://172.16.11.200:6060/upload/goods/", //图片加载地址
      dialogFormVisible: false, //多规格弹出框
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        goodscategory: [
          { required: true, message: "请选择商品分类", trigger: "blur" }
        ],
        goodsfeature: [
          { required: true, message: "请选择商品特征", trigger: "blur" }
        ],
        goodsdesc: [
          { required: true, message: "请填写商品描述", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    async onSubmit() {
      let { id } = getlocal.get("goods");
      //准备参数
      let {
        goodsname,
        goodscategory,
        goodsfeature,
        imgUrl,
        isPromotion,
        goodsdesc
      } = this.form;
      goodsfeature = JSON.stringify(goodsfeature); //将数组转为字符串
      let standard =
        this.form.goodsstandard === "单规格" //判断是否是多规格还是单规格
          ? JSON.stringify([
              {
                goodsstandard: this.form.goodsstandard,
                packingexpense: this.form.packingexpense,
                goodsPrice: this.form.goodsPrice
              }
            ])
          : JSON.stringify(this.tableData);
      //准备参数
      let params = {
        id,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        goodsname,
        goodscategory,
        goodsfeature,
        imgUrl,
        isPromotion,
        goodsdesc,
        standard
      };
      let { code } = await goodsEdit(params);
      if (code === 0) {
          this.flag=!this.flag
          getlocal.remove("goods")
        this.$router.push("/home/goodlist");
      }
    },

    //图片上传
    handleAvatarSuccess(res, file) {
      let { code, imgUrl } = res; //上传成功的返回
      if (code === 0) {
        this.form.imgUrl = imgUrl; //将图片路径赋值
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 确认添加多规格
    btnStandard() {
      this.dialogFormVisible = false; //关闭模态框
      this.tableData.unshift(this.dialoglist); //将数据添加进入表格中
      // 重置添加多规格表单，防止关联
      this.dialoglist = {
        goodsstandard: "",
        packingexpense: "",
        goodsPrice: ""
      };
    },
    //删除多规格表格
    handleEdit(index) {
      this.tableData.splice(index, 1); //删除数组索引为1的项
    },
    // 回填数据
    returnList() {
      let goods = getlocal.get("goods"); //获取本地数据
      let {
        //将可以用的数据提取
        goodsname,
        goodscategory,
        goodsfeature,
        imgUrl,
        isPromotion,
        goodsdesc
      } = goods;
      //   赋值
      this.form.goodsname = goodsname;
      this.form.goodsfeature = JSON.parse(goodsfeature);
      this.form.goodscategory = goodscategory;
      this.form.imgUrl = imgUrl;
      this.form.isPromotion = isPromotion;
      this.form.goodsdesc = goodsdesc;

      let arr = JSON.parse(goods.standard);
      //   判断是否是单规格
      arr[0].goodsstandard === "单规格"
        ? ((this.form.goodsstandard = arr[0].goodsstandard),
          (this.form.packingexpense = arr[0].packingexpense),
          (this.form.goodsPrice = arr[0].goodsPrice))
        : (this.tableData = arr,this.form.goodsstandard="多规格");
    }
  },
  computed: {
    size() {
      return this.form.goodsstandard === "单规格" ? true : false; //计算单规格还是多规格
    }
  },
  mounted() {
    this.returnList();
  }
};
</script>

<style lang="less">
.goods-edit {
  .title {
    font-size: 25px;
    font-weight: bold;
    line-height: 60px;
  }
}
</style>