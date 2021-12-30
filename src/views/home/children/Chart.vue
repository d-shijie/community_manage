<template>
  <div class="chart">
    <div class="chart-box"></div>
  </div>
</template>

<script>
import * as echart from "echarts";
import { getCount } from "../../../api/getCount";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    getCount()
      .then((res) => {
        let myChart = echart.init(document.querySelector(".chart-box"));

        myChart.setOption({
          tooltip: {},
          xAxis: {
            data: ["用户数量", "动态数量", "管理员数量"],
          },
          yAxis: {},
          series: [
            {
              name: "数量",
              type: "bar",
              data: [
                {
                  value: res.data.userCount.count,
                  itemStyle: {
                    opacity: 0.5,
                    color: "blue",
                  },
                },
                {
                  value: res.data.eventCount.count,
                  // 设置单个柱子的样式
                  itemStyle: {
                    color: "#91cc75",
                    shadowColor: "#91cc75",
                    borderType: "dashed",
                    opacity: 0.5,
                  },
                },
                {
                  value: res.data.AdminerCount.count,
                  // 设置单个柱子的样式
                  itemStyle: {
                    color: "red",
                    shadowColor: "#91cc75",
                    borderType: "dashed",
                    opacity: 0.5,
                  },
                },
              ],
              barWidth: "30%",
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {},
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.chart-box {
  width: 100%;
  height: 500px;
  margin-top: 100px;
}
</style>