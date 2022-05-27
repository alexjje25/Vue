<template>
  <div>
    <vPopupImage
      v-if="toolkit.viewImage == true"
      :imagem="toolkit.imagemSRC"
      @closepopup="handleClose()"
    />
    <div class="listaRevs">
      <div
        v-for="(item, index) in lista"
        :key="index"
        class="boxPadrao itemReview"
      >
        <div class="objeto">
          <v-imagem :imagem="item.dados.imgMonitoramento" @handle="ViewIMAGE" />
        </div>
        <div class="objeto">
          <div class="titulo">DATA:</div>
          <div class="contexto">
            {{ item.dados.createdTimestamp | formataData }}
          </div>
        </div>
        <div class="objeto">
          <div class="titulo">ESPÉCIE:</div>
          <div class="contexto">
            <vEspecieName
              referencia="ARMADILHAS"
              :chave="item.dados.estagio.especie"
            />
          </div>
        </div>
        <div class="objeto">
          <div class="titulo">Colaborador:</div>
          <div
            v-for="(colab, index) in GET_COLABORADORES.filter(
              bin => bin.chave == item.dados.idColaborador
            )"
            :key="index"
            class="contexto"
          >
            {{ colab.dados.name }}
          </div>
        </div>
        <div class="objeto">
          <div class="titulo">OBSERVAÇÃO:</div>
          <div class="contexto">{{ item.dados.observacao }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { dateFormat } from "@/mixins/time.js";
import vPopupImage from "./popupImagem";
import vImagem from "./imagem";
import vEspecieName from "@/components/dash/monitoramentos/idEspecieForName";
export default {
  filters: {
    filtraColaborador(val) {
      let bin = this.GET_COLABORADORES.find(item => item.chave == val);
      return bin.dados.nome;
    }
  },
  components: {
    vPopupImage,
    vImagem,
    vEspecieName
  },
  mixins: [dateFormat],
  props: ["lista"],
  data() {
    return {
      toolkit: {
        viewImage: false,
        imagemSRC: ""
      }
    };
  },
  computed: {
    GET_COLABORADORES() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    }
  },
  methods: {
    handleClose() {
      this.toolkit.imagemSRC = "";
      this.toolkit.viewImage = false;
    },
    ViewIMAGE(imagem) {
      this.toolkit.imagemSRC = imagem;
      this.toolkit.viewImage = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.listaRevs {
  display: flex;
  flex-wrap: auto;
}
.itemReview {
  padding: 10px;
  margin: 5px;
  .objeto {
    padding: 5px;
    .titulo {
      font-weight: 100;
    }
    .contexto {
      font-weight: 900;
    }
  }
}
</style>
