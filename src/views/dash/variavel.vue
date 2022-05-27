<template>
  <button :style="btnStyles">My button</button>
</template>

<script>
export default {
  name: "SimpleButton",
  props: {
    bgColor: {
      type: String,
      default: "#0099CC"
    },
    height: {
      type: Number,
      default: 100
    }
  },
  computed: {
    btnStyles() {
      return {
        "background-color": this.bgColor,
        height: `${this.height}px`
      };
    }
  }
};
</script>
