<template>
  <div class="papel">
    <div class="header">
      <div class="left">
        <img class="logo" src="@/assets/icons/logo.png" />
      </div>
      <div class="right">
        <div>FAZENDA: {{ FAZENDA_NAME }}</div>
        <div>PROPRIETÁRIO: {{ FAZENDA_PROPRIETARIO }}</div>
        <div>LOCALIZAÇÃO: {{ FAZENDA_GPS.x }}, {{ FAZENDA_GPS.y }}</div>
      </div>
    </div>
    <h2 class="tt center grande">PRODUÇÃO</h2>
    <fieldset>
      <div class="g3 sectProducao">
        <div class="g3 center">
          <div>
            <div class="tt">Nome</div>
            <div class="dd">{{ lista[0].dados.nomeProducao }}</div>
          </div>
          <div>
            <div class="tt">Cultivar</div>
            <div
              v-for="(prod, index) in producoes.filter(
                item => item.chave == lista[0].dados.idProducao
              )"
              :key="index"
              class="dd"
            >
              {{ prod.dados.cultivar }}
            </div>
          </div>
          <div>
            <div class="tt">Semente</div>
            <div
              v-for="(prod, index) in producoes.filter(
                item => item.chave == lista[0].dados.idProducao
              )"
              :key="index"
              class="dd"
            >
              {{ prod.dados.semente }}
            </div>
          </div>
        </div>
        <div class="center">
          <img class="pragaIMG" src="@/assets/icons/daninha.png" />
        </div>
        <div class="dataFiltrada center">
          <div class="calendarioTitulo">FILTRADO POR DATA:</div>
          <div class="calendario1">
            <div class="tt">Data Inicial</div>
            <div class="dd">{{ bin.dataInicial }}</div>
          </div>
          <div class="calendario2">
            <div class="tt">Data Final</div>
            <div class="dd">
              {{ bin.dataPrevista }}
            </div>
          </div>
        </div>
      </div>
    </fieldset>

    <h2 class="tipoRelatorio tt">RELATÓRIO DE DANINHAS</h2>
    <div class="lista">
      <div class="itemHeader">
        <div>DANINHA</div>
        <div>ESTÁGIO</div>
        <div>OBSERVACAO</div>
        <div>COLAB.</div>
        <div>GPS</div>
      </div>
      <div v-for="(list, index) in lista" :key="index" class="item">
        <div>{{ list.dados.especie }}</div>
        <div>{{ list.dados.estagio.nome }}</div>
        <div>{{ list.dados.observacao }}</div>
        <div>
          {{ list.dados.idColaborador }} -
          <div
            v-for="(colab, index) in colaboradores.filter(
              item => item.chave == list.dados.idColaborador
            )"
            :key="index"
          >
            {{ colab.dados.name }}
          </div>
        </div>
        <div>{{ list.dados.coord.lat }}, {{ list.dados.coord.long }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    },
    FAZENDA_NAME() {
      return this.$store.state.fazenda.minhaFazenda.nome;
    },
    FAZENDA_PROPRIETARIO() {
      return this.$store.state.fazenda.minhaFazenda.idProprietario; //rever
    },
    FAZENDA_GPS() {
      return this.$store.state.fazenda.minhaFazenda.coord;
    },
    FAZENDA_HECTARES() {
      return this.$store.state.fazenda.minhaFazenda.hectares;
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
@import "./global";
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
.g3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
.header {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  margin-bottom: 5px;
  .right {
    font-size: 12px;
    text-align: left;
    align-content: center;
    align-items: center;
    align-self: center;
    font-weight: 900;
  }
  .left {
    .logo {
      width: 200px;
    }
  }
}
//210mm
$maxRANGE: 2fr;
$padraoLista: 70mm 25mm 65mm 25mm 25mm;
.lista {
  font-size: 8px;
  .itemHeader {
    display: grid;
    grid-template-columns: $padraoLista;
    & > div {
      border-left: 1px solid silver;
      border-bottom: 1px solid silver;
      padding: 2px;
      font-weight: 900;
    }
  }
  .item {
    display: grid;
    grid-template-columns: $padraoLista;
    font-size: 12px;
    & > div {
      border-left: 1px solid silver;
      padding: 2px;
    }
    &:nth-child(2n) {
      background-color: rgba(245, 245, 245, 1);
    }
  }
}
</style>
