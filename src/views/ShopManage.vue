<template>
  <el-card class="box-card shop-manage">
    <div class="title">店铺管理</div>
    <hr />
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="店铺名称" prop="shopname">
        <el-input :disabled="flag" v-model="form.shopname"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input :disabled="flag" v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input :disabled="flag" v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="店铺简介" prop="shopdesc">
        <el-input :disabled="flag" v-model="form.shopdesc"></el-input>
      </el-form-item>
      <el-form-item label="店铺标语" prop="slogan">
        <el-input :disabled="flag" v-model="form.slogan"></el-input>
      </el-form-item>
      <el-form-item label="店铺分类" prop="category">
        <el-select :disabled="flag" v-model="form.category" placeholder="请选择商品分类">
          <el-option label="火锅" value="火锅"></el-option>
          <el-option label="串串" value="串串"></el-option>
          <el-option label="烧烤" value="烧烤"></el-option>
          <el-option label="烤鱼" value="烤鱼"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="店铺特点" prop="feature">
        <el-checkbox-group :disabled="flag" v-model="form.feature">
          <el-checkbox label="品牌保证" name="type"></el-checkbox>
          <el-checkbox label="蜂鸟专送" name="type"></el-checkbox>
          <el-checkbox label="折店开铺" name="type"></el-checkbox>
          <el-checkbox label="外卖保" name="type"></el-checkbox>
          <el-checkbox label="准时达" name="type"></el-checkbox>
          <el-checkbox label="开发票" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="配送费">
        <el-input-number :disabled="flag" v-model="form.packingexpense" :min="5" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="起送价">
        <el-input-number :disabled="flag" v-model="form.minprice" :min="20" :max="100"></el-input-number>
      </el-form-item>

      <el-form-item label="营业时间">
        <el-time-picker
          :disabled="flag"
          is-range
          v-model="form.date"
          value-format="HH mm ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>

      <el-form-item label="店铺照片">
        <el-upload
          :disabled="flag"
          list-type="picture-card"
          class="avatar-uploader"
          :action="dialogImageUrl"
          :show-file-list="false"
          :on-success="shopAvatarSuccess"
          :before-upload="beforeshopAvatarUpload"
        >
          <img
            style="width:100%;height=100%"
            v-if="form.shopAvatar"
            :src="imgUrlapi+form.shopAvatar"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="营业执照">
        <el-upload
          :disabled="flag"
          list-type="picture-card"
          class="avatar-uploader"
          :action="dialogImageUrl"
          :show-file-list="false"
          :on-success="businessLicenseSuccess"
          :before-upload="beforebusinessLicenseUpload"
        >
          <img
            style="width:100%;height=100%"
            v-if="form.businessLicenseImg"
            :src="imgUrlapi+form.businessLicenseImg"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="经营许可证">
        <el-upload
          :disabled="flag"
          list-type="picture-card"
          class="avatar-uploader"
          :action="dialogImageUrl"
          :show-file-list="false"
          :on-success="cateringServiceLicenseSuccess"
          :before-upload="beforecateringServiceLicenseUpload"
        >
          <img
            style="width:100%;height=100%"
            v-if="form.cateringServiceLicenseImg"
            :src="imgUrlapi+form.cateringServiceLicenseImg"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="优惠活动">
        <el-select
          :disabled="flag"
          v-model="services"
          placeholder="满减优惠"
          @change="dialogFormVisible=true"
        >
          <el-option label="进店领券" value="进店领券"></el-option>
          <el-option label="满减优惠" value="满减优惠"></el-option>
          <el-option label="特价酬宾" value="特价酬宾"></el-option>
          <el-option label="新用户立减" value="新用户立减"></el-option>
        </el-select>
      </el-form-item>

      <!-- 优惠活动弹框 -->
      <el-dialog title="活动详情" :visible.sync="dialogFormVisible">
        <el-form :model="servicesFrom">
          <el-form-item label="活动详情" label-width="180px">
            <el-input v-model="servicesFrom.detail" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAdd ">确 定</el-button>
        </div>
      </el-dialog>

      <el-table center :data="form.tableData" style="width: 100%">
        <el-table-column label="活动标题" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动名称" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动详情" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.detail }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              :disabled="flag"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-form-item>
        <el-button type="primary" v-if="flag" @click="flag=!flag">编辑</el-button>
        <el-button type="success" v-else @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { getshopInfo, shopEdit } from "@/api/shop.js";
import moment from "moment";
import { async } from "q";
export default {
  data() {
    return {
      form: {
        shopname: "",
        address: "",
        phone: "",
        shopdesc: "",
        slogan: "",
        category: "",
        feature: [],
        date: [new Date(), new Date()],
        packingexpense: 5,
        minprice: 20,
        businessLicenselImg: "", //营业执照
        cateringServiceLicenseImg: "", //经营许可证
        shopAvatar: "", //店铺照片,
        tableData: []
      },
      dialogImageUrl: "http://172.16.11.200:6060/goods/upload", //图片上传到的地址
      imgUrlapi: "http://172.16.11.200:6060/upload/goods/", //图片加载地址
      flag: true,
      services: "", //优惠活动
      dialogFormVisible: false, //是否弹框
      servicesFrom: { detail: "" }, //弹框内填的内容
      rules: {
        shopname: [
          { required: true, message: "请输入店铺名称", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请填写店铺地址", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请填写电话号码", trigger: "blur" }],
        shopdesc: [
          { required: true, message: "请填写店铺简介", trigger: "blur" }
        ],
        slogan: [
          { required: true, message: "请输入店铺标语", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请选择店铺分类", trigger: "blur" }
        ],
        feature: [
          { required: true, message: "请选择店铺特点", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 解构数据
          let {
            shopname,
            address,
            phone,
            shopdesc,
            slogan,
            category,
            feature,
            date,
            packingexpense,
            minprice,
            businessLicenseImg, //营业执照
            cateringServiceLicenseImg, //经营许可证
            shopAvatar, //店铺照片,
            tableData
          } = this.form;
          // 数组，对象转为字符串
          feature = JSON.stringify(feature);
          date = JSON.stringify(date);
          tableData = JSON.stringify(tableData);
          // 准备参数
          let params = {
            id: 1,
            shopname,
            address,
            phone,
            shopdesc,
            slogan,
            category,
            feature,
            date,
            packingexpense,
            minprice,
            businessLicenseImg, //营业执照
            cateringServiceLicenseImg, //经营许可证
            shopAvatar, //店铺照片,
            tableData
          };
          let { code } = await shopEdit(params);
          if (code === 0) {
            this.flag = true;//改变文本是否禁用
             this.getshop()//调用获取店铺信息
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //上传店铺照片
    shopAvatarSuccess(res, file) {
      this.form.shopAvatar = res.imgUrl;
    },
    beforeshopAvatarUpload(file) {
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
    //上传营业执照
    businessLicenseSuccess(res, file) {
      this.form.businessLicenseImg = res.imgUrl;
    },
    beforecateringServiceLicenseUpload(file) {
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
    //上传经营许可证
    cateringServiceLicenseSuccess(res, file) {
      this.form.cateringServiceLicenseImg = res.imgUrl;
    },
    beforebusinessLicenseUpload(file) {
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
    // 获取店铺信息
    async getshop() {
      let { data } = await getshopInfo();
      let {
        shopname,
        address,
        phone,
        shopdesc,
        slogan,
        category,
        feature,
        date,
        packingexpense,
        minprice,
        businessLicenseImg, //营业执照
        cateringServiceLicenseImg, //经营许可证
        shopAvatar, //店铺照片,
        tableData
      } = data;
      // 格式化参数
      feature = JSON.parse(feature);
      date =JSON.parse(date);
      date.forEach(v => moment(v).format("hh:mm:ss"));
      tableData = JSON.parse(tableData);
      this.form = {
        shopname,
        address,
        phone,
        shopdesc,
        slogan,
        category,
        feature,
        date,
        packingexpense,
        minprice,
        businessLicenseImg, //营业执照
        cateringServiceLicenseImg, //经营许可证
        shopAvatar, //店铺照片,
        tableData
      };
    },
    //添加优惠活动
    confirmAdd() {
      this.dialogFormVisible = false;
      let info = {
        title: "",
        name: this.services,
        detail: this.servicesFrom.detail
      };
      switch (this.services) {
        case "进店领券":
          info.title = "领";
          break;
        case "满减优惠":
          info.title = "减";
          break;
        case "特价酬宾":
          info.title = "特";
          break;
        case "新用户立减":
          info.title = "新";
          break;
      }
      this.form.tableData.unshift(info);
    },
    // 删除优惠活动
    handleDelete(index){
      this.form.tableData.splice(index,1)
    }
  },
  created() {
    this.getshop();
  }
};
</script>
<style lang="less" >
.shop-manage {
  .title {
    font-size: 25px;
    font-weight: bold;
    line-height: 60px;
  }
  .el-form {
    width: 600px;
  }
  .el-table {
    margin-bottom: 30px;
  }
  .avatar {
    width: 100%;
    height: 100%;
  }
}
</style>