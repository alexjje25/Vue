<template>
  <div>
    <div class="charts">
      <div>
        <div class="chartContain">
          <vChart
            :chart-data="this.myData"
            :options="{ responsive: true, maintainAspectRatio: false }"
            v-if="showChart == true"
          />
        </div>
      </div>
      <div class="lista">
        <div style="padding:20px"></div>
        <div>
          <b>Clientes cadastrados {{ GET_CLIENTES.length }}</b>
        </div>
        <div class="listaClientes">
          <div v-for="(item, index) in GET_CLIENTES" :key="index" class="item">
            <div v-if="showmore == item.chave" class="details">
              <div>
                <b>Nº {{ index + 1 }}</b>
              </div>
              <div>
                <div style="color:rgba(70,70,70,1)">
                  CHAVE: {{ item.chave }}
                </div>
              </div>
              <div class="b">{{ item.dados.nome }}</div>
              <div>{{ item.dados.acesso.email }}</div>
              <div>{{ item.dados.telefone1 }}</div>
              <div>{{ item.dados.telefone2 }}</div>
              <div class="endereco">
                <div>
                  MUNICIPIO:
                  <b>{{ item.dados.endereco.municipio }}</b>
                </div>
                <div>
                  BAIRRO:
                  <b>{{ item.dados.endereco.bairro }}</b>
                </div>
                <div>
                  RUA:
                  <b>{{ item.dados.endereco.rua }}</b>
                </div>
                <div>
                  CEP:
                  <b>{{ item.dados.endereco.cep }}</b>
                </div>
                <div>
                  COMPLEMENTO:
                  <b>{{ item.dados.endereco.complemento }}</b>
                </div>
              </div>
            </div>
            <div v-else class="minimal">
              {{ item.dados.createdTimestamp | retrievDate }} -
              {{ item.dados.nome }} -
              {{ item.dados.acesso.email }}
              <button @click="SET_SHOWMORE(item.chave)">Mostrar mais</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import vChart from "@/components/vue-chartLine";
export default {
  components: {
    vChart
  },
  filters: {
    retrievDate: function(value) {
      let old = Number(value);
      return moment(old).format("DD/MM/YYYY");
    }
  },
  data() {
    return {
      showmore: false,
      showChart: true,
      carregou: 0,
      myData: {
        labels: [],
        datasets: [
          {
            label: "Clientes Novos",
            backgroundColor: "rgba(00,141,54,0.2)",
            data: [],
            borderColor: "rgb(00,141,54)",
            borderWidth: 2
          }
        ]
      },
      myDataSchool: {
        labels: [],
        datasets: [
          {
            label: "Alunos Novos",
            backgroundColor: "rgba(00,141,54,0.2)",
            data: [],
            borderColor: "rgb(00,141,54)",
            borderWidth: 2
          }
        ]
      },
      mySeries: [{ values: [] }],
      listaClientes: []
    };
  },
  computed: {
    GET_CLIENTES() {
      let bin = this.$store.getters["admin/GET_CLIENTES"];
      let tratamento = bin
        .slice()
        .sort((a, b) => b.dados.createdTimestamp - a.dados.createdTimestamp);
      return tratamento;
    }
  },
  mounted() {
    this.showChart = true;
    //this.fillData();
  },
  beforeMount() {
    //let hoje = moment().format("DD/MM/YYYY");
    //let datas = moment()
    //.format("DD/MM/YYYY")
    //.subtract(15, "days");
    this.listaClientes = this.$store.getters["admin/GET_CLIENTES"];
    this.GERAR_TABELAS_CHART(1);

    //window.console.log(this.mySeries[0].values);
    /*setTimeout(() => {
      this.calendarioReviews.push(response);
    }, 1000);*/

    /* modelo valores
    let response = {
      values: []
    };

    let i = 15;
    for (i; i > 0; i--) {
      let mono = moment().subtract(i, "days");
      let databin = mono.format("DD/MM/YYYY");
      response.values.push(databin);
    }
    setTimeout(() => {
      this.calendarioReviews.push(response);
    }, 1000);

    */
  },
  methods: {
    SET_SHOWMORE(payload) {
      this.showmore = payload;
    },
    FILTRAR_CLIENTES_DATA(databin) {
      let promessa = this.listaClientes.filter(item => {
        let timestamp;
        if (!item.dados.createdTimestamp) {
          timestamp = moment();
          //window.console.log("Não contém timestamp", item.chave);
        } else {
          timestamp = Number(item.dados.createdTimestamp);
          //window.console.log("contem timestamp", item.chave);
        }
        let definite = moment(timestamp).format("DD/MM/YYYY");
        //window.console.log(definite + "?==?" + databin);
        if (definite == databin) {
          //window.console.log(definite + " é igual " + databin);
          return true;
        } else {
          return false;
        }
      });
      return promessa;
    },
     GERAR_TABELAS_CHART(n) {
      if (n == 1) { 
        let i = 30;
        let arrayToChart = [];
        for (i; i >= 0; i--) {
          let mono = moment().subtract(i, "days");
          let databin = mono.format("DD/MM/YYYY");
          //this.myData.scaleX.labels.push(databin);
          this.myData.labels.push(databin);

          let clientesAtivados = this.FILTRAR_CLIENTES_DATA(databin);

          let valt = clientesAtivados.length;
          arrayToChart.push(valt);
          if (i == 1) {
            this.carregou = 1;
            //window.console.log("CARREGIY", arrayToChart, this.myData.labels);
            this.myData.datasets[0].data = arrayToChart;
            this.carregou = 2;
            this.showChart = true;
          }
        }

        if (this.carregou == 1) {
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.chartContain {
  //padding: 20px;
  margin: 20px;
}
.charts {
  display: grid;
  grid-template-columns: minmax(400px, 1fr) 1fr;
}
.lista {
  text-align: left;

  .listaClientes {
    max-height: 500px;
    overflow: scroll;
  }

  .item {
    padding: 20px;
    border-bottom: 1px solid silver;
    .b {
      font-weight: 600;
    }
    .endereco {
      margin: 12px;
      border-top: 2px solid rgba(170, 170, 170, 0.3);
      border-bottom: 2px solid rgba(170, 170, 170, 0.3);
      background-color: rgba(170, 170, 170, 0.1);
      padding: 10px;
      border-radius: 5px;
      &::before {
        content: "ENDEREÇO";
        position: absolute;
        margin-top: -22px;
        margin-left: 4px;
        background-color: rgba(210, 210, 210, 1);
        padding: 4px 10px;
        border-radius: 5px;
      }
      div {
        padding: 4px;
        margin: 0px;
      }
    }
  }
}
</style>
