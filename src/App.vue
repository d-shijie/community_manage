<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  width: 100vw;
  height: 100vh;
}
.el-pagination {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 10px 0;
}
</style>
