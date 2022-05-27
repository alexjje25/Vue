<template>
  <div class="chartContain">
    <vChart
      :chart-data="arrDaninhas"
      :count="arrCountDaninhas"
      :options="chartOptions"
      label="Daninhas"
      :chart-colors="daninhasColors"
    />
    <pre>{{ arrCountDaninhas }}</pre>
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
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      arrDaninhas: [],
      arrCountDaninhas: [],
      daninhasColors: {
        borderColors: "rgb(00,141,54)",
        pointBorderColor: "#dfd7777",
        pointBackgroundColor: "#dd7777",
        backgroundColor: "rgba(00,141,54,0.2)",
      },
    };
  },
  computed: {
    GET_DANINHAS_DIA5() {
      let response = this.$store.getters["fazenda/GET_DANINHAS"];
      return response;
    },
  },
  beforeMount() {
    //GET
    let listaDaninhas = this.$store.getters["fazenda/GET_DANINHAS"];
    //TREATING
    let localCountDaninhas = {};
    setTimeout(() => {
      listaDaninhas.forEach((d) => {
        let convention = Number(d.chave);
        let datingConv = String(moment(convention).format("DD/MM"));
        if (localCountPragas[datingConv]) {
        localCountPragas[datingConv] += 1;
      } else {
        localCountPragas[datingConv] = 1;
      }
        this.arrDaninhas.push({ data: datingConv, dados: d.dados });
      });
    }, 2000);
    //quantidade setada
    this.arrCountDaninhas = localCountDaninhas;
    window.console.log("count tester.vue", this.arrCountDaninhas);
  },
};
</script>

<style>
.chartContain {
  height: 400px;
  width: auto;
}
</style>
