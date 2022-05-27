<template>
  <div>
    {{ GET_ESTOQUE.dados }}
    <!--
    <div v-if="categoria == 'sementes'">
      <div
        v-for="(request, chaveFor) in GET_SEMENTES.filter(
          it => it.chave == insumo
        )"
        :key="chaveFor"
      >
        {{ request.dados.nome }}
      </div>
    </div>
    -->
  </div>
</template>

<script>
export default {
  props: ["categoria", "insumo"],
  computed: {
    GET_ESTOQUE() {
      //estoque {insumo, combustivel, etc...}
      return this.$store.getters["fazenda/GET_ESTOQUE"];
    }
    /*
    GET_SEMENTES() {
      return this.$store.getters["fazenda/GET_STOQUE_SEMENTES"];
    },
    GET_ADUBOS() {
      return this.$store.getters["fazenda/GET_STOQUE_ADUBOS"];
    },
    GET_DEFENSIVOS() {
      return this.$store.getters["fazenda/GET_STOQUE_DEFENSIVOS"];
    },
    GET_FERTILIZANTES() {
      return this.$store.getters["fazenda/GET_STOQUE_FERTILIZANTES"];
    }*/

    // end insumos utils
  }
};
</script>

<style></style>
