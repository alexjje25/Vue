<template>
  <div>
    <vPopup
      v-if="viewImage == true"
      :imagem="imagemSRC"
      @closepopup="handleClose()"
    />
    <div class="boxPadrao busca">
      <div class="centralizaTudo menuTT">Selecione o período</div>
      <div class="dual">
        <div class="centralizaTudo">
          <div>Período Inicial</div>
          <v-date-picker
            v-model="dataInicial"
            color="red lighten-1"
          ></v-date-picker>

          <!--<date-picker
              :calendarClass="cssCalend"
              :language="ptBR"
              :inline="true"
              v-model="dataInicial"
              class="datapickCustom"
            />-->
        </div>
        <div class="centralizaTudo">
          <div>Período final</div>
          <div>
            <v-date-picker
              v-model="dataFinal"
              color="green lighten-1"
              header-color="primary"
            ></v-date-picker>
            <!-- <date-picker :language="ptBR" :inline="true" v-model="dataFinal" />-->
          </div>
        </div>
      </div>
    </div>
    <div class="minilist centralizaTudo">
      <div class="item" v-for="(item, index) in GPS_COLAB" :key="index">
        <div>
          <modoPontoGPS :modo="item.dados.modo" />
        </div>
        <div>{{ item.dados.dataDia }}</div>
        <div>
          <v-imagem :imagem="item.dados.imgPonto" @handle="handleOpen" />
        </div>
        <div>{{ item.dados.coord.lat }}</div>
        <div>{{ item.dados.coord.long }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { dateFormat, timeFormat } from "@/mixins/time";
import { zoneSP } from "@/mixins/time.js";
import { ptBR } from "vuejs-datepicker/dist/locale";
import modoPontoGPS from "@/components/dash/modoPontoGPS";
import vImagem from "./imagem";
import vPopup from "./popupImagem";

export default {
  mixins: [dateFormat, timeFormat, zoneSP],
  props: ["colaborador"],
  components: {
    modoPontoGPS,
    vImagem,
    vPopup
  },
  data() {
    return {
      imagemSRC: "",
      viewImage: "",
      dataInicial: "",
      dataFinal: "",
      ptBR: ptBR,
      cssCalend: "calendar"
    };
  },
  methods: {
    handleClose() {
      this.viewImage = false;
      this.imagemSRC = "";
    },
    handleOpen(imagem) {
      this.viewImage = true;
      this.imagemSRC = imagem;
    }
  },
  computed: {
    TESTER() {
      const startOfMonth = moment()
        .startOf("month")
        .format("YYYY-MM-DD");
      const endOfMonth = moment()
        .endOf("month")
        .format("YYYY-MM-DD");
      return { inicio: startOfMonth, final: endOfMonth, moubnt: teste };
    },
    GPS_COLAB() {
      let self = this;

      let response1 = this.$store.getters["fazenda/GET_PONTOGPS"].filter(
        item => {
          //necessário
          //let comp = this.dataSelecionada; // FORMATO ATUAL YYYY-MM-DD PADRAO US.
          //let compatibilidade = moment(comp, "YYYY-MM-DD").format("DD/MM/YYYY"); // PADRÃO ATUAL
          //window.console.log(compatibilidade, item.dados.dataDia);
          // ==
          if (
            item.dados.idColaborador ==
            this
              .colaborador /*&&
            item.dados.dataDia == compatibilidade*/
          ) {
            return true;
          }
        }
      );
      //return response1;

      let response2 = response1.filter(item => {
        let itemData = self.zoneSP(Number(item.dados.chave));
        let buscaInicial = moment(self.dataInicial, "YYYY-MM-DD"); //.subtract(1,"d");
        let buscaFinal = moment(self.dataFinal, "YYYY-MM-DD"); //.add(1, "d");
        let resultado1 = moment(itemData).isBetween(buscaInicial, buscaFinal);
        //window.console.table([resultado1, buscaFinal, buscaInicial, itemData]);
        if (
          resultado1 ==
          true /*||
          this.search.dataInicial == "" ||
          this.search.dataInicial == null*/
        ) {
          return true;
        } else {
          return false;
        }
      });

      return response2;
    }
  },
  mounted() {
    this.dataInicial = moment()
      .startOf("month")
      .add("d", 1)
      .format("YYYY-MM-DD");
    this.dataFinal = moment()
      .endOf("month")
      .add("d", 1)
      .format("YYYY-MM-DD");
  }
};
</script>

<style lang="scss" scoped>
.minilist {
  display: grid;
  grid-template-columns: 1fr;
  min-width: 80%;
  width: 80%;
  max-width: 98%;
  box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.2);
  margin: 0 auto;
  .item {
    background-color: white;
    padding: 10px;
    border-top: 5px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    &:nth-child(2n) {
      background-color: rgba(50, 50, 50, 0.051);
    }
  }
}
.busca {
  .menuTT {
    font-size: 22px;
    padding: 10px;
    margin-bottom: 20px;
  }
}
.dual {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.calendar {
  min-width: 600px;
  margin: 15px;
  background-color: red;
}
</style>
