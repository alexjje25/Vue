<template>
  <div>
    {{ renderME.dados.nome }}
  </div>
</template>

<script>
export default {
  props: { chave: { default: undefined, type: String } },
  computed: {
    renderME() {
      return this.$store.getters["fazenda/GET_ESTOQUE"].find(
        item => item.chave == this.chave
      );
    }
  }
};
</script>
