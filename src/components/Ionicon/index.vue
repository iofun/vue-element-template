<template>
  <i :class="`ion ion-${type}`" :style="styles" />
</template>

<script>
export default {
  name: 'Icons',
  props: {
    type: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 16
    }
  },
  computed: {
    styles() {
      return {
        fontSize: `${this.size}px`,
        color: this.color
      };
    }
  }
};
</script>
