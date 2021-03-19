<template>
  <div class="setting-container">
    <el-drawer :visible.sync="drawer" size="300px" :direction="direction" :append-to-body="true" :with-header="false" @closed="handleClose">
      <div class="drawer-wrap">
        <h3 class="drawer-title">系统布局配置</h3>
        <div class="drawer-item">
          <div class="dt">主题色</div>
          <div class="dd">
            <ThemePicker @on-change="themeChange"></ThemePicker>
          </div>
        </div>
        <div class="drawer-item">
          <div class="dt">开启标签</div>
          <div class="dd">
            <el-switch v-model="tagsView" class="drawer-switch" />
          </div>
        </div>
        <div class="drawer-item">
          <div class="dt">侧边栏logo</div>
          <div class="dd">
            <el-switch v-model="showLogo" class="drawer-switch" />
          </div>
        </div>
        <div class="drawer-item">
          <div class="dt">固定 Header</div>
          <div class="dd">
            <el-switch v-model="fixedHeader" class="drawer-switch" />
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker';
export default {
  components: {
    ThemePicker
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      drawer: false,
      direction: 'rtl'
    };
  },
  computed: {
    fixedHeader: {
      get() {
        return this.$store.state.app.fixedHeader;
      },
      set(val) {
        this.$store.dispatch('app/changeHeader', {
          key: 'fixedHeader',
          value: val
        });
      }
    },
    tagsView: {
      get() {
        return this.$store.state.app.tagsView;
      },
      set(val) {
        this.$store.dispatch('app/changeTagsView', {
          key: 'tagsView',
          value: val
        });
      }
    },
    showLogo: {
      get() {
        return this.$store.state.app.showLogo;
      },
      set(val) {
        this.$store.dispatch('app/changeSidebarLogo', {
          key: 'showLogo',
          value: val
        });
      }
    }
  },
  watch: {
    active(val) {
      if (val) {
        this.drawer = val;
      }
    }
  },
  methods: {
    handleClose() {
      this.$store.dispatch('app/toggleSettings');
    },
    themeChange(val) {
      this.$store.dispatch('app/changeTheme', {
        key: 'theme',
        value: val
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.drawer-wrap {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-title {
    margin-bottom: 16px;
    color: rgba(0, 0, 0, .85);
    font-size: 16px;
    line-height: 22px;
  }
  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .dt{
      width: 260px;
    }
  }
}
</style>
