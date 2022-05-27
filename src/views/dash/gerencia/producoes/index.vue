<template>
  <div class="marginPadrao">
    <div class="lista boxPadrao b centralizaTudo">
      <div class="item itemHeader centralizaTudo">
        <div>Nome</div>
        <div>Cultivar</div>
        <div>Semente</div>
        <div>Início</div>
        <div>Previsão</div>
        <div>Tamanho</div>
        <div>Talhao</div>
      </div>
      <div
        v-for="(item, index) in producao"
        :key="index"
        class="item centralizaTudo"
      >
        <div>
          <button
            v-if="GET_NIVEL == 99"
            class="rootBtn"
            @click="removeThis(item.chave)"
          >
            REMOVER
          </button>
          {{ item.dados.name }}
        </div>
        <div>{{ item.dados.cultivar }}</div>
        <div>
          <vSemente :chave="item.dados.semente" />
        </div>
        <div>{{ item.dados.dataInicialTIME | converteTime }}</div>
        <div>{{ item.dados.previstaTIME | converteTime }}</div>
        <div>{{ item.dados.size }}</div>
        <div>
          <vTalhao :chave="item.dados.talhao" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { GET_NIVEL } from "@/mixins/global";
import { servProducoes } from "@/database.js";
import vSemente from "@/components/itemEstoqueName";
import vTalhao from "@/components/idTalhaoPorNome";

export default {
  components: {
    vSemente,
    vTalhao
  },
  filters: {
    converteTime: function(value) {
      if (!value) return "nao atribuido";
      let data = new Date(value);
      let dia = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
      let markMes = data.getMonth() + 1;
      let mes = markMes < 10 ? "0" + markMes : markMes;
      let ano = data.getFullYear();
      let response = dia + "/" + mes + "/" + ano;
      return response;
    }
  },
  mixins: [GET_NIVEL],
  data() {
    return {
      search: {
        dataPrevista: "",
        dataInicial: ""
      }
    };
  },
  computed: {
    talhoes() {
      return this.$store.getters["fazenda/GET_TALHOES"];
    },
    producao() {
      return this.$store.getters["fazenda/GET_PRODUCOES"];
    }
  },
  mounted() {
    var now = moment().format("YYYY-MM-DD");
    this.search.dataInicial = now;
    this.search.dataPrevista = now;
  },
  methods: {
    removeThis(chave) {
      servProducoes.child(chave).remove();
    }
  }
};
</script>

<style lang="scss" scoped>
.b {
  max-width: 1200px;
}
.lista {
  .item {
    display: grid;
    grid-template-columns: repeat(7, minmax(120px, 1fr));
    font-weight: 100;
    text-align: left;
    padding: 0px 4px;
    margin: 0px;
    box-sizing: content-box;
    &.itemHeader {
      font-weight: normal;
    }
    &:nth-child(2n) {
      background-color: rgba(50, 50, 50, 0.1);
    }
    & > div {
      //border-left: 1px solid rgba(205, 205, 205, 0.9);
      padding: 10px;
      box-sizing: border-box;
    }
    div.urgencia {
      color: black;
      &.sim {
        color: red;
        font-weight: bolder;
      }
    }
  }
}
</style>
