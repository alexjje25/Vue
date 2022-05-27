<template>
  <div class="box">
    <div class="boxContain">
      <div class="boxHeader">
        <div class="titulo">{{ item.dados.titulo }}</div>
        <button class="impress" @click="impress()">IMPRIMIR</button>
        <button class="close" @click="close()">FECHAR</button>
      </div>
      <div class="boxContent g3">
        <div>
          <div>PRODUTO</div>
          <div><item-estoque-name :chave="item.dados.idEstoque" /></div>
        </div>
        <div>
          <div>PRODUÇÃO</div>
          <div><producao-name :chave="item.dados.idProducao" /></div>
        </div>
        <div>
          <div>TALHÃO</div>
          <div><talhao-name :chave="item.dados.talhao" /></div>
        </div>
        <div>
          <div>DOSAGEM</div>
          <div>{{ item.dados.dosagem }} | {{ item.dados.unidade }}</div>
        </div>
        <div>
          <div>Insumo Categoria</div>
          <div>{{ item.dados.categoria }}</div>
        </div>
        <div>
          <div>COLABORADOR</div>
          <div>
            <colab-name :chave="item.dados.idColaborador" />
          </div>
        </div>
        <div>
          <div class="tt">Veículo</div>
          <div class="dd"><vVeiculo :chave="item.dados.veiculo" /></div>
        </div>
        <div>
          <div class="tt">VELOCIDADE DE APLICAÇÃO (KM/H)</div>
          <div class="dd">
            {{ item.dados.velocidadeAplicacao }}
          </div>
        </div>
        <div>
          <div class="tt">BICO DE PULVERIZAÇÃO</div>
          <div class="dd">{{ item.dados.bicoPulv }}</div>
        </div>
        <div>
          <div class="tt">LITROS/HA</div>
          <div class="dd">{{ item.dados.litrosHa }}</div>
        </div>
        <div>
          <div class="tt">
            PROFUNDIDADE DE SOLO EM CENTÍMETROS (ARADO OU PLANTIO)
          </div>
          <div class="dd">{{ item.dados.profundidadeSolo }}</div>
        </div>
        <div>
          <div class="tt">ESPAÇAMENTO EM CENTÍMETROS (PLANTIO):</div>
          <div class="dd">{{ item.dados.espacamentoPlantio }}</div>
        </div>
        <div>
          <div>Data da Aplicação</div>
          <div>{{ item.dados.dataAplicacao | formatData }}</div>
        </div>
        <!-- {{ item.dados }}-->
      </div>

      <div class="boxContent g2 centralizaTudo">
        <div>
          <div style="font-weight:900;">INSTRUÇÃO</div>
          <div>{{ item.dados.instrucao }}</div>
        </div>
        <div>
          <div style="font-weight:900;">DESCRIÇÃO</div>
          <div>{{ item.dados.descricao }}</div>
        </div>
      </div>

      <div class="hardBar scopeHeader">
        <div class="high">
          Filtros de Busca e Período
        </div>
        <div class="grid g4">
          <div>
            <div>Monitoramento</div>
            <div>{{ METODOS_DE_BUSCA.monitoramento }}</div>
          </div>
          <div>
            <div>Produção</div>
            <div>
              <div v-if="!METODOS_DE_BUSCA.idProducao">
                Global
              </div>
              <div v-else>
                <producao-name :chave="METODOS_DE_BUSCA.idProducao" />
              </div>
            </div>
          </div>
          <div>
            <div>Data Inicial</div>
            <div>{{ METODOS_DE_BUSCA.dataInicial | formatData }}</div>
          </div>
          <div>
            <div>Data Final</div>
            <div>{{ METODOS_DE_BUSCA.dataPrevista | formatData }}</div>
          </div>
        </div>
      </div>
      <div class="boxContent">
        <div v-if="GET_MONITORAMENTOS" class="lista">
          <div class="itemHeader">
            <div>PRAGA</div>
            <div>ESTAGIO</div>
            <div>OBSERVACAO</div>
            <div>GPS</div>
            <div>DATA</div>
            <div>HORA</div>
          </div>
          <div v-for="(item, index) in GET_MONITORAMENTOS" :key="index" class="item">
            <div>{{ item.dados.especie }}</div>
            <div>{{ item.dados.estagio.nome }}</div>
            <div>{{ item.dados.observacao }}</div>
            <div>
              LAT.:{{ item.dados.coord.lat }} , LONG.:{{
                item.dados.coord.long
              }}
            </div>
            <div>{{ item.dados.createdTimestamp | formatData }}</div>
            <div>
              {{ item.dados.createdTimestamp | formatHours }}
            </div>
          </div>
        </div>
        <div v-else class="centralizaTudo">
          Sem monitoramentos
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import colabName from "@/components/idColaboradorPorNome";
import producaoName from "@/components/idProducaoPorNome";
import talhaoName from "@/components/idTalhaoPorNome";
import itemEstoqueName from "@/components/itemEstoqueName";
import vVeiculo from "@/components/dash/idVeiculosForName";

export default {
  components: {
    colabName,
    producaoName,
    talhaoName,
    itemEstoqueName,
    vVeiculo
  },
  filters: {
    formatData: function(newval) {
      let response = moment(newval).format("DD/MM/YYYY");
      if (response == "Invalid date") {
        let toNumber = Number(newval);
        let response2 = moment(toNumber).format("DD/MM/YYYY");
        if (response2 == "Invalid date") {
          window.console.log("invalid", newval, response);
          return "erro";
        } else {
          return response2;
        }
      } else {
        return response;
      }
    },
    formatHours: function(newval) {
      let response = Number(newval);
      return moment(response).format("hh:mm:ss");
    }
  },
  props: {
    item: {
      type: Object,
      default: function() {
        return { item: "none", monitoramento: "none" };
      }
    }
  },
  computed: {
    GET_MONITORAMENTOS() {
      if(this.item.dados.monitoramentos){
        let lista = this.item.dados.monitoramentos;
        return lista.reverse();
      } else {
        return []
      }

    },
    METODOS_DE_BUSCA() {
      return this.item.dados.searchs;
    }
  },
  methods: {
    close() {
      this.$emit("CLOSE_ME");
    },
    impress() {
      let payload = this.item;
      let listaPayload = payload.dados.monitoramentos;
      this.$store.commit("SET_IMPRESS_LIST", listaPayload);
      this.$store.commit("SET_IMPRESS_DATABIN", payload);
      this.$store.commit("SET_IMPRESS_TYPE", "relatorio-aplicacoes");
      this.$store.commit("SET_IMPRESS", true);
    }
  }
};
</script>

<style lang="scss" scoped>
$tabela: 1fr 1fr 1fr 1fr 100px 80px;
$spaceTab: 4px;

.hardBar {
  padding: 10px;
  font-size: 18px;
  font-weight: 100;
  background-color: rgba(50, 50, 50, 0.1);
  box-shadow: 0px 0px 4px inset rgba(50, 50, 50, 0.5);
  &.scopeHeader {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: "cabeca" "gridding";
  }
  .high {
    grid-area: "cabeca";
    padding: 10px;
    text-align: center;
    font-weight: 400;
  }
  .grid {
    grid-area: "gridding";
    display: grid;
    & > div {
      padding: 10px;
      & > div {
        padding: 4px;
        text-align: center;
        &:nth-child(1) {
          font-weight: 100;
        }
        &:nth-child(2) {
          font-weight: 900;
        }
      }
    }
    &.g4 {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
}
.box {
  display: block;
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 31;
  top: 0px;
  bottom: 0px;
}
.boxContain {
  overflow: auto;
  margin: 0 auto;
  background-color: white;
  min-width: 400px;
  max-width: 80vw;
  margin-top: 20px;
  .boxHeader {
    display: grid;
    grid-template-columns: 1fr auto auto;
    .titulo {
      padding: 10px;
      font-size: 18px;
      font-weight: 100;
      background-color: #e5e5e5;
    }
    button {
      cursor: pointer;
    }
    .impress {
      background-color: rgba(40, 150, 200, 1);
      padding: 10px 20px;
      border: none;
      color: white;
      font-size: 10px;
    }
    .close {
      padding: 10px;
      border: none;
      background-color: #a21c26;
      color: white;
      font-size: 10px;
    }
  }

  .boxContent {
    overflow: auto;
    display: block;
    &.g2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
      & > div {
        padding: 10px;
      }
    }
    &.g3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      & > div {
        text-transform: uppercase;
        text-align: center;
        padding: 5px;
        & > div:nth-child(1) {
          font-weight: 100;
        }
        & > div:nth-child(2) {
          font-weight: 600;
        }
      }
    }
    padding: 20px;
    .lista {
      overflow: auto;
      font-size: 13px;
      .itemHeader {
        display: grid;
        grid-gap: $spaceTab;
        grid-template-columns: $tabela;
      }
      .item {
        display: grid;
        grid-gap: $spaceTab;
        grid-template-columns: $tabela;
        &:nth-child(2n) {
          background-color: rgba(50, 50, 50, 0.05);
        }
      }
    }
  }
}
</style>
