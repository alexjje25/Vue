<template>
  <div>
    <div class="boxPadrao addons centralizaTudo">
      Selecione o dia
      <input type="date" v-model="dataSelecionada" />
    </div>
    <div class="gridTemp">
      <div class="listaPontos" v-if="GPS_COLAB.length > 0">
        <div class="itemPonto" :key="index" v-for="(item, index) in GPS_COLAB">
          <div class="scope">
            <div class="tt">HORÁRIO</div>
            <div class="dd">{{ item.dados.chave | formatHours }}</div>
          </div>

          <div class="scope">
            <div class="tt">Tipo de marcação</div>
            <div class="dd">
              <vModoPonto :modo="item.dados.modo" />
            </div>
          </div>
          <div class="scope">
            <div class="tt">Localização</div>
            <div class="dd">
              <div>Latitude {{ item.dados.coord.lat }},</div>
              <div>Longitude {{ item.dados.coord.long }}</div>
            </div>
          </div>
          <div class="scope">
            <div class="tt">Imagem</div>
            <div class="dd">
              <vImagem :imagem="item.dados.imgPonto" />
            </div>
          </div>
        </div>
      </div>

      <div class="listaPontos mono" v-else>
        Não existe monitoramento GPS desse colaborador
      </div>

      <div class="mapSection">
        <vMap :lista="GPS_COLAB" />
      </div>
    </div>
  </div>
</template>

<script>
import vMap from "./mapboxCustom";
import moment from "moment";
import { dateFormat, timeFormat } from "@/mixins/time";
import vModoPonto from "@/components/dash/modoPontoGPS";
import vImagem from "./imagem";
export default {
  props: ["colaborador"],
  mixins: [dateFormat, timeFormat],
  data() {
    return {
      dataSelecionada: ""
    };
  },
  components: {
    vMap,
    vModoPonto,
    vImagem
  },
  computed: {
    GPS_COLAB() {
      return this.$store.getters["fazenda/GET_PONTOGPS"].filter(item => {
        //necessário
        let comp = this.dataSelecionada; // FORMATO ATUAL YYYY-MM-DD PADRAO US.
        let compatibilidade = moment(comp, "YYYY-MM-DD").format("DD/MM/YYYY"); // PADRÃO ATUAL
        window.console.log(compatibilidade, item.dados.dataDia);
        // ==
        if (
          item.dados.idColaborador == this.colaborador &&
          item.dados.dataDia == compatibilidade
        ) {
          return true;
        }
      });
    }
  },
  mounted() {
    var now = moment().format("YYYY-MM-DD");
    this.dataSelecionada = now;
  }
};
</script>
<style lang="scss" scoped>
.boxPadrao {
  margin: 20px auto;
}
.gridTemp {
  width: 90vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "lista mapa";
  @media screen and (max-width: 1000px) {
    grid-template-areas: "mapa" "lista";
    grid-template-columns: 1fr;
    .listaPontos {
      grid-template-columns: 1fr;
      .itemPonto {
        max-width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}
.mapSection {
  grid-area: mapa;
}
.listaPontos {
  grid-area: lista;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  .itemPonto {
    background-color: white;
    padding: 20px;
    max-width: 200px;
    max-height: auto;
    border-radius: 5px;
    margin: 5px;
    box-shadow: 0px 0px 10px rgba(50, 50, 50, 0.2);
  }
}
</style>
