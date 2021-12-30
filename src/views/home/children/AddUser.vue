<template>
  <div class="add-user">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>添加数据</el-breadcrumb-item>
        <el-breadcrumb-item>添加用户</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form
        ref="ruleForm"
        :model="userForm"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="userForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-select v-model="userForm.age">
            <el-option
              :lable="item"
              :value="item"
              v-for="(item, index) in 100"
              :key="index"
              >{{ item }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="userForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="addUser" type="primary">添加用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { register_user } from "../../../api/login";
export default {
  data() {
    return {
      userForm: {
        username: "",
        password: "",
        sex: "",
        age: "",
        desc: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    addUser() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          this.$message({
            type: "warning",
            message: "请填写必要表单项",
          });
        } else {
          this.$confirm("是否添加用户", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              register_user(this.userForm)
                .then((res) => {
                  this.userForm = {};
                  this.$message({
                    message: res.data.msg,
                    type: "info",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch(() => {
              this.$message({
                message: "取消",
                type: "info",
              });
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
</style>