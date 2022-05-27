<template>
  <div>
    <div class="boxPadrao">
      <div class="buscador g4 centralizaTudo">
        <div>
          <select v-model="search.estado">
            <option value="">Estado Atual</option>
            <option value="0">Aguardando</option>
            <option value="1">Em processo</option>
            <option value="2">Finalizado</option>
            <option value="3">Não feito / impedido</option>
          </select>
        </div>
        <div>
          <select v-model="search.colaborador">
            <option value="">Colaborador</option>
            <option
              v-for="(item, index) in colaboradores"
              :key="index"
              :value="item.chave"
            >
              {{ item.dados.name }}
            </option>
          </select>
        </div>
        <div>
          <select v-model="search.setor">
            <option value="">Setor</option>
            <option
              v-for="(item, index) in setores"
              :key="index"
              :value="item.dados.titulo"
            >
              {{ item.dados.titulo }}
            </option>
          </select>
        </div>
        <div>
          <select v-model="search.producao">
            <option value="">Produção</option>
            <option
              v-for="(item, index) in producoes"
              :key="index"
              :value="item.dados.chave"
            >
              {{ item.dados.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="selectedContexto" class="boxBackFlot"></div>

    <div v-if="selectedContexto == true" class="boxFloat">
      <div>{{ contexto }}</div>
      <br />
      <div class="centralizaTudo">
        <vBtn
          name="FECHAR"
          cor-primaria="#be1622"
          cor-secundaria="#e94e1b"
          :icon="require('@/assets/icons/sinais/multiplicar-white.png')"
          @handle="selectedContexto = false"
        />
      </div>
    </div>

   

    <div class="boxPadrao">
      <div class="titulo">
        TAREFAS
      </div>
      <div class="resultados centralizaTudo">
        <div>
          <div class="bloco fundo c0">
            {{
              tarefas.filter(item => {
                if (item.dados.status == 0) {
                  return true;
                } else {
                  return false;
                }
              }).length | zeroNaFrente
            }}
          </div>
          <div class="descricao">AGUARDANDO</div>
        </div>
        <div>
          <div class="bloco fundo c1">
            {{
              tarefas.filter(item => {
                if (item.dados.status == 1) {
                  return true;
                } else {
                  return false;
                }
              }).length | zeroNaFrente
            }}
          </div>
          <div class="descricao">EM PROCESSO</div>
        </div>
        <div>
          <div class="bloco fundo c2">
            {{
              tarefas.filter(item => {
                if (item.dados.status == 2) {
                  return true;
                } else {
                  return false;
                }
              }).length | zeroNaFrente
            }}
          </div>
          <div class="descricao">CONCLUÍDAS</div>
        </div>
        <div>
          <div class="bloco fundo c3">
            {{
              tarefas.filter(item => {
                if (item.dados.status == 3) {
                  return true;
                } else {
                  return false;
                }
              }).length | zeroNaFrente
            }}
          </div>
          <div class="descricao">NÃO EXECUTADAS</div>
        </div>
      </div>
      <div class="informativo centralizaTudo">
      Filtre os dados (Status, Colaborador, Setor e Produção), em sequência clique para imprimir o relatório completo ou gerar o PDF.
    </div>
    </div>

     

    <div class="designProfundo">
      <div class="impressao" @click="impress(tarefas)">
        <img src="@/assets/icons/impressora-white.png" alt="" />
        <div>IMPRIMIR</div>
      </div>

      <div v-if="false">
        <div>STATUS</div>
        <div>URGENTE</div>
        <div>TAREFA</div>
        <div>DESCRIÇÃO</div>
        <div>
          COLABORADOR
        </div>
        <div>PERIODO</div>
        <div>SETOR</div>
        <div>PRODUÇÃO</div>
      </div>

      <div class="lista">
        <div class="item" v-for="(item, index) in tarefas" :key="index">
          <div>
            <button
              v-if="GET_NIVEL == 99"
              class="rootBtn"
              @click="removeThis(item.chave)"
            >
              REMOVER
            </button>
            <div class="scope">
              <div class="chapa">STATUS</div>
              <div class="dd">
                <div
                  class="cor highImpor"
                  :class="{
                    c0: item.dados.status == '0',
                    c1: item.dados.status == '1',
                    c2: item.dados.status == '2',
                    c3: item.dados.status == '3'
                  }"
                >
                  {{ item.dados.status | statusName }}
                </div>
              </div>
            </div>
          </div>
          <div class="scope2col">
            <div class="scope">
              <div class="tt">
                Data para Tarefa
              </div>
              <div class="dd">
                <div v-if="item.dados.dataParaTarefa">
                  {{ item.dados.dataParaTarefa | formataData }}
                </div>
                <div v-else>
                  Indefinida
                </div>
              </div>
            </div>
            <div class="scope">
              <div class="tt">
                URGENTE?
              </div>
              <div
                :class="{
                  urgente: item.dados.urgente == 'true',
                  comum: item.dados.urgente == 'false'
                }"
              >
                {{ item.dados.urgente | trueFalse }}
              </div>
            </div>
            <div class="scope">
              <div class="tt">Título da Tarefa</div>
              <div class="dd">{{ item.dados.titulo }}</div>
            </div>
            <div class="scope">
              <div class="tt">Colaborador</div>
              <div class="dd">
                <vColaborador :chave="item.dados.idColaborador" /> <br />
                Matr.:
                {{ item.dados.idColaborador }}
              </div>
            </div>
            <div class="scope">
              <div class="tt">Período</div>
              <div class="dd">{{ item.dados.periodo }}</div>
            </div>
            <div class="scope">
              <div class="tt">Setor</div>
              <div class="dd">{{ item.dados.setor }}</div>
            </div>
            <div class="scope">
              <div class="tt">Produção</div>
              <div class="dd"><vProducao :chave="item.dados.idProducao" /></div>
            </div>
            <div class="scope">
              <div class="tt">Descrição</div>
              <div
                class="dd elipsetxt"
                @click="renderText(item.dados.descricao)"
              >
                {{ item.dados.descricao }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vBtn from "@/components/dash/btnIconMini";
import vColaborador from "@/components/idColaboradorPorNome";
import vProducao from "@/components/idProducaoPorNome";
import { GET_NIVEL } from "@/mixins/global.js";
import { servTarefas } from "@/database.js";
import { dateFormat } from "@/mixins/time";
export default {
  components: {
    vBtn,
    vColaborador,
    vProducao
  },
  filters: {
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
    },
    zeroNaFrente: function(valor) {
      if (valor < 10 && valor > 0) {
        return "0" + valor;
      } else if (valor == 0) {
        return "0";
      } else {
        return valor;
      }
    }
  },
  mixins: [GET_NIVEL, dateFormat],
  data() {
    return {
      search: {
        setor: "",
        colaborador: "",
        producao: "",
        estado: ""
      },
      contexto: "",
      selectedContexto: false
    };
  },
  computed: {
    setores() {
      return this.$store.getters["fazenda/GET_SETORES"];
    },
    tarefas() {
      let listaTarefas = this.$store.getters["fazenda/GET_TAREFAS"].filter(
        payload => {
          let colab1 = String(this.search.colaborador);
          let colab2 = String(payload.dados.idColaborador);

          let setor1 = String(this.search.setor.toUpperCase());
          let setor2 = String(payload.dados.setor.toUpperCase());

          let producao1 = String(this.search.producao);
          let producao2 = String(payload.dados.idProducao);

          let status = String(this.search.estado);
          let status2 = String(payload.dados.status);
          return (
            colab2.match(colab1) &&
            setor2.match(setor1) &&
            producao2.match(producao1) &&
            status2.match(status)
          );
        }
      );
      return listaTarefas.reverse();
    },
    colaboradores() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    },
    producoes() {
      return this.$store.getters["fazenda/GET_PRODUCOES"];
    },
    talhoes() {
      return this.$store.getters["fazenda/GET_TALHOES"];
    }
  },
  methods: {
    removeThis(chave) {
      servTarefas.child(chave).remove();
    },
    impress(payload) {
      let databin = this.search;
      this.$store.commit("SET_IMPRESS_LIST", payload);
      this.$store.commit("SET_IMPRESS_DATABIN", databin);
      this.$store.commit("SET_IMPRESS_TYPE", "relatorio-tarefas");
      this.$store.commit("SET_IMPRESS", true);
    },
    renderText(texto) {
      window.console.log("texto", texto);
      this.contexto = texto;
      this.selectedContexto = true;
    },
    closeText() {
      this.contexto = "";
      this.selectedContexto = false;
    }
  }
};
</script>

<style lang="scss" scoped>
$tabela: minmax(100px, 1fr) minmax(auto, 80px) minmax(auto, 1fr)
  minmax(100px, 1fr) repeat(4, 1fr);
.informativo {
  width: 500px;
  margin: 0 auto;
  color: rgba(50, 50, 50, 0.7);
}
.titulo {
  position: absolute;
  display: inline-block;
  font-size: 20px;
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
  margin-left: 20px;
  box-shadow: 0px 0px 10px rgba(50, 50, 50, 0.5);
  margin-top: -40px;
  margin-left: 0px;
}
.resultados {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
  margin: 10px;
  .bloco {
    padding: 15px 30px;
    display: inline-block;
    border-radius: 10px;
    font-size: 25px;
  }
  .descricao {
    padding-top: 10px;
    font-size: 14px;
  }
}
.fundo {
  font-weight: 800;
  color: white;
  &.c0 {
    background-color: #878787;
  }
  &.c1 {
    background-color: #f39200;
  }
  &.c2 {
    background-color: #008d36;
  }
  &.c3 {
    background-color: #be1622;
  }
}
.cor {
  font-weight: 800;
  &.c0 {
    color: #878787;
    color: rgb(90, 90, 90);
  }
  &.c1 {
    color: #f39200;
  }
  &.c2 {
    color: #008d36;
  }
  &.c3 {
    color: #be1622;
  }
}
.urgente {
  color: #e94e1b;
  font-weight: 900;
}
.comum {
  color: #95c11f;
  font-weight: 900;
}
table {
  border-collapse: collapse;
  border: 1px solid rgba(230, 230, 230, 1);
  min-width: 98%;
  margin: 0 auto;
  display: table;
  tr {
    td {
      padding: 4px 6px;
    }
  }
}
.elipsetxt {
  text-overflow: ellipsis;
  max-height: 60px;
  white-space: wrap;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
}

.boxPadrao {
  &.b {
    //margin: 20px 1%;
    width: 90%;
    max-width: 90%;
  }
}
.scope2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  .scope {
    margin-top: 10px;
  }
}
.designProfundo {
  background-color: rgba(30, 81,0, 1);
  box-shadow: 0px 0px 20px black inset;
}
.chapa {
  font-weight: 900;
  color: rgb(80, 80, 80);
  letter-spacing: 1px;
  padding: 20px;
}
.highImpor {
  font-size: 30px;
  padding: 10px;
  border-top: 1px solid silver;
  border-bottom: 1px solid silver;
}
.impressao {
  padding: 20px;
  background-color: #6d6d6d;
  color: white;
  position: absolute;
  border-radius: 10px;
  margin-top: -45px;
  margin-left: 60px;
  transition: 0.5s background-color;
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  align-content: center;
  align-self: center;
  align-items: center;
  vertical-align: center;
  & > div {
    padding-right: 10px;
    margin-left: -4px;
  }
  &:hover {
    background-color: #3dce00;
    cursor: pointer;
  }
  img {
    width: 25px;
  }
  &.opacity {
    opacity: 0.2;
    filter: grayscale(100%);
  }
}
.lista {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  padding: 20px;
  padding-top: 40px;
  @media screen and (max-width: 950px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
  .item {
    display: inline-block;
    padding: 20px;
    border-radius: 10px;
    margin: 10px;

    background-color: white;
    &.header {
      font-weight: 800;
      img {
        width: 50px;
      }
    }
    font-weight: 100;
    text-align: left;
    padding: 0px 4px;
    margin: 0px;
    box-sizing: content-box;
    text-align: center;
    &.itemHeader {
      font-weight: normal;
    }

    & > div {
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
