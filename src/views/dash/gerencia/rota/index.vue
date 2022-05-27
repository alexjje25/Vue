<template>
  <div>
    <div class="boxPadrao">
      <div>
        <select v-model="filtro.colab">
          <option value="selecione">selecione colaborador</option>
          <option
            :key="index"
            v-for="(item, index) in GET_COLABORADORES"
            :value="item.chave"
            >{{ item.dados.name }}</option
          >
        </select>
      </div>
      <div></div>
      <div></div>
    </div>
    <vMap :lista="listaFiltrada" />
  </div>
</template>
<script>
import vMap from "./map";
import moment from "moment";
export default {
  components: {
    vMap
  },
  data() {
    return {
      filtro: {
        colab: "selecione",
        dataInicial: "",
        dataFinal: ""
      }
    };
  },
  mounted() {
    var hoje = moment().format("YYYY-MM-DD");
    this.filtro.dataInicial = hoje;
    this.filtro.dataFinal = hoje;
  },
  computed: {
    GET_COLABORADORES() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    },
    listaFiltrada() {
      let response = "";
      return response;
    }
  }
};
</script>

<style lang="scss" scoped>
.boxPadrao {
  margin: 10px auto;
  max-width: 90%;
}
#mapa {
  min-height: 500px;
  height: 700px;
  width: 100%;
  margin: 0 auto;
}
</style>
