<template>
  <div class="error-page">
    <div class="content-con">
      <div class="img-group">
        <img :src="src" alt="">
      </div>
      <div class="btn-group">
        <h1>404</h1>
        <div class="desc">抱歉，你访问的页面不存在</div>
        <div class="actions">
          <el-button type="primary"><a href="/" target="_self">返回首页</a></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import error404 from '@/assets/images/error/error-404.svg';
export default {
  name: 'Error404',
  data() {
    return {
      src: error404
    };
  }
};
</script>
<style lang="scss" scoped>
@import './error.scss';
</style>
