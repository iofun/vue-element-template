<template>
  <div class="home-container">
    <div class="container">
      <div class="home-main">
        <div class="home-detail">
          <h3>高效、易用、功能强大的API管理平台</h3>
          <p class="desc">旨在为开发者，提供方便的异常检测服务</p>
        </div>
        <div class="home-logo">
          <h3><i class="el-icon-s-promotion"></i> Vue-Element-Template</h3>
        </div>
        <div class="btn-group">
          <el-button type="primary"><a href="/login">登录 / 注册</a></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import config from '@/config';

export default {
  name: 'Dashboard',
  data() {
    return {
      title: config.title
    };
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  }
};
</script>

<style lang="scss" scoped>
.home-container{
  height: 100%;
  position: relative;
  background: #2e2e2e;
  .container{
    width: 100%;
    min-height: 100%;
    background-image: url("~@/assets/images/star-bg.svg");
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 100%;
    display: table;
    text-align: center;
    .home-main{
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      color: #fff;
    }
    .home-logo{
      margin-top: 16px;
    }
    .home-detail{
      margin-top: 16px;
      h3{
        font-size: 1.6em;
      }
    }
    .btn-group{
      margin-top: 48px;
    }
  }
}
</style>
