<template>
  <div class="icons-container">
    <el-tabs type="border-card">
      <el-tab-pane label="Ion Icons">
        <div class="grid">
          <div v-for="item of ionIcons" :key="item" @click="handleClipboard(generateIonIconCode(item),$event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateIonIconCode(item) }}
              </div>
              <div class="icon-item">
                <ion-icon :name="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div class="grid">
          <div v-for="item of elementIcons" :key="item" @click="handleClipboard(generateElementIconCode(item),$event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateElementIconCode(item) }}
              </div>
              <div class="icon-item">
                <i :class="'el-icon-' + item" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard';
import elementIcons from './icons-ele';
import ionIcons from './icons-ion';

export default {
  name: 'Icons',
  data() {
    return {
      ionIcons,
      elementIcons
    };
  },
  methods: {
    generateIonIconCode(symbol) {
      return `<ion-icon name="${symbol}" />`;
    },
    generateElementIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`;
    },
    handleClipboard(text, event) {
      clipboard(text, event);
    }
  }
};
</script>

<style lang="scss" scoped>
.icons-container {
  overflow: hidden;
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }
  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }
  .disabled {
    pointer-events: none;
  }
}
</style>
