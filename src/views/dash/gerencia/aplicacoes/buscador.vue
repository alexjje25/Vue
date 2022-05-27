<template>
  <div>
    <div class="grid g5">
      <div v-if="mode == 'aplicacoes'">
        <select
          v-model="search.monitoramento"
          @change="emmitSEARCH($event, 'searchMonitoramento')"
        >
          <option value="pragas">Monit. Pragas</option>
          <option value="daninhas">Monit. Daninhas</option>
          <option value="doencas">Monit. Doenças</option>
        </select>
      </div>
      <div>
        <select
          v-model="search.idProducao"
          @change="emmitSEARCH($event, 'searchProducao')"
        >
          <option value="">PRODUÇÃO</option>
          <option
            v-for="(item, index) in GET_PRODUCOES"
            :key="index"
            :value="item.chave"
          >
            {{ item.dados.name }}
          </option>
        </select>
      </div>
      <div>
        <select
          v-model="search.idColaborador"
          @change="emmitSEARCH($event, 'searchColaborador')"
        >
          <option value="">COLABORADOR</option>
          <option
            v-for="(colab, index) in GET_COLABORADORES"
            :key="index"
            :value="colab.chave"
          >
            {{ colab.dados.name }}
          </option>
        </select>
      </div>
      <div>
        <input
          v-model="search.dataInicial"
          type="date"
          @change="emmitSEARCH($event, 'searchDataInicial')"
        />
      </div>
      <div>
        <input
          v-model="search.dataPrevista"
          type="date"
          @change="emmitSEARCH($event, 'searchDataFinal')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    mode: {
      type: String,
      default: "aplicacoes"
    }
  },
  data() {
    return {
      search: {
        monitoramento: "pragas",
        idProducao: "",
        idColaborador: "",
        dataInicial: "",
        dataFinal: ""
      }
    };
  },
  computed: {
    GET_COLABORADORES() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    },
    GET_PRODUCOES() {
      return this.$store.getters["fazenda/GET_PRODUCOES"];
    }
  },
  mounted() {
    let self = this;
    var now = moment().format("YYYY-MM-DD");
    this.search.dataInicial = moment()
      .subtract(10, "days")
      .format("YYYY-MM-DD");
    this.search.dataPrevista = now;
    this.$emit("SEARCH_UPDATE", {
      type: "searchDataInicial",
      value: self.search.dataInicial
    });
    this.$emit("SEARCH_UPDATE", {
      type: "searchDataFinal",
      value: self.search.dataPrevista
    });
  },
  methods: {
    emmitSEARCH(event, param) {
      if (param == "searchProducao") {
        this.$emit("SEARCH_UPDATE", {
          type: "searchProducao",
          value: event.target.value
        });
      } else if (param == "searchColaborador") {
        this.$emit("SEARCH_UPDATE", {
          type: "searchColaborador",
          value: event.target.value
        });
      } else if (param == "searchDataInicial") {
        this.$emit("SEARCH_UPDATE", {
          type: "searchDataInicial",
          value: event.target.value
        });
      } else if (param == "searchDataFinal") {
        this.$emit("SEARCH_UPDATE", {
          type: "searchDataFinal",
          value: event.target.value
        });
      } else if (param == "searchMonitoramento") {
        this.$emit("SEARCH_UPDATE", {
          type: "searchMonitoramento",
          value: event.target.value
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  &.g5 {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>
