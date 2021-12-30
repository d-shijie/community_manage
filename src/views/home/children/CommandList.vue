<template>
  <div class="command-list">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>查询</el-breadcrumb-item>
        <el-breadcrumb-item>评论查询</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :span="7">
          <el-input v-model="keywords" placeholder="请输入完整标题"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button @click="search" type="primary" :span="2">搜索</el-button>
        </el-col>
      </el-row>
      <el-table @row-click="rowClick" :data="commandList" stripe="">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间"></el-table-column>
        <el-table-column prop="category" label="分类">
          <template slot-scope="scope">
            {{ scope.row.category | categoryFilter }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { searchEvent } from "../../../api/search";
export default {
  data() {
    return {
      commandList: [],
      keywords: "",
    };
  },
  created() {},
  methods: {
    search() {
      searchEvent(this.keywords)
        .then((res) => {
          if (res.data.success) {
            this.commandList = res.data.data.rows;
            this.$message.success(res.data.msg);
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rowClick(row) {
      this.$router.push({
        path: "command",
        query: {
          id: row.id,
        },
      });
    },
  },
  filters: {
    categoryFilter(value) {
      // -1全部 0推荐 1生活 2政治 3娱乐
      if (value === 0) {
        return "推荐";
      } else if (value === 1) {
        return "生活";
      } else if (value === 2) {
        return "政治";
      } else if (value === 3) {
        return "娱乐";
      }
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.el-row {
  margin: 20px 0;
  .el-button {
    margin-left: 20px;
  }
}
</style>