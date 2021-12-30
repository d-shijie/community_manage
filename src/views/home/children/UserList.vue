<template>
  <div class="user-list">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :span="7"
          ><el-input
            v-model="keywords"
            placeholder="请输入用户完整名称"
          ></el-input
        ></el-col>
        <el-col :span="2"
          ><el-button @click="search" type="primary">搜索</el-button></el-col
        >
      </el-row>
      <el-table stripe :data="tableList">
        <el-table-column width="150" type="index" label="#"> </el-table-column>
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="password" label="密码"> </el-table-column>
        <el-table-column prop="createdAt" label="创建日期"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="small"
              >编辑</el-button
            >
            <el-button
              @click="deleteUser(scope.row)"
              type="warning"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="limit"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="编辑用户信息" :visible.sync="editDialogVisible">
      <el-form
        :model="userInfo"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input disabled v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="userInfo.desc"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-select v-model="userInfo.age" placeholder="请选择">
            <el-option
              :lable="item"
              :value="item"
              v-for="(item, index) in 100"
              :key="index"
              >{{ item }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userInfo.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户头像">
          <el-upload
            class="avatar-uploader"
            action
            :on-change="onchange"
            :show-file-list="false"
          >
            <img
              v-if="userInfo.headImg"
              :src="userInfo.headImg"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCount } from "../../../api/getCount";
import { getUserDetail } from "../../../api/getUserDetail";
import { upload, updateUser } from "../../../api/upload";
import { deleteUser } from "../../../api/delete";
export default {
  data() {
    return {
      keywords: "",
      tableList: [],
      total: 0,
      currentPage: 1,
      limit: 20,
      editDialogVisible: false,
      userInfo: {},
      rules: {},
      file: "",
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      getCount()
        .then((res) => {
          this.tableList = res.data.userCount.rows.splice(
            (this.currentPage - 1) * this.limit,
            this.currentPage * this.limit
          );
          this.total = res.data.userCount.count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getUserList();
    },
    handleClick(row) {
      this.userInfo = {};
      this.editDialogVisible = true;
      getUserDetail(row.id)
        .then((res) => {
          this.userInfo = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onchange(file) {
      this.file = file;
      let readFile = new FileReader();
      readFile.readAsDataURL(file.raw);
      readFile.onload = (e) => {
        this.userInfo.headImg = e.target.result;
      };
    },
    editConfirm() {
      let formdate = new FormData();
      formdate.append("file", this.file.raw);
      formdate.append("username", this.userInfo.username);
      upload(formdate)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
      updateUser(this.userInfo)
        .then((res) => {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.editDialogVisible = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteUser(row) {
      this.$confirm("是否删除用户", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUser(row)
            .then((res) => {
              if (res.data.success) {
                this.getUserList();
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    search() {
      let list = [];
      this.tableList.forEach((item) => {
        if (item.username === this.keywords) {
          list.push(item);
        }
      });
      this.tableList = list;
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.el-card {
  position: relative;
  padding-bottom: 20px;
}
img {
  width: 100px;
  height: 100px;
}
.el-row {
  margin: 20px 0;
  .el-button {
    margin-left: 15px;
  }
}
</style>