<template>
  <div class="home-container">
    <div class="home-wrapper">
      <div class="welcome">
        <div class="logo">
          <img :src="logo" alt="">
          <ion-icon name="bug 2" />
          <ion-icon name="bug" />
        </div>
        <div class="system"><i class="el-icon-location-information"></i> {{ title }}</div>
      </div>
      <div class="text">Hello <i class="el-icon-eleme"></i> {{ username }} </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import logo from '@/assets/images/logo.png';
import config from '@/config';

export default {
  name: 'Dashboard',
  data() {
    return {
      logo: logo,
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
.home-container {
  padding: 100px 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .text{
    font-size: 30px;
    line-height: 46px;
    margin-top: 80px;
  }
  .system{
    margin-top: 12px;
    color: #909399;
  }
}
</style>
