<template>
  <div class="admin-list">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :span="7"
          ><el-input
            v-model="keywords"
            placeholder="请输入管理员完整名称"
          ></el-input
        ></el-col>
        <el-col :span="2"
          ><el-button @click="search" type="primary">搜索</el-button></el-col
        >
      </el-row>
      <el-table stripe :data="adminList">
        <el-table-column width="150" type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="管理员"> </el-table-column>
        <el-table-column prop="password" label="密码"> </el-table-column>
        <el-table-column prop="createdAt" label="创建日期"> </el-table-column>
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
  </div>
</template>

<script>
import { getCount } from "../../../api/getCount";
export default {
  data() {
    return {
      adminList: [],
      total: 0,
      currenPage: 1,
      limit: 20,
      keywords: "",
    };
  },
  created() {
    this.getAdminList();
  },
  methods: {
    getAdminList() {
      getCount()
        .then((res) => {
          this.total = res.data.AdminerCount.count;
          this.adminList = res.data.AdminerCount.rows.splice(
            (this.currenPage - 1) * this.limit,
            this.currenPage * this.limit
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCurrentChange(page) {
      this.currenPage = page;
      this.getAdminList();
    },
    search() {
      let list = [];
      this.adminList.forEach((item) => {
        if (item.username === this.keywords) {
          list.push(item);
        }
      });
      this, (this.adminList = list);
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.el-row {
  margin: 20px 0;
  .el-button {
    margin-left: 15px;
  }
}
.el-card {
  position: relative;
  padding-bottom: 20px;
}
</style>