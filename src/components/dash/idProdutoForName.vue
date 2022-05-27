<template>
  <div>
    <span v-if="render !== undefined"> {{ render.dados.nome }} </span>
    <span v-else>
      Não encontrado
    </span>
  </div>
</template>

<script>
export default {
  props: {
    chave: {
      default: "none",
      type: String
    }
  },
  computed: {
    render() {
      let self = this;
      return self.$store.getters["fazenda/GET_ESTOQUE"].find(
        item => item.chave == self.chave
      );
    }
  }
};
</script>

<style></style>
