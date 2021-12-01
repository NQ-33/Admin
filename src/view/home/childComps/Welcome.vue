<template>
  <div>
    <div class="gif-box">
      <img src="@/assets/images/yz1.gif" alt="" />
      <img src="@/assets/images/yz2.gif" alt="" />
      <img src="@/assets/images/yz3.gif" alt="" />
      <img src="@/assets/images/yz4.gif" alt="" />
      <img src="@/assets/images/yz5.gif" alt="" />
      <img src="@/assets/images/yz6.gif" alt="" />
      <img src="@/assets/images/yz7.gif" alt="" />
      <img src="@/assets/images/yz8.gif" alt="" />
    </div>
    <div class="gif-box">
      <img src="@/assets/images/yz4.gif" alt="" />
      <img src="@/assets/images/yz5.gif" alt="" />
      <img src="@/assets/images/yz6.gif" alt="" />
      <img src="@/assets/images/yz1.gif" alt="" />
      <img src="@/assets/images/yz2.gif" alt="" />
      <img src="@/assets/images/yz3.gif" alt="" />
      <img src="@/assets/images/yz7.gif" alt="" />
      <img src="@/assets/images/yz8.gif" alt="" />
    </div>
    <div class="gif-box">
      <img src="@/assets/images/yz7.gif" alt="" />
      <img src="@/assets/images/yz8.gif" alt="" />
      <img src="@/assets/images/yz9.gif" alt="" />
      <img src="@/assets/images/yz4.gif" alt="" />
      <img src="@/assets/images/yz5.gif" alt="" />
      <img src="@/assets/images/yz6.gif" alt="" />
      <img src="@/assets/images/yz1.gif" alt="" />
      <img src="@/assets/images/yz2.gif" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style lang="less" scoped>
.gif-box {
  display: flex;
  overflow: hidden;
  margin-bottom: 20px;
  margin-right: 5px;
}
img {
    flex: 1;
    border-bottom:2px solid #ccc ;
}
</style>
