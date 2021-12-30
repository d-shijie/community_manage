<template>
  <div class="add-event">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>添加数据</el-breadcrumb-item>
        <el-breadcrumb-item>添加动态</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form
        ref="form"
        :model="eventForm"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="发布者" prop="name">
          <el-input v-model="eventForm.name"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="eventForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="eventForm.content"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="eventForm.category">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in options"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="动态图片">
          <el-upload
            class="avatar-uploader"
            action
            :on-change="onchange"
            :show-file-list="false"
          >
            <img
              v-if="eventForm.imgUrl"
              :src="eventForm.imgUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="addEvent" type="primary">添加动态</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addEvent } from "../../../api/add";
export default {
  data() {
    return {
      eventForm: {
        name: "",
        title: "",
        content: "",
        category: "",
        imgUrl: "",
      },
      options: [
        {
          label: "推荐",
          value: 0,
        },
        {
          label: "生活",
          value: 1,
        },
        {
          label: "政治",
          value: 2,
        },
        {
          label: "娱乐",
          value: 3,
        },
      ],
      rules: {
        name: [{ required: true, message: "请填写发布者", trigger: "blur" }],
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        category: [{ required: true, message: "请选择分类", trigger: "blur" }],
      },
      file: "",
    };
  },
  created() {},
  methods: {
    onchange(file) {
      this.file = file.raw;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file.raw);
      fileReader.onload = (e) => {
        this.eventForm.imgUrl = e.target.result;
      };
    },
    addEvent() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          this.$message({
            message: "请填写必填项",
          });
        } else {
          this.$confirm("是否添加动态", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
          })
            .then(() => {
              let formdata = new FormData();
              formdata.append("name", this.eventForm.name);
              formdata.append("title", this.eventForm.title);
              formdata.append("content", this.eventForm.content);
              formdata.append("category", this.eventForm.category);
              formdata.append("file", this.file);
              addEvent(formdata)
                .then((res) => {
                  this.eventForm={}
                  this.$message.success(res.data.msg);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch(() => {
              this.$message.info("取消");
            });
        }
      });
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.el-form {
  margin-top: 30px;
}
img {
  width: 100px;
  height: 100px;
}
i {
  width: 100px;
  height: 100px;
  text-align: center;
  border: 1px solid #ccc;
  line-height: 100px;
  border-radius: 10px;
}
i:hover {
  border: 1px solid rgb(109, 109, 253);
}
</style>