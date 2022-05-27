<template>
  <div class="searchFuncionario">
    <div class="tituloContent">Referencia de funcionario</div>
    <b>UID: {{ query }}</b>
    <hr />
    <div v-if="funcionario">
      {{ funcionario.dados.name }}
    </div>
    <div v-else>
      Não existente na sua fazenda
    </div>
  </div>
</template>

<script>
export default {
  props: ["query"],
  computed: {
    funcionario() {
      return this.$store.getters["fazenda/GET_THIS_COLABORADOR"](this.query);
    }
  }
};
</script>

<style lang="scss" scoped>
.searchFuncionario {
  padding: 10px;
}
</style>
