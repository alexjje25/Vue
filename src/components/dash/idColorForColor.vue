<template>
  <div></div>
</template>

<script>
export default {
  props: {
    chave: {
      type: String,
      default: ""
    }
  },
  computed: {
    COLOR() {
      return this.$store.getters["fazenda/GET_COLORS"].find(color => {
        if (color.chave == self.chave) {
          return true;
        }
      });
    }
  }
};
</script>

<style></style>
