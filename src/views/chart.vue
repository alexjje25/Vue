<script>
import { Line } from "vue-chartjs";
import { mapGetters } from "vuex"

export default {
  extends: Line,
  props: ["chartData", "options", "label", "chartColors", "count"],
  mounted() {
    let isLabels = this.chartData.map((item) => item.data);
    let databin = [1, 2, 1, 2, 1, 4, 2, 1, 1, 6, 3, 1, 6, 3, 1, 6, 3, 1, 6]
    window.console.log("chart data", this.chartData)
    window.console.log("data/label chart.vue", this.count, isLabels);
    // let smart = isLabels.reduce((acc, it) => {
    //   acc[it.data] = acc[it.data] + 1 || 1;
    //   return acc;
    // }, {});
    // window.console.log(smart);
    // smart.forEach((element) => {
    //   totals.push(element);
    // });

    const {
      borderColor,
      pointBorderColor,
      pointBackgroundColor,
      backgroundColor,
    } = this.chartColors;
    setTimeout(() => {
      this.renderChart(
        {
          labels: isLabels,
          datasets: [
            {
              label: this.label,
              data: databin,
              borderColor: borderColor,
              pointBorderColor: pointBorderColor,
              pointBackgroundColor: pointBackgroundColor,
              backgroundColor: backgroundColor,
            },
          ],
        },
        this.options
      );
    }, 3000);
  },
};
</script>

<style></style>
