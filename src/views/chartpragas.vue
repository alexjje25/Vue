<template>
  <div class="chartContain">
    <vChart
      :chart-data="arrPragas"
      :count="arrCountPragas"
      v-if="loaded"
      :options="chartOptions"
      label="Pragas"
      :chart-colors="pragasColors"
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
      arrPragas: [],
      arrCountPragas: [],
      pragasColors: {
        borderColors: "rgb(00,141,54)",
        pointBorderColor: "#dd7777",
        pointBackgroundColor: "#dd7777",
        backgroundColor: "rgba(00,141,54,0.2)",
      },
    };
  },
  computed: {
    GET_PRAGAS_DIA5() {
      let response = this.$store.getters["fazenda/GET_PRAGAS"];
      return response;
    },
  },
  beforeMount() {
    //GET
    let listaPragas = this.$store.getters["fazenda/GET_PRAGAS"];
    //TREATING
    let localCountPragas = {};
    setTimeout(() => {
      listaPragas.forEach((d) => {
        let convention = Number(d.chave);
        let datingConv = String(moment(convention).format("YYYY-MM-DD"));
        if (localCountPragas[datingConv]) {
          localCountPragas[datingConv] += 1;
        } else {
          localCountPragas[datingConv] = 1;
        }
        this.arrPragas.push({ data: datingConv, dados: d.dados });
      });
    });
    //quantidade setada
    this.arrCountPragas = localCountPragas;
    window.console.log("count chartpragas.vue", this.count, this.arrCountPragas);

  },
};
</script>

<style>
.chartContain {
  height: 400px;
  width: auto;
}
</style>
