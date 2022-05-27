<template>
  <span>
    {{ renderME.dados.name }}
  </span>
</template>

<script>
export default {
  props: { chave: { default: undefined, type: String } },
  computed: {
    renderME() {
      return this.$store.getters["fazenda/GET_COLABORADORES"].find(
        item => item.chave == this.chave
      );
    }
  }
};
</script>
