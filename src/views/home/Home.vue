<template>
  <div class="home">
    <el-container>
      <el-header>
        <h2 @click="$router.push('/home/welcome')">社区交流平台后台管理系统</h2>
        <el-button @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <el-menu
            router
            background-color="#545c64"
            text-color="#fff"
            class="el-menu-vertical-demo"
          >
            <el-submenu
              v-for="(item, index) in navBar"
              :key="item.path"
              :index="item + index"
            >
              <template slot="title">
                <i :class="classes[index]"></i>
                <span>{{ item.label }}</span>
              </template>
              <el-menu-item
                v-for="(item1, index1) in item.children"
                :key="item1.path + index1"
                :index="item1.path"
                >{{ item1.label }}</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navBar: [
        {
          label: "数据管理",
          children: [
            {
              label: "用户列表",
              path: "userList",
            },
            {
              label: "动态列表",
              path: "eventList",
            },
            {
              label: "管理员列表",
              path: "adminList",
            },
            {
              label: "评论列表",
              path: "command",
            },
          ],
        },
        {
          label: "添加数据",
          children: [
            {
              label: "添加用户",
              path: "addUser",
            },
            {
              label: "添加动态",
              path: "addEvent",
            },
          ],
        },
        {
          label: "表格",
          children: [
            {
              label: "表格",
              path: "chart",
            },
          ],
        },
        {
          label: "查询",
          children: [
            {
              label: "查询评论",
              path: "commandList",
            },
          ],
        },
        {
          label: "帮助",
          children: [
            {
              label: "流程表",
              path: "help",
            },
          ],
        },
      ],
      classes: [
        "el-icon-s-data",
        "el-icon-s-platform",
        "el-icon-menu",
        "el-icon-search",
        "el-icon-s-help",
      ],
    };
  },

  created() {
    if (!window.sessionStorage.getItem("adminId")) {
      this.$router.push("/login");
      this.$message({
        message: "请登录",
        type: "warning",
      });
    }
  },
  methods: {
    logout() {
      this.$confirm("是否退出", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.sessionStorage.removeItem("adminId");
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.el-header {
  width: 100%;
  text-align: center;
  color: #fff;
  position: relative;
  letter-spacing: 1px;
  background-image: linear-gradient(
    to right top,
    rgb(127, 127, 212),
    rgb(77, 72, 72)
  );
  .el-button {
    position: absolute;
    right: 10px;
    top: 8px;
  }
}
.home {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-aside {
  background-color: rgb(91, 91, 92);
}
.el-main {
  background-color: #dfdfdf;
}
</style>