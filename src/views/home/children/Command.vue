<template>
  <div class="command">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据管理</el-breadcrumb-item>
        <el-breadcrumb-item>评论列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="commandList" stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="content" label="评论内容"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="deleteCommand(scope.row)"
              type="warning"
            >
              删除
            </el-button>
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
  </div>
</template>

<script>
import { getCommands } from "../../../api/getCount";
import { deleteCommand } from "../../../api/delete";
export default {
  data() {
    return {
      commandList: [],
      currentPage: 1,
      limit: 20,
      total: 0,
    };
  },
  created() {
    if (this.$route.query.id) {
      this.getCommands(this.$route.query.id);
    } else {
      this.$confirm("需要选择一个动态", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.push("commandList");
        })
        .catch(() => {
          this.$router.back();
        });
    }
  },
  methods: {
    getCommands(eventId) {
      getCommands(eventId)
        .then((res) => {
          this.commandList = res.data.rows.splice(
            (this.currentPage - 1) * this.limit,
            this.currentPage * this.limit
          );
          this.total = res.data.count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getCommands(this.$route.query.id);
    },
    deleteCommand(row) {
      this.$confirm("是否删除评论", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row);
          deleteCommand(row)
            .then((res) => {
              if (res.data.success) {
                this.getCommands(this.$route.query.id);
                this.$message.success(res.data.msg);
              } else {
                this.$message.warning(res.data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message.info("取消");
        });
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.el-card {
  position: relative;
  .el-table {
    margin-top: 15px;
  }
  padding-bottom: 20px;
}
</style>