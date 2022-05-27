<template>
  <div>
    <span v-if="renderizar.dados">
      {{ renderizar.dados.name }}
    </span>
    <span v-else>
      Não definido
    </span>
  </div>
</template>

<script>
export default {
  props: {
    chave: {
      default: "",
      type: String
    }
  },
  computed: {
    renderizar() {
      let self = this;
      return this.$store.getters["fazenda/GET_PRODUCOES"].find(
        item => item.chave == self.chave
      );
    }
  }
};
</script>
