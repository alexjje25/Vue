<template>
  <div>
    <v-popup-image
      v-if="toolkit.viewImage == true"
      :imagem="toolkit.imagemSRC"
      @closepopup="handleClose()"
    />
    <div class="monitoramentoArmadilhas">
      <div class="contentBOX">
        <div class="tituloContent header">
          <div v-if="review.status == false">
            <div class="pragaCount">
              RESULTADOS
              <div class="sizeUP">{{ armadilhas.length }}</div>
            </div>
          </div>
          <div v-if="review.status == true">
            <div class="pragaCount">
              RESULTADOS
              <div class="sizeUP">{{ GET_REVIEW_TRAPS.length }}</div>
            </div>
          </div>
        </div>

        <div v-if="review.status == true">
          <vBtn
            name="VOLTAR"
            cor-primaria="rgb(0,0,0,1)"
            cor-secundaria="rgb(50,50,50,1)"
            @handle="review.status = false"
          />
          <div>
            <img
              v-if="false"
              class="impressora"
              src="@/assets/icons/impressora.png"
              alt="imprimir"
              :class="{
                opacity:
                  search.idProducao == '' ||
                  search.dataPrevista == '' ||
                  search.dataInicial == '' ||
                  armadilhas.length < 1
              }"
              @click="sendImpress(GET_REVIEW_TRAPS)"
            />
          </div>
          <div v-if="GET_REVIEW_TRAPS.length == 0" class="naoContem">
            Não contém monitoramento
          </div>
          <div class="listaReview">
            <vReviews :lista="GET_REVIEW_TRAPS" />
          </div>
        </div>

        <div v-if="review.status == false">
          <!-- class= buscador g2 -->
          <div class="boxPadrao centralizaTudo buscaUI">
            <div>
              <select v-model="search.idProducao">
                <option value="">PRODUÇÃO</option>
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
              <select v-model="search.idColaborador">
                <option value="">COLABORADOR</option>
                <option
                  v-for="(colab, index) in colaboradores"
                  :key="index"
                  :value="colab.chave"
                >
                  {{ colab.dados.name }}
                </option>
              </select>
            </div>
            <div v-if="false">
              DATA INICIAL<br />
              <input v-model="search.dataInicial" type="date" />
            </div>
            <div v-if="false">
              DATA FINAL <br />
              <input v-model="search.dataPrevista" type="date" />
            </div>
          </div>

          <div class="lista">
            <v-item-list
              v-for="(item, index) in armadilhas"
              :key="index"
              :item="item"
              @handleView="handleOpen"
              @handleReviews="handleReviews"
            ></v-item-list>
          </div>
        </div>
      </div>

      <v-view-map class="mapa" :lista="armadilhas" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import viewMap from "./viewMap";
import vItemLista from "./itemList";
import vReviews from "./reviews/index";
import vBtn from "@/components/dash/btnIconMini";

export default {
  filters: {
    filtraTimestamp(val) {
      return moment(val).format("DD/MM/YYYY");
    },
    filtraColaborador(val) {
      let bin = this.GET_COLABORADORES.find(item => item.chave == val);
      return bin.dados.nome;
    }
  },
  components: {
    vReviews,
    vBtn,
    "v-view-map": viewMap,
    "v-item-list": vItemLista
  },
  data() {
    return {
      review: {
        status: false,
        chave: ""
      },
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
    GET_REVIEW_TRAPS() {
      let rw = this.review.chave;
      let matrix = this.$store.getters["fazenda/GET_REVIEW_TRAPS"].filter(
        item => item.dados.idArmadilhaMonitoramento == rw
      );
      return matrix.reverse();
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
    armadilhas() {
      let self = this;
      let response1 = this.$store.getters["fazenda/GET_TRAPS"].filter(item => {
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
      return response2.reverse();
    },
    colaboradores() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    },
    GET_NIVEL_AUTH() {
      return this.$store.getters["auth/GET_NIVEL_AUTH"];
    }
  },
  mounted() {
    //var now = moment().format("YYYY-MM-DD");
    this.search.dataInicial = moment()
      .subtract(15, "days")
      .format("YYYY-MM-DD");
    //this.search.dataPrevista = now;
    this.search.dataPrevista = moment()
      .add(15, "days")
      .format("YYYY-MM-DD");
  },
  methods: {
    handleReviews(chave) {
      this.review.chave = chave;
      this.review.status = true;
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
      if (this.armadilhas.length < 1) {
        window.alert("Não há itens na lista para ser impresso");
        return false;
      }
      const pay = {
        dataInicial: this.search.dataInicial,
        dataPrevista: this.search.dataPrevista,
        idProducao: this.search.idProducao,
        idColaborador: this.search.idColaborador
      };

      this.$store.commit("SET_IMPRESS_LIST", this.armadilhas);
      this.$store.commit("SET_IMPRESS_DATABIN", pay);
      this.$store.commit("SET_IMPRESS_TYPE", "relatorio-armadilhas");
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
@import "./style/padrao.scss";
@import "./style/lista.scss";
.watchArmadilhas {
  .contentBOX {
    margin: 10px;
  }
}
.header {
  img {
    width: 65px;
    height: 65px;
  }
  & > div {
    align-items: center;
    align-self: center;
    align-content: center;
    & > div {
      margin: 5px;
    }
    &:nth-child(2n) {
      text-align: right;
    }
  }
}
.boxPadrao {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
  margin: 5px;
}
.buscaUI {
  padding: 20px 10px;
}
</style>
