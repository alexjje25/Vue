<template>
  <div class="containReports">
    <v-popup-image
      v-if="toolkit.viewImage == true"
      :imagem="toolkit.imagemSRC"
      @closepopup="handleClose()"
    />
    <div class="watchAlertas">
      <div class="contentBOX">
        <!-- mark 06062020 alertas-->
        <div class="boxPadrao">
          <div class="contain2 centralizaTudo">
            <!--<vMonitor :lista="alertas" /> unable -->

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
          
        </div>
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
                    alertas.length < 1
                }"
                @click="sendImpress(alertas)"
              />
            </div>
        <div class="lista">
          <v-item-list
            v-for="(item, index) in alertas"
            :key="index"
            server="alertas"
            :item="item"
            @handleView="handleOpen"
          ></v-item-list>
          
        </div>
        
      </div>
      <div class="mapa">
        <v-view-map class="compMap" :lista="alertas" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import vItemList from "./global/itemList";
import viewMap from "./global/viewMap";
import vViewImage from "./global/popupImagem";
import { zoneSP } from "@/mixins/time.js";
//import vMonitor from "./monitorGeral";
import { notify } from "@/mixins/notify";

export default {
  components: {
    "v-view-map": viewMap,
    "v-popup-image": vViewImage,
    "v-item-list": vItemList
    //vMonitor
  },
  mixins: [zoneSP, notify],
  data() {
    return {
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
    alertas() {
      let self = this;
      let response1 = this.$store.getters["fazenda/GET_ALERTAS"].filter(
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
      this.setNotify({
        mensagem:
          "RURALL: Esta area de impressão está em testes, por isso desabilitamos nesta area. Estamos trabalhando para lhe dar a melhor precisão.",
        type: "warning"
      });
      return false; // desativar quando em devmode
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
      if (this.alertas.length < 1) {
        window.alert("Não há itens na lista para ser impresso");
        return false;
      }
      const pay = {
        dataInicial: this.search.dataInicial,
        dataPrevista: this.search.dataPrevista,
        idProducao: this.search.idProducao,
        idColaborador: this.search.idColaborador
      };

      this.$store.commit("SET_IMPRESS_LIST", this.alertas);
      this.$store.commit("SET_IMPRESS_DATABIN", pay);
      this.$store.commit("SET_IMPRESS_TYPE", "relatorio-alertas");
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
.opacity {
  opacity: 0.2;
  filter: grayscale(100%);
}
.impressora {
  width: 50px;
  height: 50px;
}
.watchAlertas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  grid-template-areas: "content mapa";
  .contentBOX {
    grid-area: content;
    display: grid;
    grid-template-rows: auto 1fr;
    .boxPadrao {
      width: 90%;
      max-width: 90%;
      margin: 10px auto;
    }
  }
  .mapa {
    grid-area: mapa;
    text-align: right;
    //width: 50vw;
    .mapboxgl-map {
      text-align: center;
      margin: 0 auto;
    }
  }
  @media screen and (max-width: 800px) {
    grid-template-areas: "content" "mapa";
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    .mapa {
      width: 90vw;
      padding: 0px;
      margin: 10px auto;
    }
  }
}
.line {
  display: inline-block;
}
.pragaCount {
  display: inline-block;
  text-align: center;
  padding: 10px;
  font-size: 10px;
  border-radius: 10px;
  background-color: rgba(50, 90, 50, 1);
  color: white;
  .sizeUP {
    font-size: 30px;
    font-weight: 900;
  }
}
.boxPadrao {
  margin: 10px;
  &.g4 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 5px;
  }
}

.lista {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  height: 60vh;
  overflow-y: scroll;
}
.searchs {
  padding: 20px;
}
.g4 {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
