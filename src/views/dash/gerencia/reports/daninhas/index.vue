<template>
  <div class="containReports">
    <v-popup-image
      v-if="toolkit.viewImage == true"
      :imagem="toolkit.imagemSRC"
      @closepopup="handleClose()"
    />
    <div class="watchDaninhas">
      <!-- mark 12052020 daninhas -->
      <!-- <div class="contentBOX">
        <div class="buscador g6" :data-count="daninhas.length">
          <div>
            PRODUÇÃO:<br />
            <select v-model="search.idProducao">
              <option value="">TODOS</option>
              <option
                v-for="(item, index) in producoes"
                :key="index"
                :value="item.chave"
              >
                {{ item.dados.name }}
              </option>
            </select>
          </div>
          <div>
            COLABORADOR:<br />
            <select v-model="search.idColaborador">
              <option value="">TODOS</option>
              <option
                v-for="(colab, index) in colaboradores"
                :key="index"
                :value="colab.chave"
              >
                {{ colab.dados.name }}
              </option>
            </select>
          </div>
          <div>
            DATA INICIAL<br />
            <input v-model="search.dataInicial" type="date" />
          </div>
          <div>
            DATA FINAL <br />
            <input v-model="search.dataPrevista" type="date" />
          </div>
          <div>
            <div class="pragaCount">
              RESULTADOS
              <div class="sizeUP">{{ daninhas.length }}</div>
            </div>
          </div>
          <div>
            <img
              class="impressora"
              src="@/assets/icons/impressora.png"
              alt="imprimir"
              :class="{
                opacity:
                  this.search.idProducao == '' ||
                  this.search.dataPrevista == '' ||
                  this.search.dataInicial == '' ||
                  this.daninhas.length < 1
              }"
              @click="sendImpress(daninhas)"
            />
          </div>
        </div>

        <div class="lista">
          <v-item-list
            v-for="(item, index) in daninhas"
            :key="index"
            :item="item"
            @handleView="handleOpen"
          ></v-item-list>
        </div>
      </div>

      <v-view-map class="mapa" :lista="daninhas" />
      -->
      <div class="contentBOX">
        <!-- mark 12052020 daninhas-->
        <div class="boxPadrao">
          <div class="contain2 centralizaTudo">
            <vMonitor :lista="daninhas" />
            <div class="centralizaTudo">
              <img
                class="impressora"
                src="@/assets/icons/impressora.png"
                alt="imprimir"
                :class="{
                  opacity:
                    search.idProducao == '' ||
                    search.dataPrevista == '' ||
                    search.dataInicial == '' ||
                    daninhas.length < 1
                }"
                @click="sendImpress(daninhas)"
              />
            </div>
          </div>
          <div class="searchs g4 centralizaTudo">
            <div>
              PRODUÇÃO:<br />
              <select v-model="search.idProducao">
                <option value="">TODOS</option>
                <option
                  v-for="(item, index) in producoes"
                  :key="index"
                  :value="item.chave"
                >
                  {{ item.dados.name }}
                </option>
              </select>
            </div>
            <div>
              COLABORADOR:<br />
              <select v-model="search.idColaborador">
                <option value="">TODOS</option>
                <option
                  v-for="(colab, index) in colaboradores"
                  :key="index"
                  :value="colab.chave"
                >
                  {{ colab.dados.name }}
                </option>
              </select>
            </div>
            <div>
              DATA INICIAL<br />
              <input v-model="search.dataInicial" type="date" />
            </div>
            <div>
              DATA FINAL <br />
              <input v-model="search.dataPrevista" type="date" />
            </div>
          </div>
                  <bar-chart class="barchart"
                      v-if="showChart == true"
                      :chart-data="this.myDataDaninhas20"
                      :options="{ responsive: true, maintainAspectRatio: false }"
                      :height="180"
                 ></bar-chart>   
        </div>
        <div class="lista">
          <v-item-list
            v-for="(item, index) in daninhas"
            :key="index"
            :item="item"
            server="daninhas"
            @handleView="handleOpen"
          ></v-item-list>
        </div>
      </div>
      <v-view-map class="mapa" :lista="daninhas" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import vItemList from "../global/itemList";
import viewMap from "../global/viewMap";
import vViewImage from "../global/popupImagem";
import { zoneSP } from "@/mixins/time.js";
import vMonitor from "../monitorGeral";
import BarChart from "@/components/vue-chartBar";


export default {
  components: {
    "v-view-map": viewMap,
    "v-item-list": vItemList,
    "v-popup-image": vViewImage,
    vMonitor,
    BarChart
  },
  mixins: [zoneSP],
  data() {
    return {
      toolkit: {
        viewImage: false,
        imagemSRC: ""
      },
      showChart: true,
      carregou: 0,
      search: {
        idProducao: "",
        dataPrevista: "",
        dataInicial: "",
        idColaborador: ""
      },
       myDataDaninhas20: {
        labels: [],
        datasets: [
          {
            label: "Daninhas - 20 Dias",
            backgroundColor: "#95C11F",
            data: [],
            borderColor: "#545C21",
            borderWidth: 2
          },
        ],
      },
    };
  },
  computed: {
    producoes() {
      return this.$store.getters["fazenda/GET_PRODUCOES"];
    },
    daninhas() {
      let self = this;
      let response1 = this.$store.getters["fazenda/GET_DANINHAS"].filter(
        item => {
          let db = String(item.dados.idProducao);
          let query = String(self.search.idProducao);
          if (query == db || query == "") {
            return true;
          } else {
            return false;
          }
        }
      );
      let response2 = response1.filter(item => {
        if (
          item.dados.idColaborador == this.search.idColaborador ||
          this.search.idColaborador == ""
        ) {
          return true;
        } else {
          return false;
        }
      });

      let response3 = response2.filter(item => {
        let itemData = self.zoneSP(item.dados.created);
        let buscaInicial = moment(self.search.dataInicial).subtract(1, "d");
        let buscaFinal = moment(self.search.dataPrevista).add(1, "d");
        let resultado1 = moment(itemData).isBetween(buscaInicial, buscaFinal);
        if (
          resultado1 == true ||
          this.search.dataInicial == "" ||
          this.search.dataInicial == null
        ) {
          return true;
        } else {
          return false;
        }
      });
      //window.console.log("computed daninhas"); descontinuado
      //this.$store.commit("fazenda/SET_LISTA_PRAGA_GLOBAL", response3);
      return response3.reverse();
    },
    colaboradores() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    },
    GET_NIVEL_AUTH() {
      return this.$store.getters["auth/GET_NIVEL_AUTH"];
    }
  },
  mounted() {
    this.showChart = true;
    var now = moment().format("YYYY-MM-DD");
    this.search.dataInicial = moment()
      .subtract(10, "days")
      .format("YYYY-MM-DD");
    this.search.dataPrevista = now;
  },
  methods: {
   FILTRAR_DANINHAS_VINTE_DIAS(databin) {
    let promessa = this.listaDaninhas.filter(item => {
      let timestamp;
      if (!item.dados.createdTimestamp) {
        timestamp = moment();
      } else {
        timestamp = Number(item.dados.createdTimestamp);
      }
      let definite = moment(timestamp).format("DD/MM/YYYY");

      if (definite == databin) {
        return true;  
      } else {
        return false;
      }
    });
    return promessa;
  },
   GERAR_TABELAS_CHART_DANINHAS_VINTE_DIAS(b) {
      if (b == 1) {
         let i = 20;
         let arrayToChart = [];
          for (i; i >= 0; i--) {
            let mono = moment().subtract(i, "days");
            let databin = mono.format("DD/MM/YYYY");
            
            this.myDataDaninhas20.labels.push(databin)

            let daninhasAtivadas20dias = this.FILTRAR_DANINHAS_VINTE_DIAS(databin);
            
            let valt = daninhasAtivadas20dias.length;
            arrayToChart.push(valt);
            if (i == 1) {
              this.carregou = 1;
              this.myDataDaninhas20.datasets[0].data = arrayToChart;
              this.carregou = 2;
              this.showChart = true;
            }
         }

          if (this.carregou == 1) {
        
        }
      }
    },
    sendImpress() {
      if (this.search.idProducao == "") {
        window.alert("Selecione uma produção para criar o relatorio");
        return false;
      }
      if (this.search.dataPrevista == "") {
        window.alert("Selecione a data prevista para criar o relatorio");
        return false;
      }
      if (this.search.dataInicial == "") {
        window.alert("Selecione a data inicial para criar o relatorio");
        return false;
      }
      if (this.daninhas.length < 1) {
        window.alert("Não há itens na lista para ser impresso");
        return false;
      }
      const pay = {
        dataInicial: this.search.dataInicial,
        dataPrevista: this.search.dataPrevista,
        idProducao: this.search.idProducao,
        idColaborador: this.search.idColaborador
      };

      this.$store.commit("SET_IMPRESS_LIST", this.daninhas);
      this.$store.commit("SET_IMPRESS_DATABIN", pay);
      this.$store.commit("SET_IMPRESS_TYPE", "relatorio-daninhas");
      this.$store.commit("SET_IMPRESS", true);
    },
    handleOpen(src) {
      this.toolkit.viewImage = true;
      this.toolkit.imagemSRC = src;
    },
    handleClose() {
      this.toolkit.viewImage = false;
      this.toolkit.imagemSRC = "";
    }
  },
    beforeMount() {
    this.listaDaninhas = this.$store.getters["fazenda/GET_DANINHAS"];
    this.GERAR_TABELAS_CHART_DANINHAS_VINTE_DIAS(1);
  }
};
</script>

<style lang="scss" scoped>
@import "../global/style/padrao.scss";
@import "../global/style/lista.scss";

.searchs {
  padding: 20px;
}
.g4 {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  input {
    max-width: 100px;
    &[type="date"] {
      max-width: 160px;
      padding-right: 0px;
      padding-left: 0px;
      text-align: center;
    }
  }
}
.contain2 {
  display: grid;
  grid-template-columns: auto 1fr;
  & > div {
    align-items: center;
    align-self: center;
    align-content: center;
    & > div {
      margin: 5px;
    }
  }
}
</style>
