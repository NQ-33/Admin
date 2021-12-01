<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片式图 -->
    <el-card>
      <!-- 提示条 -->
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closeable="false"
      >
      </el-alert>
      <!-- 步骤条 -->
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- form表单 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <!-- tab侧边栏 -->
        <el-tabs
          v-model="activeIndex"
          tab-position="left"
          :before-leave="beforeTabLeave"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="{
                  expandTrigger: 'hover',
                  label: 'cat_name',
                  value: 'cat_id',
                  children: 'children',
                }"
                @change="handleChange"
                clearable
              ></el-cascader>
            </el-form-item>
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              v-for="item in this.manyTableData"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="cb"
                  v-for="(cb, i) in item.attr_vals"
                  :key="i"
                  size="mini"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="item in onlyTableData"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              class="upload-demo"
              ref="uploadRef"
              :action="upLoadURL"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addForm.goods_introduce"> </quill-editor>
            <el-button type="primary" class="addBtn" @click="add"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog title="预览" :visible.sync="showPic" width="50%">
      <img :src="previewPath" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "Add",
  data() {
    return {
      activeIndex: "0",
      //   添加商品的表单
      addForm: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_cat: [],
        pics: [],
        goods_introduce: "",
        attrs: [],
      },
      addFormRules: {
        goods_name: {
          required: true,
          message: "请输入商品名称",
          trigger: "blur",
        },
        goods_price: {
          required: true,
          message: "请输入商品价格",
          trigger: "blur",
        },
        goods_weight: {
          required: true,
          message: "请输入商品重量",
          trigger: "blur",
        },
        goods_number: {
          required: true,
          message: "请输入商品数量",
          trigger: "blur",
        },
        goods_cat: {
          required: true,
          message: "请选择三级商品",
          trigger: "blur",
        },
      },
      //   商品分类列表
      cateList: [],
      // tab动态静态赋值
      tabSel: "",
      // 动态参数列表
      manyTableData: [],
      // 静态属性列表
      onlyTableData: [],
      // 上传图片的URL
      upLoadURL: "http://127.0.0.1:8888/api/private/v1/upload",
      // 上传图片的请求头
      headers: {
        Authorization: window.sessionStorage.getItem("token"),
      },
      // 图片的绝对路径
      previewPath: "",
      // 图片预览
      showPic: false,
    };
  },
  created() {
    this.getCateList();
  },
  computed: {
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2];
      }
      return null;
    },
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get("categories");
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品分类失败");
      }
      this.cateList = res.data;
    },
    // 级联选择器触发函数
    handleChange() {
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = [];
        return this.$message.error("您选择的不是三级分类商品");
      }
      this.removeForm();
    },
    // 重置表单项目
    removeForm() {
      // this.addForm.goods_name = "";
      // this.addForm.goods_price = "";
      // this.addForm.goods_weight = "";
      // this.addForm.goods_number = "";
      this.addForm.pics = [];
      this.$refs.uploadRef.clearFiles();
      this.addForm.goods_introduce = "";
      this.manyTableData = [];
      this.onlyTableData = [];
    },
    beforeTabLeave(activeName, oldActiveName) {
      if (oldActiveName === "0" && this.addForm.goods_cat.length !== 3) {
        this.$message.error("请先选择商品分类");
        return false;
      }
    },
    // tab点击触发
    tabClicked() {
      if (this.activeIndex === "1") {
        this.tabSel = "many";
        this.getParamsData();
        // console.log(1);
      } else if (this.activeIndex === "2") {
        this.tabSel = "only";
        this.getParamsData();
        // console.log(2);
      }
    },
    // 请求商品参数和属性
    async getParamsData() {
      if (this.manyTableData.length == 0 || this.onlyTableData.length == 0) {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          { params: { sel: this.tabSel } }
        );
        // console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("请求商品参数失败");
        }
        if (this.tabSel === "many") {
          res.data.forEach((item) => {
            item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
          });
          this.manyTableData = res.data;
        } else if (this.tabSel === "only") {
          this.onlyTableData = res.data;
          // console.log(this.onlyTableData);
        }
      }
    },
    // 上传成功触发函数
    handleSuccess(response) {
      // console.log(response);
      const picInfo = { pic: response.data.tmp_path };
      this.addForm.pics.push(picInfo);
      // console.log(this.addForm.pics);
    },
    // 点击上传框触发
    handlePreview(file) {
      this.previewPath = file.response.data.url;
      this.showPic = true;
    },
    // 点击上传关闭按钮触发
    handleRemove(file) {
      const filePath = file.response.data.tmp_path;
      const i = this.addForm.pics.findIndex((x) => x.pic === filePath);
      this.addForm.pics.splice(i, 1);
      // console.log(this.addForm.pics);
    },
    // 添加商品
    add() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("请检查是否填写必填项");
        }
        // 处理商品三级分类id
        const form = _.cloneDeep(this.addForm);
        form.goods_cat = form.goods_cat.join(",");
        // console.log(form.goods_cat);
        // 处理动态参数
        this.manyTableData.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' '),
          };
          this.addForm.attrs.push(newInfo);
        });
        // 处理静态属性
        this.onlyTableData.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals,
          };
          this.addForm.attrs.push(newInfo);
        });
        form.attrs=this.addForm.attrs
        // console.log(form);
        // 发起数据请求
        const {data:res}=await this.$http.post('goods',form)
        console.log(res);
        if(res.meta.status !==201){
          return this.$message.error('添加商品失败')
        }
          this.$message.success('添加商品成功')
          this.$router.push('/goods')
        
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-checkbox {
  margin-right: 5px !important;
}
.el-dialog {
  img {
    width: 100%;
  }
}
.addBtn {
  margin: 10px 0;
}
</style>
