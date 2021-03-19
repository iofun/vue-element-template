<template>
  <div class="layout-content">
    <section class="content-main">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.layout-content {
  height: calc(100vh - #{$navHeight} );
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #f0f2f5;
  .content-main{
    padding: 15px;
    height: 100%;
    overflow: auto;
  }
}
.fixed-header+.layout-content {
  padding-top: #{$navHeight};
   min-height: calc(100vh);
}

// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
