<template>
  <div>
    {{ GET_PRODUCAO.dados.name }}
  </div>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    GET_PRODUCAO() {
      let ID_QUERY = this.id;
      return this.$store.getters["fazenda/GET_PRODUCOES"].find(
        item => item.chave == ID_QUERY
      );
    }
  }
};
</script>

<style></style>
