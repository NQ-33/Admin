<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <div id="main" style="width: 1200px; height: 500px"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import _ from "lodash";

export default {
  name: "Report",
  data() {
    return {option:{
        title: {
          text: '用户来源'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }};
  },
  created() {},
  async mounted() {
    var myChart = echarts.init(document.getElementById("main"));

    const { data: res } = await this.$http.get("reports/type/1");
    console.log(res);
    if (res.meta.status !== 200) {
      return this.$message.error("获取图表信息失败");
    }
    this.$message.success("获取图表信息成功");
    const result=_.merge(res.data,this.option)
    myChart.setOption(result);
  },
  methods: {},
};
</script>

<style lang="less" scoped>
</style>