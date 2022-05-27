<template>
  <div class="colorBlock" :style="{ backgroundColor: GET_COR.dados.cor }"></div>
</template>

<script>
export default {
  props: ["chave"],
  computed: {
    GET_COR() {
      return this.$store.getters["admin/GET_COLORS"].find(
        item => item.chave == this.chave
      );
    }
  }
};
</script>

<style>
.colorBlock {
  padding: 10px;
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 1px solid silver;
}
</style>
