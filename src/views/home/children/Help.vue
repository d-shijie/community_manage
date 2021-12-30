<template>
  <div class="help">
    <el-carousel height="300px" interval="3000" type="card">
      <el-carousel-item v-for="item in images" :key="item">
        <img :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
    <el-timeline>
      <el-timeline-item timestamp="2021/11/15" placement="top">
        <el-card>
          <h4>完成基本后台接口</h4>
          <p>提交于 2021-11-25</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2021/12/3" placement="top">
        <el-card>
          <h4>完成客户端</h4>
          <p>提交与 2021-12-3</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2021/12/25" placement="top">
        <el-card>
          <h4>完成后台管理系统</h4>
          <p>提交与 2021-12-25</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-steps :active="active" finish-status="success">
      <el-step title="注册"></el-step>
      <el-step title="登录 "></el-step>
      <el-step title="管理员操作"></el-step>
      <el-step title="退出 "></el-step>
    </el-steps>
    <el-button type="primary" @click="next">下一步</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        "https://img1.baidu.com/it/u=1373441356,627786032&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
        "https://img2.baidu.com/it/u=1613418615,3791676405&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
        "https://img2.baidu.com/it/u=1849627428,2417153806&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.gtimg.com%2Fhousejm%2Fpics%2Fhv1%2F213%2F179%2F2257%2F146807283.jpg&refer=http%3A%2F%2Fimg1.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643441323&t=bae483c034fefdcd025fe2097d2c5ab3",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0418%2F464d5f5cp00qrrj47011pd200rd00kfg00id00dp.png%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643441347&t=4eaf458a38c10b5797d8358f5495e866",
      ],
      active: 0,
    };
  },
  created() {},
  methods: {
    next() {
      if (this.active++ > 3) this.active = 0;
    },
  },
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.help {
  position: relative;
}
.el-carousel {
  width: 80%;
  position: absolute;
  left: 50%;

  transform: translateX(-50%);
  .el-carousel-item {
    height: 300px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }
}
.el-timeline {
  position: absolute;
  top: 300px;
  left: 100px;
}
.el-steps {
  position: absolute;
  width: 50%;
  right: 350px;
  top: 390px;
}
.el-button {
  position: absolute;
  right: 1100px;
  top: 460px;
}
</style>