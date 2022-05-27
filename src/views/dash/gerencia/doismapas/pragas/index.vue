<template>
  <div class="containReports">
    <v-popup-image
      v-if="toolkit.viewImage == true"
      :imagem="toolkit.imagemSRC"
      @closepopup="handleClose()"
    />
    <div class="watchPragas">
      <div class="">
        <!-- mark 12052020 pragas-->
        <div class="boxPadrao">
          <div class="contain2">
            <vMonitor :lista="pragas" />

            <div class="">
              <img
                class="impressora"
                src="@/assets/icons/impressora.png"
                alt="imprimir"
                :class="{
                  opacity:
                    search.idProducao == '' ||
                    search.dataPrevista == '' ||
                    search.dataInicial == '' ||
                    pragas.length < 1,
                }"
                @click="sendImpress(pragas)"
              />
            </div>
          </div>
          <div class="g4">
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
        </div>
      </div>
    </div>
          <v-container class="grey lighten-5 rounded-lg" >
            <v-row no-gutters>
              <v-col cols="1" md="6">
                <v-card class="pa-1 ma-6 rounded-lg" elevation="20">
                  <v-view-map  :lista="pragas" />    
                </v-card>
              </v-col>
              <v-col cols="1" md="6">
                <v-card class="pa-1 ma-6 rounded-lg" elevation="20">
                   <v-view-map2 :lista="pragas" />
                  </v-card>
              </v-col>                
             </v-row>
          </v-container>

        <br/>
          <!-- <lineChart
            :options="{ responsive: true, maintainAspectRatio: false }"
            :item="GET_LISTA"
            v-if="showChart == true"
          /> -->
          <v-container class="grey lighten-5 rounded-lg" >
            <v-row no-gutters>
              <v-col cols="1" md="6">
                <v-card class="pa-1 ma-4 rounded-lg" elevation="20">
                <div class="titlecard"><button  class="btncard">PRAGAS - 20 dias</button></div>
                 <vChart
                    v-if="showChart == true"
                    :chart-data="this.myDataPragas" 
                    :options="{ responsive: true, maintainAspectRatio: false }"
                  />              
                </v-card>
              </v-col>
              <v-col cols="1" md="6">
                <v-card class="pa-1 ma-4 rounded-lg" elevation="20">
                 <div class="titlecard"><button  class="btncard">DOENÇAS - 20 dias</button></div>
                  <vChart
                    v-if="showChart == true"
                    :chart-data="this.myDataDoencas"
                    :options="{ responsive: true, maintainAspectRatio: false }"
                  />              
                </v-card>
              </v-col>                
             </v-row>

          </v-container>
            <br/>
          <v-container class="grey lighten-5 rounded-lg" >
            <v-row no-gutters>
              <v-col cols="1" md="4">
                <v-card class="pa-1 ma-2 rounded-lg"  elevation="20">
                  <div class="titlecard"><button  class="btncard">PRAGAS - 10 dias</button></div>
                  <bar-chart class="barchart"
                   v-if="showChart == true"
                   :chart-data="this.myDataPragas10"
                    :height="250"
                   :options="{ responsive: true, maintainAspectRatio: false }"
                  ></bar-chart>       
                </v-card>      
              </v-col>
              <v-col cols="1" md="4">
               <v-card class="pa-1 ma-2 rounded-lg" elevation="20">
                <div class="titlecard"><button  class="btncard">DOENÇAS - 10 dias</button></div>
                <bar-chart 
                    v-if="showChart == true"
                    :chart-data="this.myDataDoencas10"
                     :height="250"
                    :options="{ responsive: true, maintainAspectRatio: false }"
                ></bar-chart>       
                </v-card>      
              </v-col>          
              <v-col cols="1" md="4">
               <v-card class="pa-1 ma-2 rounded-lg" elevation="20">
                <div class="titlecard"><button  class="btncard">DANINHAS - 10 dias</button></div>
                <bar-chart 
                   v-if="showChart == true"
                  :chart-data="this.myDataDaninhas10"
                  :height="250"
                  :options="{ responsive: true, maintainAspectRatio: false }"
                ></bar-chart>       
                </v-card>   
               </v-col>                        
             </v-row>

          </v-container>
          <br/>
          <v-container class="grey lighten-5">
            <v-row no-gutters>
              <v-col cols="1" md="4">
                <v-card class="pa-1 ma-2 rounded-lg" elevation="20" >
                   <div class="titlecard"><button  class="btncard">PRAGAS - 10 Dias</button></div>
                      <pie-chart 
                        v-if="showChart == true"
                        :chart-data="this.myDataPragasPie10"
                        :height="250"
                         :options="{ responsive: true, maintainAspectRatio: false }"
                      ></pie-chart> 
                </v-card>
              </v-col>
              <v-col cols="1" md="4">
                <v-card class="pa-1 ma-2 rounded-lg"  elevation="20">
                   <div class="titlecard"><button  class="btncard">DOENÇAS - 10 Dias</button></div>
                      <pie-chart
                         v-if="showChart == true"
                        :chart-data="this.myDataDoencasPie10"
                        :height="250"
                        :options="{ responsive: true, maintainAspectRatio: false }"
                      ></pie-chart>
                </v-card>
              </v-col>
              <v-col cols="1" md="4">
                <v-card class="pa-1 ma-2 rounded-lg"  elevation="20">
                    <div class="titlecard"><button  class="btncard">DANINHAS - 10 Dias</button></div>                  
                    <pie-chart
                      v-if="showChart == true"
                      :chart-data="this.myDataDaninhasPie10"
                      :height="250"
                      :options="{ responsive: true, maintainAspectRatio: false }"
                    >                      
                    </pie-chart>
                </v-card>   
              </v-col>  
            </v-row>  
          </v-container>  
          <br/>
          <!-- container de agrupamento de gráficos Doenças-->
           <v-container class="grey lighten-5">
            <v-row no-gutters>
              <v-col cols="1" md="4">
                <v-card class="pa-1 ma-2 rounded-lg" elevation="20" >
                   <div class="titlecard"><button  class="btncard">V1- DOENÇAS - 5 Dias</button></div>
                      <bar-chart
                        v-if="showChart == true"
                        :chart-data="this.myDataDoencas5"
                        :height="200"
                      ></bar-chart> 
                </v-card>
              </v-col>
              <v-col cols="1" md="4">
                <v-card class="pa-1 ma-2 rounded-lg" elevation="20">
                   <div class="titlecard"><button  class="btncard">V2- DOENÇAS - 5 Dias</button></div>
                      <pie-chart
                        v-if="showChart == true"
                        :chart-data="this.myDataDoencas5"
                        :height="200"
                      ></pie-chart>
                </v-card>
              </v-col>
              <v-col cols="1" md="4">
                <v-card class="pa-1 ma-2 rounded-lg" elevation="20">
                    <div class="titlecard"><button  class="btncard">V3- DOENÇAS - 5 Dias</button></div>                  
                      <vChart
                        v-if="showChart == true"
                        :chart-data="this.myDataDoencas5"
                        :height="200"
                      ></vChart>
                </v-card>   
              </v-col>  
            </v-row>  
          </v-container>

          <!-- Container de agrupamento de gráficos Pragas-->

          <br/>
          <!-- myDataPragas5 é 5 dias-->
           <v-container class="grey lighten-5">
            <v-row no-gutters>
              <v-col cols="1" md="4">
                <v-card class="pa-1 ma-2 rounded-lg"  elevation="20" >
                   <div class="titlecard"><button  class="btncard">V1- PRAGAS - 5 Dias</button></div>
                      <bar-chart 
                        v-if="showChart == true"
                        :chart-data="this.myDataPragas5"
                        :height="200"
                      ></bar-chart> 
                </v-card>
              </v-col>
              <v-col cols="1" md="4">
                <v-card class="pa-1 ma-2 rounded-lg" elevation="20">
                   <div class="titlecard"><button  class="btncard">V2- PRAGAS - 5 Dias</button></div>
                      <pie-chart
                        v-if="showChart == true"
                        :chart-data="this.myDataPragas5"
                        :height="200"
                      ></pie-chart>
                </v-card>
              </v-col>
              <v-col cols="1" md="4">
                <v-card class="pa-1 ma-2 rounded-lg"  elevation="20">
                    <div class="titlecard"><button  class="btncard">V3- PRAGAS - 5 Dias</button></div>                  
                      <vChart
                        v-if="showChart == true"
                        :chart-data="this.myDataPragas5"
                        :height="200"
                      ></vChart>
                </v-card>   
              </v-col>  
            </v-row> 
          </v-container>
          <br/>
           <v-container class="grey lighten-5">
            <v-row no-gutters>
              <v-col cols="1" md="4">
                <v-card class="pa-1 ma-2 rounded-lg" elevation="20" >
                   <div class="titlecard"><button  class="btncard">V1- DANINHAS - 5 Dias</button></div>
                      <bar-chart 
                        v-if="showChart == true"
                        :chart-data="this.myDataDaninhas5"
                        :height="200"
                      ></bar-chart> 
                </v-card>
              </v-col>
              <v-col cols="1" md="4">
                <v-card class="pa-1 ma-2 ounded-lg"  elevation="20">
                   <div class="titlecard"><button  class="btncard">V2- DANINHAS - 5 Dias</button></div>
                      <pie-chart
                        v-if="showChart == true" 
                        :chart-data="this.myDataDaninhas5"
                        :height="200"
                      ></pie-chart>
                </v-card>
              </v-col>
              <v-col cols="1" md="4">
                <v-card class="pa-1 ma-2 rounded-lg"  elevation="20">
                    <div class="titlecard"><button  class="btncard">V3- DANINHAS - 5 Dias</button></div>                  
                      <vChart
                        v-if="showChart == true"
                        :chart-data="this.myDataDaninhas5"
                        :height="200"
                      ></vChart>
                </v-card>   
              </v-col>  
            </v-row>  
          </v-container>

          <div>
                   <l-map style="height: 100px" :zoom="zoom" :center="center">
                  <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                  <l-geo-json :geojson="geojson"></l-geo-json>
               </l-map>
          </div>
        </div>
        
</template>

<script>
import viewMapcopy from "../global/viewMapcopy.vue";
import monitorItem from "../monitorItem";
import moment from "moment";
import viewMap from "../global/mapaDoZero";
import vViewImage from "../global/popupImagem";
import { zoneSP } from "@/mixins/time.js";
import vMonitor from "../monitorGeral";
import vChart from "@/components/vue-chartLine";
import BarChart from "@/components/vue-chartBar";
import PieChart from "@/components/vue-chartPie";


export default {
  name: "pragas",
  components: {
    "v-view-map": viewMap,
    "v-popup-image": vViewImage,
    "v-view-map2": viewMapcopy,
    vMonitor,
    
    // componentes geral @components
    vChart,
    PieChart,
    BarChart,
    
  },
  mixins: [zoneSP],
  data() {
    return {
      menu: false,
      showChart: true,
      name: "",
      carregou: 0,
      modal: false,
      menu2: false,
      toolkit: {
        viewImage: false,
        imagemSRC: "",
      },
      search: {
        idProducao: "",
        dataPrevista: "",
        dataInicial: "",
        idColaborador: "",
      },
      myDataPragas: {
        labels: [],
        datasets: [
          {
            label: "Pragas",
            backgroundColor: "#95C11F",
            data: [],
            borderColor: "#545C21",
            borderWidth: 2
          },
        ],
      },
      // esse myDataDoencas é os dois primeiros gráficos 
       myDataDoencas: {
        labels: [],
        datasets: [
          {
            label: "Doenças",
            backgroundColor: "#0C9947",
            data: [],
            borderColor: "#09692F",
            borderWidth: 2
          },
        ],
      },
      // esses que tem Pie10 significa que é grafico de pizza dos últimos 10 dias
      myDataPragasPie10: {
        labels: [],
        datasets: [
          {
            label: "Pragas",
            // paleta de cores, não consegui fazer o component dentro do chart
            backgroundColor:["#7BB831",
                             "#36B8A0",
                             "#3251B8",
                             "#EDD63B",
                             "#7F5DF0",
                             "#10362F",
                             "#93DB3B",
                             "#E05B43",
                             "#47F5D5",
                             "#F73EED",
                             "#9E4DE0",
                             "#65E0D9"],
            data: [],
            borderColor: "#aaaaaa",
            borderWidth: 2
          },
        ],
      },
      myDataDaninhasPie10: {
        labels: [],
        datasets: [
          {
            label: "Daninhas",
            //paleta de cores
            backgroundColor:["#7BB831",
                             "#36B8A0",
                             "#3251B8",
                            "#EDD63B",
                            "#7F5DF0",
                            "#10362F",
                            "#93DB3B",
                            "#E05B43",
                            "#47F5D5",
                            "#F73EED",
                            "#9E4DE0",
                            "#65E0D9"],
            data: [],
            borderColor: "#aaaaaa",
            borderWidth: 2
          }
        ]
      },
      myDataDoencasPie10: {
        labels: [],
        datasets: [
          {
            label: "Doenças",
            // paleta de cores
            backgroundColor:["#7BB831",
                             "#36B8A0",
                             "#3251B8",
                            "#EDD63B",
                            "#7F5DF0",
                            "#10362F",
                            "#93DB3B",
                            "#E05B43",
                            "#47F5D5",
                            "#F73EED",
                            "#9E4DE0",
                            "#65E0D9"],
            data: [],
            borderColor: "#aaaaaa",
            borderWidth: 2
          },
        ],
      },
      // fim 
      // myDataDaninhas10 é os que tem barra 
      myDataDaninhas10: {
        labels: [],
        datasets: [
          {
            label: "Daninhas",
            backgroundColor: "#005428",
            data: [],
            borderColor: "#31A836",
            borderWidth: 2
          }
        ]
      },
      myDataPragas10: {
        labels: [],
        datasets: [
          {
            label: "Pragas",
            backgroundColor: "#95C11F",
            data: [],
            borderColor: "#545C21",
            borderWidth: 2
          },
        ],
      },
      myDataDoencas10: {
        labels: [],
        datasets: [
          {
            label: "Doenças",
            backgroundColor: "#0C9947",
            data: [],
            borderColor: "#09692F",
            borderWidth: 2
          }
        ]
      },
      // myDataDoencas são os de 5 dias 
      myDataDoencas5: {
        labels: [],
        datasets: [
          {
            label: "Doenças",
            backgroundColor:["#7BB831",
                             "#36B8A0",
                             "#3251B8",
                             "#EDD63B",
                             "#7F5DF0",
                             "#10362F"],  
            data: [],
            borderColor: "#aaaaaa",
            borderWidth: 3
          },
        ],
      },
      // myDataPragas5 5 dias 
      myDataPragas5: {
        labels: [],
        datasets: [
         {
           label: "Pragas",
           backgroundColor:  ["#7BB831",
                             "#36B8A0",
                             "#3251B8",
                             "#EDD63B",
                             "#7F5DF0",
                             "#10362F"],  
           data: [],
           borderColor: "#aaaaaa",
           borderWidth: 3
         },
        ]
      },
      myDataDaninhas5: {
        labels: [],
        datasets: [
          {
            label: "Daninhas",
            backgroundColor: ["#7BB831",
                             "#36B8A0",
                             "#3251B8",
                             "#EDD63B",
                             "#7F5DF0",
                             "#10362F"],  
           data: [],
           borderColor: "#aaaaaa",
           borderWidth: 3
          },
        ]
      },
      // O doc
      myDataBar10: {
        labels: ["01/02,", "02/02", "03/02", "04/02", "05/02,", "06/02", "07/02", "08/02", "09/02", "10/02" ]
      },
      lineChart: {
        labels: ["Médio", "Alta", "Grave"],
        datasets: [
          {
            label: "Pragas", 
            backgroundColor: "#95C11F",
            borderColor: "#545C21",
            data: [3, 2, 5],
          },
          {
            label: "Doenças",
            backgroundColor: "#0C9947",    
            borderColor: "#09692F",
            data: [6, 3, 4]
          },
            {
            label: "Daninhas",
            backgroundColor: "#005428",  
            borderColor: "#31A836",
          
          }
        ],
      },
      chartDataPie: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        datasets: [
          {
            backgroundColor: ["#95C11F", "#0C9947", "#005428"],
            data: [],
          }
        ]
      }
    };
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    GET_DOENCAS() {
      let bin2 = this.$store.getters["fazenda/GET_DOENCAS"];
      let tratamento2 = bin2
        .slice()
        .sort((a, b) => b.dados.createdTimestamp - a.dados.createdTimestamp);
      return tratamento2;
    },
    GET_PRAGAS_NUMEROS() {
      let bin = this.$store.getters["fazenda/GET_PRAGAS"];
      let tratamento = bin
        .slice()
        .sort((a) => a.dados.nivel);
      return tratamento;
    },
    GET_PRAGAS() {
      let bin = this.$store.getters["fazenda/GET_PRAGAS"];
      let tratamento = bin
        .slice()
        .sort((a, b) => b.dados.createdTimestamp - a.dados.createdTimestamp);
      return tratamento;
    },
    GET_DANINHAS() {
      let bin = this.$store.getters["fazenda/GET_DANINHAS"];
      let tratamento = bin 
        .slice()
        .sort((a, b) => b.dados.createdTimestamp - a.dados.createdTimestamp);
      return tratamento;
    },
    filtrosOK() {
      if (
        this.search.idProducao == "" ||
        this.search.dataPrevista == "" ||
        this.search.dataInicial == ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    
    producoes() {
      return this.$store.getters["fazenda/GET_PRODUCOES"];
    },
    colaboradores() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    },
    pragas() {
      let self = this;
      let response1 = this.$store.getters["fazenda/GET_PRAGAS"].filter(
        (item) => {
          let db = String(item.dados.idProducao);
          let query = String(self.search.idProducao);
          if (query == db || query == "") {
            return true;
          } else {
            return false;
          }
        }
      );
      let response2 = response1.filter((item) => {
        if (
          item.dados.idColaborador == this.search.idColaborador ||
          this.search.idColaborador == ""
        ) {
          return true;
        } else {
          return false;
        }
      });

      let response3 = response2.filter((item) => {
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
      return response3.reverse();
    },
  },
  mounted() {
    // ja monta com o componente
    this.showChart = true;
    var now = moment().format("YYYY-MM-DD");
    this.search.dataInicial = moment()
      .subtract(10, "days")
      .format("YYYY-MM-DD");
    this.search.dataPrevista = now;
  },
  beforeMount() {
    // antes de ja montar o componente
    // fazendo consulta no getters da store olha no vuedevtools antes de mountar o componente
    this.listaPragas = this.$store.getters["fazenda/GET_PRAGAS"];
    this.listaDoencas = this.$store.getters["fazenda/GET_DOENCAS"];
    this.listaDaninhas = this.$store.getters["fazenda/GET_DANINHAS"];
    // os dois primeiros graficos
    this.GERAR_TABELAS_CHART_PRAGAS(1);
    this.GERAR_TABELAS_CHART_DOENCAS(1);
    // esse de baixo pega os cinco dias e vai subtraindo
    this.GERAR_TABELAS_CHART_PRAGAS_CINCO_DIAS(1);
    // de baixo é os charts com dez dias antes
    this.GERAR_TABELAS_CHART_PRAGAS_DEZ_DIAS(1);
    this.GERAR_TABELAS_CHART_DANINHAS_DEZ_DIAS(1);
    this.GERAR_TABELAS_CHART_DANINHAS_CINCO_DIAS(1);
    // os últimos graficos
    this.GERAR_TABELAS_CHART_DOENCAS_DEZ_DIAS(1);
    this.GERAR_TABELAS_CHART_DOENCAS_CINCO_DIAS(1);

    // graficos pai 
    this.GERAR_DOENCAS_CHART_PIE(1);
    this.GERAR_PRAGAS_CHART_PIE(1);
    this.GERAR_DANINHAS_CHART_PIE(1);
  },
  methods: {
  FILTRAR_DOENCAS_DATA(databin) {
    let promessa = this.listaDoencas.filter(item => {
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
  // graficos pizza = pie
  FILTRAR_PRAGAS_CHART_PIE(databin) {
    let promessa = this.listaPragas.filter(item => {
      let timestamp;
      if (!item.dados.createdTimestamp) {
        timestamp = moment()
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
  FILTRAR_DOENCAS_CHART_PIE(databin) {
    let promessa = this.listaDoencas.filter(item => {
      let timestamp;
      if (!item.dados.createdTimestamp) {
        timestamp = moment()
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
  FILTRAR_DANINHAS_CHART_PIE(databin) {
    let promessa = this.listaDaninhas.filter(item => {
      let timestamp;
      if (!item.dados.createdTimestamp) {
        timestamp = moment()
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
  // fim  

  
  FILTRAR_PRAGAS_DATA(databin) {
    let promessa = this.listaPragas.filter(item => {
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
  FILTRAR_DANINHAS_DEZ_DIAS(databin) {
    // basicamente ele ta criando uma promessa de que vai vir esses dados do vuex
    // esse lista basicamente foi o que defini em cima tambem tem o listaDaninhas
    let promessa = this.listaDaninhas.filter(item => {
      // pegando da listaPragas
      let timestamp;
      // createdTimestamp esta vindo do getters vuex
      if(!item.dados.createdTimestamp) {
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
  FILTRAR_PRAGAS_DEZ_DIAS(databin) {
    let promessa = this.listaPragas.filter(item => {
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
  FILTRAR_PRAGAS_CINCO_DIAS(databin) {
     let promessa = this.listaPragas.filter(item => {
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
  FILTRAR_DOENCAS_DEZ_DIAS(databin) {
     let promessa = this.listaDoencas.filter(item => {
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
  FILTRAR_DOENCAS_CINCO_DIAS(databin) {
     let promessa = this.listaDoencas.filter(item => {
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
  FILTRAR_DANINHAS_CINCO_DIAS(databin) {
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
  GERAR_DOENCAS_CHART_PIE(c) {
    if(c == 1) {
       let i = 10;
        let arrayToChart = [];
        for (i; i >= 0; i--) {
          let mono = moment().subtract(i, "days");
          let databin = mono.format("DD/MM/YYYY");       
          this.myDataDoencasPie10.labels.push(databin);

          let doencasAtivadaspie =this.FILTRAR_DOENCAS_CHART_PIE(databin);
          
          let valt = doencasAtivadaspie.length;
          arrayToChart.push(valt);
          if (i == 1) {
            this.carregou = 1;
            this.myDataDoencasPie10.datasets[0].data = arrayToChart;
            this.carregou = 2;
            this.showChart = true;
          }
        }

        if (this.carregou == 1) {

        }
      }
  },
  GERAR_PRAGAS_CHART_PIE(l) {
    if(l == 1) {
       let i = 10;
        let arrayToChart = [];
        for (i; i >= 0; i--) {
          let mono = moment().subtract(i, "days");
          let databin = mono.format("DD/MM/YYYY");

          this.myDataPragasPie10.labels.push(databin);

          let pragasAtivadaspie = this.FILTRAR_PRAGAS_CHART_PIE(databin);
          
          let valt = pragasAtivadaspie.length;
          arrayToChart.push(valt);
          if (i == 1) {
            this.carregou = 1;
            this.myDataPragasPie10.datasets[0].data = arrayToChart;
            this.carregou = 2;
            this.showChart = true;
          }
        }

        if (this.carregou == 1) {

        }
      }
  },
  GERAR_DANINHAS_CHART_PIE(o) {
    if(o == 1) {
       let i = 10;
        let arrayToChart = [];
        for (i; i >= 0; i--) {
          let mono = moment().subtract(i, "days");
          let databin = mono.format("DD/MM/YYYY");

          this.myDataDaninhasPie10.labels.push(databin);

          let daninhasAtivadaspie = this.FILTRAR_DANINHAS_CHART_PIE(databin);
          
          let valt = daninhasAtivadaspie.length;
          arrayToChart.push(valt);
          if (i == 1) {
            this.carregou = 1;
            this.myDataDaninhasPie10.datasets[0].data = arrayToChart;
            this.carregou = 2;
            this.showChart = true;
          }
        }

        if (this.carregou == 1) {

        }
      }
    },
    GERAR_TABELAS_CHART_PRAGAS(n) {
      if (n == 1) {
        let i = 20;
        let arrayToChart = [];
        for (i; i >= 0; i--) {
          let mono = moment().subtract(i, "days");
          let databin = mono.format("DD/MM/YYYY");
          
          this.myDataPragas.labels.push(databin);

          let pragasAtivados = this.FILTRAR_PRAGAS_DATA(databin);
          
          let valt = pragasAtivados.length;
          arrayToChart.push(valt);
          if (i == 1) {
            this.carregou = 1;
            this.myDataPragas.datasets[0].data = arrayToChart;
            this.carregou = 2;
            this.showChart = true;
          }
        }

        if (this.carregou == 1) {
            
        }
      }
    },
      GERAR_TABELAS_CHART_DOENCAS(x) {
        if (x == 1) {
        let i = 21;
        let arrayToChart = [];
        for (i; i >= 0; i--) {
          let mono = moment().subtract(i, "days");
          let databin = mono.format("DD/MM/YYYY");
          
          this.myDataDoencas.labels.push(databin)

          let doencasAtivadas = this.FILTRAR_DOENCAS_DATA(databin);
          
          let valt = doencasAtivadas.length;
          arrayToChart.push(valt);
          if (i == 1) {
            this.carregou = 1;
            this.myDataDoencas.datasets[0].data = arrayToChart;
            this.carregou = 2;
            this.showChart = true;
          }
        }

        if (this.carregou == 1) {

        }
      }
    },
    GERAR_TABELAS_CHART_PRAGAS_DEZ_DIAS(b) {
      if (b == 1) {
         let i = 11;
         let arrayToChart = [];
          for (i; i >= 0; i--) {
            let mono = moment().subtract(i, "days");
            let databin = mono.format("DD/MM/YYYY");
            
            this.myDataPragas10.labels.push(databin)

            let pragasAtivadas10dias = this.FILTRAR_PRAGAS_DEZ_DIAS(databin);
            
            let valt = pragasAtivadas10dias.length;
            arrayToChart.push(valt);
            if (i == 1) {
              this.carregou = 1;
              this.myDataPragas10.datasets[0].data = arrayToChart;
              this.carregou = 2;
              this.showChart = true;
            }
         }

          if (this.carregou == 1) {
        
        }
      }
    },
     GERAR_TABELAS_CHART_DANINHAS_DEZ_DIAS(f) {
      if (f == 1) {
         let i = 11;
         let arrayToChart = [];
          for (i; i >= 0; i--) {
            let mono = moment().subtract(i, "days");
            let databin = mono.format("DD/MM/YYYY");
            
            this.myDataDaninhas10.labels.push(databin)

            let daninhasAtivadas10dias = this.FILTRAR_DANINHAS_DEZ_DIAS(databin);
            
            let valt = daninhasAtivadas10dias.length;
            arrayToChart.push(valt);
            if (i == 1) {
              this.carregou = 1;
              this.myDataDaninhas10.datasets[0].data = arrayToChart;
              this.carregou = 2;
              this.showChart = true;
            }
         }

          if (this.carregou == 1) {
        
        }
      }
    },
    GERAR_TABELAS_CHART_DANINHAS_CINCO_DIAS(p) {
       if (p == 1) {
        let i = 5;
        let arrayToChart = [];
        for (i; i >= 0; i--) {
          let mono = moment().subtract(i, "days");
          let databin = mono.format("DD/MM/YYYY");
          
          this.myDataDaninhas5.labels.push(databin)

          let daninhasAtivadas = this.FILTRAR_DANINHAS_CINCO_DIAS(databin);
          
          let valt = daninhasAtivadas.length;
          arrayToChart.push(valt);
          if (i == 1) {
            this.carregou = 1;
            this.myDataDaninhas5.datasets[0].data = arrayToChart;
            this.carregou = 2;
            this.showChart = true;
          }
        }

        if (this.carregou == 1) {
        
        }
      }
    },
    GERAR_TABELAS_CHART_PRAGAS_CINCO_DIAS(z) {
       if (z == 1) {
        let i = 5;
        let arrayToChart = [];
        for (i; i >= 0; i--) {
          let mono = moment().subtract(i, "days");
          let databin = mono.format("DD/MM/YYYY");
          
          this.myDataPragas5.labels.push(databin)

          let pragasAtivadas = this.FILTRAR_PRAGAS_CINCO_DIAS(databin);
          
          let valt = pragasAtivadas.length;
          arrayToChart.push(valt);
          if (i == 1) {
            this.carregou = 1;
            this.myDataPragas5.datasets[0].data = arrayToChart;
            this.carregou = 2;
            this.showChart = true;
          }
        }

        if (this.carregou == 1) {
        
        }
      }
    },
    GERAR_TABELAS_CHART_DOENCAS_CINCO_DIAS(y) {
      if(y == 1) {
        let i = 5;
        let arrayToChart = [];
        for (i; i >= 0; i--) {
          let mono = moment().subtract(i, "days");
          let databin = mono.format("DD/MM/YYYY");

          this.myDataDoencas5.labels.push(databin)

          let doencasAtivadas5dias = this.FILTRAR_DOENCAS_CINCO_DIAS(databin);

          let valt = doencasAtivadas5dias.length;
          arrayToChart.push(valt);
          if (i == 1) {
            this.carregou = 1;
            this.myDataDoencas5.datasets[0].data = arrayToChart;
            this.carregou = 2;
            this.showChart = true;
          }
        }

        if (this.carregou == 1) {

        }
      }
    },
     GERAR_TABELAS_CHART_DOENCAS_DEZ_DIAS(a) {
      if(a == 1) {
        let i = 11;
        let arrayToChart = [];
        for (i; i >= 0; i--) {
          let mono = moment().subtract(i, "days");
          let databin = mono.format("DD/MM/YYYY");

          this.myDataDoencas10.labels.push(databin)

          let doencasAtivadas10dias = this.FILTRAR_DOENCAS_DEZ_DIAS(databin);

          let valt = doencasAtivadas10dias.length;
          arrayToChart.push(valt);
          if (i == 1) {
            this.carregou = 1;
            this.myDataDoencas10.datasets[0].data = arrayToChart;
            this.carregou = 2;
            this.showChart = true;
          }
        }

        if (this.carregou == 1) {

        }
      }
    },
    // carregar a impressora
    
  sendImpress() {
  // chama method
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
      if (this.pragas.length < 1) {
        window.alert("Não há itens na lista para ser impresso");
        return false;
      }
      const pay = {
        dataInicial: this.search.dataInicial,
        dataPrevista: this.search.dataPrevista,
        idProducao: this.search.idProducao,
        idColaborador: this.search.idColaborador,
      };

      this.$store.commit("SET_IMPRESS_LIST", this.pragas);
      this.$store.commit("SET_IMPRESS_DATABIN", pay);
      this.$store.commit("SET_IMPRESS_TYPE", "relatorio-pragas");
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
  }
};
</script>

<style lang="scss" scoped>

.searchs {
  padding: 20px;
}


  .chartcontain2 {
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 0.5fr;
  grid-gap: 15px;
}
.g4 {
  display: grid;
  grid-gap: 1px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  input {
    max-width: 100px;
    &[type="date"] {
      max-width: 150px;
      padding-right: 0px;
      padding-left: 0px;
      text-align: center;
    }
  }
}

  .titlecard {
    button.btncard {
      padding: 10px 14px;
      background-color: #3DCE00;
      
      border-radius: 6px;
      color: white;
      display: inline-block;
      margin: 4px;
      border: none;
      &:hover {
        cursor: pointer;
      }
    }
  }

.box {
  margin-top: 26px;
  padding: 10px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(36, 125, 17, 1) 35%,
    rgba(36, 125, 17, 1) 100%
  );
}

.impressora {
  width: 60px;
  height: 60px;
}



.mapa {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
  padding-bottom: 25px;
  grid-template-areas:
    "a a a a b b b b"
    "a a a a b b b b";
}
.mapaum {
  grid-area: a;

}
.mapadois {
  grid-area: b;

}

#mapa {
  width: 100%;
  height: 700px;
}

.contain2 {
  display: grid;
  margin-left: 50px;
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

@media (max-width: 1400px) {
  #mapa {
    width: 1000px;
    height: 1000px;
  }
  #mapa {
    width: 1000px;
    height: 1000px;
  }
}

</style>

