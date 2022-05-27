<template>
  <div class="templateRegistros marginPadrao">
    <div class="boxPadrao">
      <div class="menuInterativo centralizaTudo">
        <div>
          <btnVoltar
            name="VOLTAR"
            :icon="require('@/assets/icons/voltar.png')"
            cor-primaria="#c49e00"
            cor-secundaria="#d8d200"
            @handle="fechar()"
          />
        </div>
        <div>
          <select v-model="filtros.colaborador">
            <option value="todos">COLABORADORES</option>
            <option
              v-for="(item, index) in GET_COLABORADORES"
              :key="index"
              :value="item.chave"
              >{{ item.dados.name }}</option
            >
          </select>
        </div>
        <div>
          <img src="@/assets/icons/ico_inicio.png" />
          <input v-model="filtros.dataInicial" type="date" />
        </div>
        <div>
          <img src="@/assets/icons/ico_final.png" />
          <input v-model="filtros.dataFinal" type="date" />
        </div>
      </div>
    </div>

    <div class="filtros"></div>

    <v-lista class="mainList" :lista="GET_ESTOQUELOG" />
  </div>
</template>

<script>
import vLista from "./lista";
import moment from "moment";
import btnVoltar from "@/components/dash/btnIconMini";

export default {
  components: {
    vLista,
    btnVoltar
  },
  props: {
    registro: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      filtros: {
        colaborador: "todos",
        dataInicial: "",
        dataFinal: ""
      }
    };
  },
  computed: {
    GET_COLABORADORES() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    },
    GET_ESTOQUELOG() {
      let self = this;
      let result1 = this.$store.getters["fazenda/GET_ESTOQUELOG"].filter(
        item => {
          if (item.dados.idProduto == this.registro) {
            return true;
          }
        }
      );
      let result2 = result1.filter(item => {
        let itemData = item.dados.created;
        let buscaInicial = moment(self.filtros.dataInicial).subtract(1, "d");
        let buscaFinal = moment(self.filtros.dataPrevista).add(1, "d");
        let entreData = moment(itemData).isBetween(buscaInicial, buscaFinal);
        if (
          entreData == true ||
          self.filtros.dataInicial == "" ||
          self.filtros.dataInicial == null
        ) {
          return true;
        } else {
          return false;
        }
      });
      return result2.filter(item => {
        if (
          item.dados.colaborador == self.filtros.colaborador ||
          self.filtros.colaborador == "todos"
        ) {
          return true;
        }
      });
    }
  },
  mounted() {
    //let dataDiasAntes = moment().format("YYYY-MM-DD");
    this.filtros.dataInicial = moment()
      .subtract(15, "d")
      .format("YYYY-MM-DD");
    this.filtros.dataFinal = moment()
      .add(1, "d")
      .format("YYYY-MM-DD");
  },
  methods: {
    fechar() {
      this.$emit("handle", "sair");
    }
  }
};
</script>

<style lang="scss" scoped>
.menuInterativo {
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr;
  grid-gap: 10px;
  & > div {
    display: grid;
    grid-template-columns: auto 1fr;
    img {
      width: 50px;
    }
  }
}
.filtros {
  input[type="date"] {
    width: 150px;
    text-align: center !important;
    padding: 5px;
  }
}
</style>
