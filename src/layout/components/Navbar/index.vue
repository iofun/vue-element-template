<template>
  <div class="navbar">
    <!-- 折叠菜单 -->
    <hamburger :active="sidebar.opened" class="hamburger-container" />
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb-container" />
    <!-- 右侧选项 -->
    <div class="right-menu">
      <!-- 全屏 -->
      <screenfull id="screenfull" class="right-menu-item hover-effect" />

      <!-- 账户 -->
      <user />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from './Breadcrumb';
import Hamburger from './Hamburger';
import Screenfull from './Screenfull';
import User from './User';

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    User
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.navbar {
  height: #{$navHeight};
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .hamburger-container {
    line-height: 54px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .breadcrumb-container {
    float: left;
    line-height: #{$navLineHeight};
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: #{$navLineHeight};
    box-sizing: border-box;
    font-size: 0;
    >*{
      display: inline-block;
      margin-left: 16px;
      vertical-align: middle;
      font-size: 14px;
      &:last-child{
        margin-right: 16px;
      }
    }
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: middle;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
  }
}
</style>
