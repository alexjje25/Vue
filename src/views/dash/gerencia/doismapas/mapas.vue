<template>
    <div class="reports">
    <div class="UIrota">
      <div class="menu">
        <router-link to="/dash/gerencia/mapas/pragas">
          <img src="@/assets/icons/rurall-51.png" />
          <div class="item1">Pragas 
          </div>
        </router-link>
        <router-link to="/dash/gerencia/mapas/doencas">
          <img src="@/assets/icons/rurall-52.png" />
          <div class="item2">Doenças</div>
        </router-link>
        <router-link to="/dash/gerencia/mapas/daninhas">
          <img src="@/assets/icons/rurall-53.png" />
          <div class="item3">Daninhas</div>
        </router-link>
        <div class="item4">
        </div>
        <a v-if="false">
          <img src="@/assets/icons/rurall-54.png" />
          <div>Alerta</div>
        </a>
      </div>
         <div class="teste">
          <div class="mapaum">
              <v-view-map :lista="doencas" />
          </div>
          <div class="mapadois">
              <v-view-map2 :lista="pragas" />
          </div>
        </div>
        <div class="box">
        </div>
    </div>
        <div class="charts">
          <pie-chart></pie-chart>
          <line-chart></line-chart>
          <bar-chart ></bar-chart>
        </div>
  </div>
    
</template>

<script>
import moment from "moment";
import viewMapcopy from "./global/viewMapcopy.vue";
import viewMap from "./global/viewMap";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";
import { zoneSP } from "@/mixins/time.js";

export default {
  components: {
    "v-view-map": viewMap,
    "v-view-map2": viewMapcopy,
    PieChart,
    LineChart,
    BarChart,
  },
  mixins: [zoneSP],
  data() {
    return {
      menu: false,
      modal: false,
      menu2: false,
      showChart: false,
      toolkit: {
        viewImage: false,
        imagemSRC: ""
      },
      search: {
        idProducao: "",
        dataPrevista: "",
        dataInicial: "",
        idColaborador: ""
      }
    };
  },
  computed: {
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
      let response1 = this.$store.getters["fazenda/GET_PRAGAS"].filter(item => {
        let db = String(item.dados.idProducao);
        let query = String(self.search.idProducao);
        if (query == db || query == "") {
          return true;
        } else {
          return false;
        }
      });
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

      return response3.reverse();
    }
  },
  mounted() {
    var now = moment().format("YYYY-MM-DD");
    this.search.dataInicial = moment()
      .subtract(10, "days")
      .format("YYYY-MM-DD");
    this.search.dataPrevista = now;
  },
  methods: {
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
      if (this.pragas.length < 1) {
        window.alert("Não há itens na lista para ser impresso");
        return false;
      }
      const pay = {
        dataInicial: this.search.dataInicial,
        dataPrevista: this.search.dataPrevista,
        idProducao: this.search.idProducao,
        idColaborador: this.search.idColaborador
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
@import "./global/style/padrao.scss";
@import "./global/style/lista.scss";

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
   .item1 {
      display: flex;
    }

.teste{
  display: grid;
  grid-area: mapa;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
  grid-auto-rows: 312px;
  width: 100%;
  grid-template-areas:
  "a a a a b b b b"
  "a a a a b b b b";
  align-items: start;
}
.mapaum {
  grid-area: a;
}
.mapadois {
  grid-area: b;
  margin-top: 44px;
}
/*
.mapatres {
  grid-area: c;
}


.mapaquatro {
  grid-area: d;
  background-color: rgb(57, 134, 71);
}

*/

.box {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background: #031900;
}

.w3-green {
  height:30px;
  width:100%;
}
.reports {
  height: 100%;
  width: 100%;
  background-color: white;

  .UIrota {
   .flex-item {
    align-items: center;
    justify-content: space-evenly;
    flex-direction: colunm;
    width: 50%;
  }

    .menu {
      display: flex;
      justify-content: center;
    }

    a {
      margin: 5px;
      background-color: rgb(57, 134, 71);
      color: white;
      text-decoration: none;
      font-weight: 900;
      display: inline-block;
      border-radius: 5px;
      text-align: center;
      align-content: center;
      align-items: center;
      align-self: center;
      display: inline-grid;
      grid-template-columns: auto 1fr;
      padding: 10px;
      & > div {
        padding: 10px;
      }
      img {
        width: auto;
        height: 35px;
        display: inline-block;
      }
      &.router-link-active {
        background-color: #031900;
      }
    }
  }
  .charts {
    display: grid;
    grid-template-columns: auto auto auto;
    width: 13;
  }

}
</style>
