<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <p>welcome</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style lang="less" scoped>
.el-card {
  height: 580px;
}
p {
  line-height: 240px;
  font-family: "Audiowide";
  text-align: center;
  color: #4169E1;
  font-size: 7em;
  -webkit-transition: all 1.5s ease;
  transition: all 1.5s ease;
}
p:hover {
  color: #87CEEB	;
  -webkit-animation: Glow 1.5s ease infinite alternate;
  animation: Glow 1.5s ease infinite alternate;
}
@-webkit-keyframes Glow {
  from {
    text-shadow: 0 0 10px #87CEEB	, 0 0 20px #87CEEB	, 0 0 30px #87CEEB	, 0 0 40px #4169E1,
      0 0 70px #4169E1, 0 0 80px #4169E1, 0 0 100px #4169E1, 0 0 150px #4169E1;
  }
  to {
    text-shadow: 0 0 5px #87CEEB	, 0 0 10px #87CEEB	, 0 0 15px #87CEEB	, 0 0 20px #4169E1,
      0 0 35px #4169E1, 0 0 40px #4169E1, 0 0 50px #4169E1, 0 0 75px #4169E1;
  }
}
@keyframes Glow {
  from {
    text-shadow: 0 0 10px #87CEEB	, 0 0 20px #87CEEB	, 0 0 30px #87CEEB	, 0 0 40px #4169E1,
      0 0 70px #4169E1, 0 0 80px #4169E1, 0 0 100px #4169E1, 0 0 150px #4169E1;
  }
  to {
    text-shadow: 0 0 5px #87CEEB	, 0 0 10px #87CEEB	, 0 0 15px #87CEEB	, 0 0 20px #4169E1,
      0 0 35px #4169E1, 0 0 40px #4169E1, 0 0 50px #4169E1, 0 0 75px #4169E1;
  }
}
</style>
