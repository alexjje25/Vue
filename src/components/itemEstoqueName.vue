<template>
  <span>
    {{ renderValue.dados.nome }}
  </span>
</template>

<script>
export default {
  props: { chave: { default: undefined, type: String } },
  computed: {
    renderValue() {
      return this.$store.getters["fazenda/GET_ESTOQUE"].find(
        item => item.chave == this.chave
      );
    }
  }
};
</script>

<style></style>
