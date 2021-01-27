<template>
  <el-dropdown class="avatar-container" trigger="click">
    <div class="avatar-wrapper">
      <img v-if="avatar" src="avatar" class="user-avatar">
      <img v-else src="~@/assets/images/user.png" class="user-avatar">
      <i class="el-icon-caret-bottom" />
    </div>
    <el-dropdown-menu slot="dropdown" class="user-dropdown">
      <router-link to="/">
        <el-dropdown-item>
          <i class="el-icon-s-home"></i>控 制 台
        </el-dropdown-item>
      </router-link>
      <router-link to="/account/index">
        <el-dropdown-item>
          <i class="el-icon-user"></i>个人中心
        </el-dropdown-item>
      </router-link>
      <el-dropdown-item @click.native="handleShowSettings">
        <i class="el-icon-setting"></i>系统设置
      </el-dropdown-item>
      <el-dropdown-item @click.native="handleClearCache">
        <i class="el-icon-delete"></i>清除缓存
      </el-dropdown-item>
      <el-dropdown-item divided @click.native="handleLogout">
        <i class="el-icon-switch-button"></i>退出登录
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    handleShowSettings() {
      this.$store.dispatch('app/toggleSettings');
    },
    handleClearCache() {
      this.$confirm('此操作将会导致页面重载, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
          for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
          }
        }
        localStorage.clear();
        setTimeout(() => {
          this.$message({
            type: 'success',
            message: '清除缓存成功!',
            onClose: () => {
              location.reload();
            }
          });
        }, 100);
      }).catch(() => {});
    },
    async handleLogout() {
      await this.$store.dispatch('auth/logout');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.avatar-container {
  .avatar-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    .user-avatar {
      cursor: pointer;
      width: 36px;
      height: 36px;
      border-radius: 10px;
    }
    .el-icon-caret-bottom {
      cursor: pointer;
      padding: 0 8px;
    }
  }
}
</style>
