<template>
  <div class="home-wrapper">
    <div class="header"></div>
    <van-tabs v-model="active">
      <van-tab title="商品">内容 1</van-tab>
      <van-tab title="评论">内容 2</van-tab>
      <van-tab title="商家">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2
    };
  }
};
</script>

<style lang="less" scoped>

</style>