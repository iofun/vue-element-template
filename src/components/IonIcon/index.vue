<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="ion-external-icon ion-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { isExternal } from '@/utils/validate';

export default {
  name: 'IonIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.name);
    },
    iconName() {
      return `#icon-${this.name}`;
    },
    svgClass() {
      return 'ion-icon ' + this.className || '';
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.name}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.name}) no-repeat 50% 50%`
      };
    }
  }
};
</script>

<style scoped>
.ion-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.18em;
  fill: currentColor;
  overflow: hidden;
}

.ion-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
