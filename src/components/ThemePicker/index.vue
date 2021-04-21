<template>
  <el-color-picker v-model="cacheTheme" :predefine="perdefine" size="small" class="theme-picker" @change="changeTheme" />
</template>

<script>
import { Cookie } from '@/utils/cookie';
import config from '@/config';

export default {
  name: 'ThemePicker',
  data() {
    return {
      localChalk: '', // 主题样式
      uiTheme: '#409EFF', // 默认UI颜色(官网查看)
      cacheTheme: '', // 自定义选择缓存颜色
      // 默认可选择颜色
      perdefine: [
        '#2d8cf0',
        '#19be6c',
        '#13c2c2',
        '#ff9800',
        '#ee3f16',
        '#212121',
        '#ee7c96',
        '#e46cba',
        '#9866e2',
        '#6959CD'
      ]
    };
  },
  mounted() {
    this.initTheme();
  },
  methods: {
    async initTheme() {
      this.cacheTheme = await Cookie.get(`${config.tokenPrefix}_theme`);
      if (this.cacheTheme) {
        if (this.uiTheme !== this.cacheTheme && this.cacheTheme.indexOf('#') > -1) {
          this.changeTheme(this.cacheTheme);
        } else {
          Cookie.remove(`${config.tokenPrefix}_theme`);
        }
      } else {
        this.cacheTheme = this.uiTheme;
      }
    },
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style;
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
      });
      return newStyle;
    },
    getCSSString(url) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            this.localChalk = xhr.responseText.replace(/@font-face{[^}]+}/, '');
            resolve(this.localChalk);
          }
        };
        xhr.open('GET', url);
        xhr.send();
      });
    },
    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        if (tint === 0) { // when primary color is in its rgb space
          return [red, green, blue].join(',');
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));

          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);

          return `#${red}${green}${blue}`;
        }
      };

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);

        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);

        return `#${red}${green}${blue}`;
      };

      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    },
    async changeTheme(value) {
      if (value === null) {
        this.cacheTheme = this.uiTheme;
        value = this.uiTheme;
      }
      if (!value) { return; }

      const originalCluster = this.getThemeCluster(this.uiTheme.replace('#', ''));
      const themeCluster = this.getThemeCluster(value.replace('#', ''));
      // console.log(originalCluster, themeCluster);

      const getHandler = (variable, id) => {
        return () => {
          const newStyle = this.updateStyle(variable, originalCluster, themeCluster);
          let styleTag = document.getElementById(id);
          if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.setAttribute('type', 'text/css');
            styleTag.setAttribute('id', id);
            document.head.appendChild(styleTag);
          }
          styleTag.innerText = newStyle;
        };
      };

      if (!this.localChalk) {
        const version = require('element-ui/package.json').version;
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
        await this.getCSSString(url, 'chalk');
      }

      const chalkHandler = getHandler(this.localChalk, 'chalk-style');
      chalkHandler();

      const styles = [].slice.call(document.querySelectorAll('style')).filter(style => {
        const text = style.innerText;
        return new RegExp(this.uiTheme, 'i').test(text) && !/Chalk Variables/.test(text);
      });
      styles.forEach(style => {
        const { innerText } = style;
        if (typeof innerText !== 'string') return;
        style.innerText = this.updateStyle(innerText, originalCluster, themeCluster);
      });

      this.$emit('on-change', this.cacheTheme);
    }
  }
};
</script>

