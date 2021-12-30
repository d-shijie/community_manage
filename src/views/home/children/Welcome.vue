<template>
  <div class="welcome">
    <div class="top">
      <el-tag @click="navigetor('userList')"
        >用户数量：{{ count.userCount }}</el-tag
      >
      <el-tag @click="navigetor('eventList')"
        >动态数量：{{ count.eventCount }}</el-tag
      >
      <el-tag @click="navigetor('adminList')"
        >管理员数量：{{ count.adminerCount }}</el-tag
      >
    </div>
    <h2>welcome</h2>
  </div>
</template>

<script>
import { getCount } from "../../../api/getCount";
export default {
  data() {
    return {
      count: {
        userCount: 0,
        eventCount: 0,
        adminerCount: 0,
      },
    };
  },
  created() {
    getCount()
      .then((res) => {
        console.log(res);
        this.count.userCount = res.data.userCount.count;
        this.count.eventCount = res.data.eventCount.count;
        this.count.adminerCount = res.data.AdminerCount.count;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    navigetor(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.welcome {
  width: 100%;
  height: 100%;
}
.top {
  width: 100%;
  //   height: 100%;
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
}
.el-tag {
  text-align: center;
  width: 20%;
  cursor: pointer;
  font-size: 24px;
  font-weight: 600;
  line-height: 150px;
  height: 150px;
  transition: all 0.5s;
}
.el-tag:hover {
  transform: scale(1.2, 1.2);
}
.el-tag:nth-child(2) {
  color: black;
}
.el-tag:nth-child(3) {
  color: red;
}
h2 {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 40px;
  //   animation: name duration timing-function delay iteration-count direction fill-mode;
  animation-name: changeColor;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
}
h2:hover {
  transform: rotateX("360deg");
}
@keyframes changeColor {
  0% {
    color: red;
    transform: scale(0.8, 0.8);
  }
  25% {
    color: yellow;
    transform: scale(1, 1);
  }
  50% {
    color: blue;
    transform: scale(1.4, 1.4);
  }
  75% {
    color: green;
    transform: scale(1.6, 1.6);
  }
  100% {
    color: black;
    transform: scale(1.2, 1.2);
  }
}
</style>