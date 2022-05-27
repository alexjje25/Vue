<template>
  <div>
    {{ resposta }}
  </div>
</template>

<script>
export default {
  name: "reviewsTotalItem",
  props: ["chaveArmadilha"],
  computed: {
    resposta() {
      let self = this;
      let response = self.$store.getters["fazenda/GET_REVIEW_TRAPS"].filter(
        item => {
          if (item.dados.idArmadilhaMonitoramento == self.chaveArmadilha) {
            return true;
          } else {
            return false;
          }
        }
      );
      return response.length;
    }
  }
};
</script>

<style scoped></style>
