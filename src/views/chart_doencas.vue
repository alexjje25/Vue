<template>
  <div class="chartContain">
    <vChart
      :chart-data="arrDoencas"
      :count="arrCountDoencas"
      v-if="loaded"
      :options="chartOptions"
      label="Doenças"
      :chart-colors="doencasColors"
    />
  </div>
</template>

<script>
import vChart from "./chart";
import moment from "moment";
export default {
  components: {
    vChart,
  },
  data() {
    return {
      loaded: true,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      arrDoencas: [],
      arrCountDoencas: [],
      doencasColors: {
        borderColors: "rgb(00,141,54)",
        pointBorderColor: "#dd7777",
        pointBackgroundColor: "#dd7777",
        backgroundColor: "rgba(00,141,54,0.2)",
      },
    };
  },
  computed: {
    GET_DOENCAS_DIA5() {
      let response = this.$store.getters["fazenda/GET_DOENCAS"];
      return response;
    },
  },
  beforeMount() {
    //GET
    let listaDoencas = this.$store.getters["fazenda/GET_DOENCAS"];
    //TREATING
    let localCountDoencas = {};
    setTimeout(() => {
      listaDoencas.forEach((d) => {
        let convention = Number(d.chave);
        let datingConv = String(moment(convention).format("YYYY-MM-DD"));
        if (localCountDoencas[datingConv]) {
          localCountDoencas[datingConv] += 1;
        } else {
          localCountDoencas[datingConv] = 1;
        }
        this.arrDoencas.push({ data: datingConv, dados: d.dados });
      });
    });
    //quantidade setada
    this.arrCountDoencas = localCountDoencas;
    window.console.log(
      "count chart_doencas.vue",
      this.count,
      this.arrCountDoencas
    );
  },
};
</script>

<style>
.chartContain {
  display: flex;
  height: auto;
  width: auto;
}
</style>

