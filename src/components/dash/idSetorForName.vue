<template>
  <div>
    <span v-if="renderME.dados.titulo">
      {{ renderME.dados.titulo }}
    </span>
    <span v-else>
      S/ REGISTRO
    </span>
  </div>
</template>

<script>
export default {
  props: { chave: { default: "S/ REGISTRO", type: String } },
  computed: {
    renderME() {
      return this.$store.getters["fazenda/GET_SETORES"].find(
        item => item.chave == this.chave
      );
    }
  }
};
</script>
