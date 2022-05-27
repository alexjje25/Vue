<template>
  <div>
    {{ renderME.dados.name }}
  </div>
</template>

<script>
export default {
  props: { chave: { default: undefined, type: String } },
  computed: {
    renderME() {
      return this.$store.getters["fazenda/GET_TALHOES"].find(
        item => item.chave == this.chave
      );
    }
  }
};
</script>
