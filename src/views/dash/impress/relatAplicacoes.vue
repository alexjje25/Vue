<template>
  <div class="papel">
    <vHeader />
    <!--  -->
    <fieldset>
      <h2 class="tt center grande">
        ORDEM DE APLICAÇÃO
      </h2>
      <div class="sectProducao">
        <div class="g3 center master">
          <div>
            <div class="tt">ORDEM DE SERVIÇO</div>
            <div class="dd">
              <div>
                {{ bin.dados.dataAplicacao | dataBR }}
              </div>
            </div>
          </div>
          <div>
            <div class="tt">PRODUTO</div>
            <div class="dd">
              <div>
                <itemEstoqueName :chave="bin.dados.idEstoque" />
              </div>
            </div>
          </div>
          <div>
            <div class="tt">PRODUÇÃO</div>
            <div class="dd">
              <div>
                <producaoName :chave="bin.dados.idProducao" />
              </div>
            </div>
          </div>
          <div>
            <div class="tt">TALHÃO</div>
            <div class="dd">
              <talhaoName :chave="bin.dados.talhao" />
            </div>
          </div>
          <div>
            <div class="tt">DOSAGEM</div>
            <div class="dd">
              {{ bin.dados.dosagem }} | {{ bin.dados.unidade }}
            </div>
          </div>
          <div>
            <div class="tt">TIPO DE INSUMO</div>
            <div class="dd">
              {{ bin.dados.categoria }}
            </div>
          </div>
        </div>
      </div>
    </fieldset>

    <fieldset style="margin-top:6px;">
      <div class="sectProducao g2">
        <div class="tt">INSTRUÇÃO</div>
        <div class="tt">DESCRIÇÃO</div>
        <div>
          <div class="dd">
            {{ bin.dados.instrucao }}
          </div>
        </div>
        <div>
          <div class="dd">
            {{ bin.dados.descricao }}
          </div>
        </div>
      </div>
    </fieldset>

    <fieldset>
      <div class="sectProducao">
        <div class="g3 center master">
          <div>
            <div class="tt">Veículo</div>
            <div class="dd"><vVeiculo :chave="bin.dados.veiculo" /></div>
          </div>
          <div>
            <div class="tt">VELOCIDADE DE APLICAÇÃO (KM/H)</div>
            <div class="dd">
              {{ bin.dados.velocidadeAplicacao }}
            </div>
          </div>
          <div>
            <div class="tt">BICO DE PULVERIZAÇÃO</div>
            <div class="dd">{{ bin.dados.bicoPulv }}</div>
          </div>
          <div>
            <div class="tt">LITROS/HA</div>
            <div class="dd">{{ bin.dados.litrosHa }}</div>
          </div>
          <div>
            <div class="tt">
              PROFUNDIDADE DE SOLO EM CENTÍMETROS (ARADO OU PLANTIO)
            </div>
            <div class="dd">{{ bin.dados.profundidadeSolo }}</div>
          </div>
          <div>
            <div class="tt">ESPAÇAMENTO EM CENTÍMETROS (PLANTIO):</div>
            <div class="dd">{{ bin.dados.espacamentoPlantio }}</div>
          </div>
        </div>
      </div>
    </fieldset>

    <fieldset style="margin-top:6px;">
      <div class="sectProducao g2">
        <div class="tt">Data Inicial</div>
        <div class="tt">Data Prevista</div>
        <div>
          <span v-if="bin.dados.searchs.dataInicial">
            {{ bin.dados.searchs.dataInicial }}
          </span>
          <span v-else>
            S/ FILTRO
          </span>
        </div>
        <div>
          <span v-if="bin.dados.searchs.dataPrevista">
            {{ bin.dados.searchs.dataPrevista }}
          </span>
          <span v-else>
            S/ FILTRO
          </span>
        </div>
      </div>
    </fieldset>

    <!-- inicia lista -->
    <div v-if="!lista" class="centralizaTudo" style="padding:20px;">
      SEM MONITORAMENTO
    </div>
    <div v-else>
      <h2 class="tipoRelatorio tt">Monitoramentos</h2>
      <div class="lista">
        <div class="itemHeader">
          <div>PRAGA</div>
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
            <colabName :chave="list.dados.idColaborador" />
          </div>
          <div>{{ list.dados.coord.lat }}, {{ list.dados.coord.long }}</div>
        </div>
      </div>
    </div>

    <div class="rodapeAdicional">
      <img src="@/assets/image/rodape-aplicacao.png" style="max-width: 100%;" />
    </div>
  </div>
</template>

<script>
import colabName from "@/components/idColaboradorPorNome";
import producaoName from "@/components/idProducaoPorNome";
import itemEstoqueName from "@/components/itemEstoqueName";
import vHeader from "./header";
import talhaoName from "@/components/idTalhaoPorNome";
import { dataBR } from "@/mixins/time.js";
import vVeiculo from "@/components/dash/idVeiculosForName";

export default {
  components: {
    vVeiculo,
    colabName,
    producaoName,
    itemEstoqueName,
    vHeader,
    talhaoName
  },
  mixins: [dataBR],
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
      let lista = this.$store.getters["GET_IMPRESS_LIST"];
      return lista; // reverse já aplicado anteriormente
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
    this.$store.commit("SET_IMPRESS_LIST", []);
    this.$store.commit("SET_IMPRESS", false);
  }
};
</script>

<style lang="scss" scoped>
@import "./global";
.fieldset {
  margin-top: 6px;
}
.master {
  grid-gap: 15px;
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
.g3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5px;
}
.g2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
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
  margin-top: 6px;
  h2 {
    font-weight: 900;
    text-align: center;
    margin: 5px;
    padding: 5px;
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
