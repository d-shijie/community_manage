<template>
  <div class="login">
    <h2 class="title">社区交流平台后台管理系统</h2>
    <div class="login-box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input placeholder="账号" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary">登录</el-button>
          <el-button @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { register, login } from "../../api/login";
export default {
  data() {
    return {
      ruleForm: {
        username: "dsj",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
    };
  },
  created() {},
  methods: {
    register() {
      register(this.ruleForm)
        .then((res) => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          } else {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login() {
      login(this.ruleForm)
        .then((res) => {
          if (res.data.success) {
            this.$router.push("/home");
            window.sessionStorage.setItem("adminId", res.data.adminer.id);
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.login {
  background-color: rgb(122, 112, 112);
  width: 100%;
  height: 100%;
  position: relative;
}
h2 {
  position: absolute;
  left: 50%;
  top: 20%;
  color: #fff;
  transform: translateX(-50%);
}
.login-box {
  background-color: #f2f2f2;
  position: absolute;
  left: 50%;
  border-radius: 15px;
  padding: 30px 80px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  top: 40%;
  transform: translate(-50%, -50%);
  .el-form {
    .el-form-item {
      text-align: center;
    }
  }
}
</style>