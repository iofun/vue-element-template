<template>
  <div class="error-page">
    <div class="content-con">
      <div class="img-group">
        <img :src="src" alt="">
      </div>
      <div class="btn-group">
        <h1>500</h1>
        <div class="desc">抱歉，服务器出错了</div>
        <div class="actions">
          <el-button type="primary"><a href="/" target="_self">返回首页</a></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import error500 from '@/assets/images/error/error-500.svg';
export default {
  name: 'Error500',
  data() {
    return {
      src: error500
    };
  }
};
</script>
<style lang="scss" scoped>
@import './error.scss';
</style>

