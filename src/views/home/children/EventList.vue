<template>
  <div class="event-list">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据管理</el-breadcrumb-item>
        <el-breadcrumb-item>动态列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :span="7"
          ><el-input
            v-model="keywords"
            placeholder="请输入发布者完整名称"
          ></el-input
        ></el-col>
        <el-col :span="2"
          ><el-button @click="search" type="primary">搜索</el-button></el-col
        >
      </el-row>
      <el-table stripe :data="tableData">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-tag>分类:{{ scope.row.category | categoryFilter }}</el-tag>
            <el-tag>标题:{{ scope.row.title }}</el-tag>
            <el-tag>内容:{{ scope.row.content }}</el-tag>
            <el-tag>创建时间:{{ scope.row.createdAt }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="id" label="动态ID"> </el-table-column>
        <el-table-column prop="name" label="发布者"> </el-table-column>
        <el-table-column prop="userId" label="用户ID"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editEvent(scope.row)" type="primary" size="small"
              >编辑</el-button
            >
            <el-button
              @click="deleteEvent(scope.row)"
              type="warning"
              size="small"
              >删除</el-button
            ></template
          >
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
    <el-dialog title="编辑动态" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="eventInfo" :rules="rules">
        <el-form-item label="创建者" prop="name">
          <el-input disabled v-model="eventInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="eventInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="eventInfo.content"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="eventInfo.category">
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
              v-if="eventInfo.imgUrl"
              :src="eventInfo.imgUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCount, getEvent } from "../../../api/getCount";
import { deleteEvent } from "../../../api/delete";
import { updateEvent } from "../../../api/upload";
export default {
  data() {
    return {
      keywords: "",
      total: 0,
      currentPage: 1,
      limit: 20,
      tableData: [],
      dialogVisible: false,
      eventInfo: {},
      rules: {
        title: [{ required: true, message: "请设置标题", trigger: "blur" }],
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
      file: "",
    };
  },
  created() {
    this.getEventList();
  },
  methods: {
    getEventList() {
      getCount()
        .then((res) => {
          this.total = res.data.eventCount.count;
          this.tableData = res.data.eventCount.rows.splice(
            (this.currentPage - 1) * this.limit,
            this.currentPage * this.limit
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getEventList();
    },
    editEvent(row) {
      getEvent(row.id)
        .then((res) => {
          this.eventInfo = res.data;
          this.dialogVisible = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onchange(file) {
      this.file = file.raw;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file.raw);
      fileReader.onload = (e) => {
        this.eventInfo.imgUrl = e.target.result;
      };
    },
    deleteEvent(row) {
      this.$confirm("是否删除动态", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteEvent(row)
            .then((res) => {
              this.getEventList();
              this.$message({
                message: res.data.msg,
                type: "info",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    editConfirm() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          this.$message({
            message: "请填写必填项",
            type: "warning",
          });
        } else {
          let formdata = new FormData();
          formdata.append("id", this.eventInfo.id);
          formdata.append("name", this.eventInfo.name);
          formdata.append("title", this.eventInfo.title);
          formdata.append("content", this.eventInfo.content);
          formdata.append("file", this.file);
          formdata.append("category", this.eventInfo.category);
          updateEvent(formdata)
            .then((res) => {
              this.dialogVisible = false;
              this.$message({
                message: res.data.msg,
                type: "success",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    search() {
      let list = [];
      this.tableData.forEach((item) => {
        if (item.name === this.keywords) {
          list.push(item);
        }
      });
      this.tableData = list;
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
.el-tag {
  margin: 0 20px;
}
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