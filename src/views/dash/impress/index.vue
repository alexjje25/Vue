<template>
  <div class="bgContain" style="background-color:white;">
    <div class="containImpress">
      <button class="buttonTools" @click="SET_IMPRESS(false)">
        FECHAR
      </button>
      GERADO: {{ dataMount }}<br />
      <div class="contain">
        <v-relatorio-pragas v-if="listaType == 'relatorio-pragas'" />
        <v-relatorio-doencas v-if="listaType == 'relatorio-doencas'" />
        <v-relatorio-daninhas v-if="listaType == 'relatorio-daninhas'" />
        <v-relatorio-armadilhas v-if="listaType == 'relatorio-armadilhas'" />
        <v-relatorio-aplicacoes v-if="listaType == 'relatorio-aplicacoes'" />
        <v-relatorio-tarefas v-if="listaType == 'relatorio-tarefas'" />
        <vRelatorioAlerta v-if="listaType == 'relatorio-alertas'" />
      </div>
      <img class="renderRodape" src="@/assets/image/impress-rodape.png" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import vRelatPragas from "./relatPragas";
import vRelatDoencas from "./relatDoencas";
import vRelatDaninhas from "./relatDaninhas";
import vRelatArmadilhas from "./relatArmadilhas";
import vRelatAplicacoes from "./relatAplicacoes";
import vRelatorioTarefas from "./relatTarefas";
import vRelatorioAlerta from "./relatAlerta";
export default {
  components: {
    "v-relatorio-pragas": vRelatPragas,
    "v-relatorio-doencas": vRelatDoencas,
    "v-relatorio-daninhas": vRelatDaninhas,
    "v-relatorio-armadilhas": vRelatArmadilhas,
    "v-relatorio-aplicacoes": vRelatAplicacoes,
    vRelatorioTarefas,
    vRelatorioAlerta
  },
  data() {
    return {
      dataMount: ""
    };
  },
  computed: {
    listaType() {
      return this.$store.getters["GET_IMPRESS_TYPE"];
    }
  },
  mounted() {
    this.creatDate();
  },
  methods: {
    SET_IMPRESS() {
      this.$store.commit("SET_IMPRESS", false);
    },
    creatDate() {
      this.dataMount = moment().format("DD/MM/YYYY HH:mm:ss");
    }
  }
};
</script>

<style lang="scss" scoped>
.bgContain {
  background-color: white;
  z-index: 60;
}
body {
  background-color: white !important;
}
.buttonTools {
  text-align: center;
  margin: 5px;
  padding: 10px 20px;
  background-color: white;
  box-shadow: 1px 1px 4px rgba(40, 40, 40, 0.3);
  background-color: rgb(35, 35, 35);
  color: white;
  font-weight: bolder;
  text-transform: uppercase;
  align-items: center;
  align-content: center;
  text-align: center;
  border: none;
  border-radius: 4px;
  &.icon {
    display: grid;
    grid-template-columns: auto 1fr;
  }
  img {
    display: inline-block;
    width: auto;
    height: 30px;
    margin: 5px;
  }
  &:hover {
    cursor: pointer;
  }
}
.containImpress {
  font-size: 11px;
  width: 210mm;
  background-color: white;
}
@media print {
  .buttonTools {
    display: none;
  }
}
.renderRodape {
  width: 210mm;
}
</style>
