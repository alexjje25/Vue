<template>
  <div class="papel">
    <vHeader />
    <h2 class="tt center grande">
      DADOS DE FILTRAGEM
    </h2>
    <fieldset>
      <div class="centralizaTudo">
        RELATÓRIO DE TAREFAS
      </div>
      <div class="sectProducao">
        <div class="g4 center">
          <div>
            <div class="bold">SETOR</div>
            <div>{{ bin.setor | existe }}</div>
          </div>
          <div>
            <div class="bold">COLABORADOR</div>
            <div>{{ bin.colaborador | existe }}</div>
          </div>
          <div>
            <div class="bold">PRODUÇÃO</div>
            <div>{{ bin.producao | existe }}</div>
          </div>
          <div>
            <div class="bold">STATUS</div>
            <div>{{ bin.estado | existe }}</div>
          </div>
        </div>
      </div>
    </fieldset>

    <h2 class="tipoRelatorio tt">RELATÓRIO DE PRAGAS</h2>
    <div class="lista">
      <div v-for="(list, index) in lista" :key="index" class="item">
        <div class="itemDivs">
          <div>
            <b>STATUS</b><br />
            <p>{{ list.dados.status | statusName }}</p>
          </div>
          <div>
            <b>URGENTE</b><br />
            <p>{{ list.dados.urgente | trueFalse }}</p>
          </div>
          <div>
            <b>TAREFA</b><br />
            <p>{{ list.dados.titulo }}</p>
          </div>
          <div>
            <b>COLABORADOR</b><br />
            <vColaborador :chave="list.dados.idColaborador" />
          </div>
          <div>
            <b>PERIODO</b><br />
            <p>{{ list.dados.periodo }}</p>
          </div>
          <div>
            <b>SETOR</b><br />
            <p>{{ list.dados.setor }}</p>
          </div>
          <div>
            <b>PRODUCAO</b><br />
            <vProducao :chave="list.dados.idProducao" />
          </div>
        </div>
        <div class="itemDescricao">
          <b>DESCRIÇÃO</b>
          <div>
            <p>{{ list.dados.descricao }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from "./header";
import vColaborador from "@/components/idColaboradorPorNome";
import vProducao from "@/components/idProducaoPorNome";

export default {
  components: {
    vHeader,
    vColaborador,
    vProducao
  },
  filters: {
    existe: function(valor) {
      return valor == "" ? "todos" : valor;
    },
    statusName: function(valor) {
      if (valor == 0) return "AGUARDANDO";
      else if (valor == 1) return "EXECUTANDO";
      else if (valor == 2) return "FINALIZADO";
      else if (valor == 3) return "NÃO FEITO";
      else return "[ERRO] STATUS INDEFINIDO";
    },
    trueFalse: function(valor) {
      if (valor == true || valor == "true") {
        return "Sim";
      } else {
        return "Não";
      }
    }
  },
  computed: {
    producoes() {
      return this.$store.getters["fazenda/GET_PRODUCOES"];
    },
    colaboradores() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    },
    bin() {
      return this.$store.getters["GET_IMPRESS_DATABIN"];
    },
    lista() {
      return this.$store.getters["GET_IMPRESS_LIST"];
    }
  },
  destroyed() {
    this.$store.commit("SET_IMPRESS_DATABIN", "");
    this.$store.commit("GET_IMPRESS_LIST", []);
    this.$store.commit("SET_IMPRESS", false);
  }
};
</script>

<style lang="scss" scoped>
$maxRANGE: 2fr;
$padraoLista: repeat(8, 26.25mm);
$padraoLista: 20mm 15mm 40mm 40mm 30mm 30mm 25mm;
@import "./global";
.bold {
  font-weight: 600;
}
.dataFiltrada {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas: "calendt calendt" "calend1 calend2";
  text-align: center;
  align-self: center;
  align-content: center;
  align-items: center;
  align-self: center;
  .calendarioTitulo {
    grid-area: calendt;
    text-align: center;
    align-self: center;
    align-content: center;
    align-items: center;
    align-self: center;
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    color: #336535;
  }
  .calendario1 {
    grid-area: calend1;
  }
  .calendario2 {
    grid-area: calend2;
  }
}
.pragaIMG {
  width: 50px;
}
.papel {
  width: 210mm;
}
.grande {
  font-size: 20px;
}
.center {
  text-align: center;
  text-align: center;
  align-self: center;
  align-content: center;
  align-items: center;
  align-self: center;
}
.g4 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.g2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  align-self: center;
  align-content: center;
  align-items: center;
  align-self: center;
}
.sectProducao {
  padding: 6px;
}
.tipoRelatorio {
  text-align: center;
  padding: 14px;
}
fieldset {
  border: 2px solid #336535;
  border-radius: 10px;
  h2 {
    font-weight: 900;
    text-align: center;
    margin: 5px;
    padding: 5px;
  }
}
//210mm

.lista {
  font-size: 8px;
  .itemHeader {
    display: grid;
    grid-template-columns: $padraoLista;
    & > div {
      border-left: 1px solid rgba(170, 170, 170, 0.2);
      border-bottom: 1px solid rgba(170, 170, 170, 0.2);
      padding: 2px;
      font-weight: 900;
    }
  }
  .item {
    font-size: 12px;
    .itemDivs {
      display: grid;
      grid-template-columns: $padraoLista;
    }
    .itemDescricao {
      border-bottom: 1px solid silver;
    }
    & > div {
      padding: 2px;
    }
    &:nth-child(2n) {
      background-color: rgba(245, 245, 245, 1);
    }
  }
}
</style>
