<template>
  <div class="includeAplicacao">
    <h1 class="tituloContent">SELECIONE OS DADOS DE MONITORAMENTO</h1>
    <div class="centralizaTudo boxPadrao b">
      <v-buscador mode="aplicacoes" @SEARCH_UPDATE="updateSEARCH"></v-buscador>
    </div>
    <div :class="{ grid2: GET_MONITORAMENTOS.length >= 1 }">
      <div v-if="GET_MONITORAMENTOS.length >= 1" class="lista boxPadrao">
        <!--<div v-if="GET_MONITORAMENTOS.length <= 0">
          SEM RESULTADOS
        </div>-->
        <div class="centralizaTudo">
          <div class="item header">
            <div>PRODUÇÃO</div>
            <div>ESPÉCIE</div>
            <div>OBSERVAÇÃO</div>
            <div>ESTÁGIO</div>
          </div>
          <div
            v-for="(lista, index) in GET_MONITORAMENTOS"
            :key="index"
            class="item"
          >
            <div>{{ lista.dados.nomeProducao }}</div>
            <div>{{ lista.dados.especie }}</div>
            <div>{{ lista.dados.observacao }}</div>
            <div>{{ lista.dados.estagio.nome }}</div>
          </div>
        </div>
      </div>
      <div class="containRight">
        <div class="boxPadrao">
          <div class="form">
            <div class="grid g2">
              <div class="scopo">
                <div class="titulo">Titulo</div>
                <div class="include">
                  <input
                    v-model="include.titulo"
                    type="text"
                    placeholder="Titulo da Aplicação"
                  />
                </div>
              </div>
              <div class="scopo">
                <div class="titulo">URGENTE ?</div>
                <div class="include">
                  <select v-model="include.urgente">
                    <option value="false">NÃO</option>
                    <option value="true">SIM</option>
                  </select>
                </div>
              </div>
              <div class="scopo">
                <div class="titulo">
                  Data para Aplicação
                </div>
                <div class="include">
                  <input v-model="include.dataAplicacao" type="date" />
                </div>
              </div>
              <div class="scopo">
                <div class="titulo">Talhão</div>
                <div class="include">
                  <select
                    v-model="include.talhao"
                    :class="{ requiredValid: producoes.length == 0 }"
                  >
                    <option value="selecione">Selecione</option>
                    <option
                      v-for="(item, index) in talhoes"
                      :key="index"
                      :value="item.chave"
                    >
                      {{ item.dados.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="scopo">
                <div class="titulo">Produção</div>
                <div class="include">
                  <select
                    v-model="include.idProducao"
                    :class="{ dangerValid: producoes.length == 0 }"
                  >
                    <option v-if="producoes.length == 0" value="selecione"
                      >Não cadastros</option
                    >
                    <option v-else value="selecione">Selecione</option>
                    <option
                      v-for="(item, index) in producoes"
                      :key="index"
                      :value="item.chave"
                    >
                      {{ item.dados.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="scopo">
                <div class="titulo">Setor</div>
                <div class="include">
                  <select v-model="include.setor">
                    <option value="selecione">Selecione</option>
                    <option
                      v-for="(item, index) in setores"
                      :key="index"
                      :value="item.dados.titulo"
                    >
                      {{ item.dados.titulo }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="scopo">
                <div class="titulo">Descrição</div>
                <div class="include">
                  <textarea v-model="include.descricao" type="text" />
                </div>
              </div>

              <div class="scopo">
                <!-- COL 2 -->
                <div class="titulo">
                  Colaborador
                </div>
                <div class="include">
                  <select v-model="include.idColaborador">
                    <option value="selecione">Selecione</option>
                    <option
                      v-for="(item, index) in colaboradores"
                      :key="index"
                      :value="item.chave"
                    >
                      {{ item.dados.name.toLowerCase() }}
                    </option>
                  </select>
                </div>
                <div class="titulo">PERIODO</div>
                <div class="include">
                  <select v-model="include.periodo">
                    <option value="selecione">Selecione</option>
                    <option value="matutino">MATUTINO</option>
                    <option value="vespertino">VESPERTINO</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- DOSAGEM E MEDIDA / ESTOQUE -->
        <div class="boxPadrao">
          <div class="form">
            <h4>DOSAGEM E ESTOQUE</h4>
            <div class="grid g2">
              <div class="scopo">
                <div class="titulo">Tipo de Insumo</div>
                <div class="include">
                  <select v-model="include.categoria">
                    <option value="fertilizantes">fertilizante</option>
                    <option value="adubos">adubo</option>
                    <option value="defensivos">defensivo</option>
                    <option value="sementes">sementes</option>
                  </select>
                </div>
                <div class="titulo">Insumo</div>
                <div class="include">
                  <select v-model="include.idEstoque">
                    <option value="selecione">selecione</option>
                    <option
                      v-for="(item, index) in GET_ESTOQUE"
                      :key="index"
                      :value="item.chave"
                      >{{ item.dados.nome.toUpperCase() }}</option
                    >
                  </select>
                </div>
              </div>
              <div class="scopo">
                <div class="titulo">Dosagem / medida</div>
                <div class="include grid2">
                  <input
                    v-model="include.dosagem"
                    type="text"
                    placeholder="Dosagem"
                  />
                  <select v-model="include.unidade">
                    <option value="KG">KG - Quilograma</option>
                    <option value="T">T - Tonelada</option>
                    <option value="UND">U - Unidade</option>
                    <option value="LT">LT - Litro</option>
                    <option value="SACA">SACA</option>
                    <option value="SEMENTES">SEMENTES</option>
                  </select>
                </div>
                <div class="titulo">Instrução de Uso</div>
                <div class="include">
                  <textarea v-model="include.instrucao" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="boxPadrao">
          <div class="form">
            <h4>VEÍCULO</h4>
            <div class="grid g2">
              <div class="scopo">
                <div class="titulo">Selecione o Veículo</div>
                <div class="include">
                  <select v-model="include.veiculo">
                    <option value="">Selecione</option>
                    <option
                      v-for="(vei, index) in veiculos"
                      :key="index"
                      :value="vei.chave"
                    >
                      {{ vei.dados.nome }} - {{ vei.dados.placa }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="scopo">
                <div class="titulo">Velocidade de Aplicação (KM/h)</div>
                <div class="include">
                  <input
                    v-model="include.velocidadeAplicacao"
                    type="number"
                    value="0"
                    maxlength="3"
                    max="999"
                  />
                </div>
              </div>
              <div class="scopo">
                <div class="titulo">Bico de Pulverização</div>
                <div class="include">
                  <input v-model="include.bicoPulv" type="text" />
                </div>
              </div>
              <div class="scopo">
                <div class="titulo">Litros/ha</div>
                <div class="include">
                  <input v-model="include.litrosHa" type="text" />
                </div>
              </div>
              <div class="scopo">
                <div class="titulo">
                  Profundidade de solo em centímetros (arado ou plantio)
                </div>
                <div class="include">
                  <input v-model="include.profundidadeSolo" type="number" />
                </div>
              </div>
              <div class="scopo">
                <div class="titulo">Espaçamento em centímetros (plantio):</div>
                <div class="include">
                  <input v-model="include.espacamentoPlantio" type="number" />
                </div>
              </div>
              <div class="scopo">
                <div class="titulo">Observação</div>
                <div class="include">
                  <textarea v-model="include.observacaoVeiculo" type="number" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="boxPadrao">
          <div class="centralizaTudo">
            <vBtn
              :icon="require('@/assets/icons/sinais/adicionar-white.png')"
              texto="CADASTRAR"
              @handleClick="enviar()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { servAplicacoes } from "@/database.js";
import moment from "moment";
import vBuscador from "./buscador";
import vBtn from "@/components/dash/btnIcon";

export default {
  components: {
    "v-buscador": vBuscador,
    vBtn
  },
  data() {
    return {
      search: {
        idProducao: "",
        dataPrevista: "",
        dataInicial: "",
        idColaborador: "",
        monitoramento: "pragas"
      },
      include: {
        dataAplicacao: null,
        instrucao: "",
        unidade: "UND",
        dosagem: "",
        idEstoque: "selecione", //antigo idInsumo
        categoria: "sementes", // antigo insumoCategoria
        idFazenda: this.$store.getters["auth/GET_FAZENDA"],
        titulo: "",
        descricao: "",
        status: 0,
        talhao: "selecione",
        idProducao: "selecione",
        setor: "selecione",
        chave: null,
        urgente: "false",
        idColaborador: "selecione",
        periodo: "selecione",
        createdTime: null, // verificar
        veiculo: "",
        velocidadeAplicacao: "",
        bicoPulv: "",
        litrosHa: "",
        profundidadeSolo: "",
        espacamentoPlantio: "",
        observacaoVeiculo: "",
        monitoramentos: [],
        searchs: {}
      }
    };
  },
  computed: {
    veiculos() {
      return this.$store.getters["fazenda/GET_VEICULOS"];
    },
    filtrosOK() {
      if (
        this.search.idProducao == "" ||
        this.search.dataPrevista == "" ||
        this.search.dataInicial == ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    producoesALL() {
      return this.$store.getters["fazenda/GET_PRODUCOES"].filter(
        item => item.dados.talhao == this.include.talhao
      );
    },
    colaboradores() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    },
    GET_MONITORAMENTOS() {
      let self = this;
      var referencia;
      if (this.search.monitoramento == "pragas")
        referencia = "fazenda/GET_PRAGAS";
      if (this.search.monitoramento == "daninhas")
        referencia = "fazenda/GET_DANINHAS";
      if (this.search.monitoramento == "doencas")
        referencia = "fazenda/GET_DOENCAS";

      let response1 = this.$store.getters[referencia].filter(item => {
        let db = String(item.dados.idProducao);
        let query = String(self.search.idProducao);
        if (query == db || query == "") {
          return true;
        } else {
          return false;
        }
      });
      let response2 = response1.filter(item => {
        if (
          item.dados.idColaborador == this.search.idColaborador ||
          this.search.idColaborador == ""
        ) {
          return true;
        } else {
          return false;
        }
      });

      let response3 = response2.filter(item => {
        let itemData = moment(item.dados.created); // filtrada pela data de criação
        let buscaInicial = moment(self.search.dataInicial).subtract(1, "d");
        let buscaFinal = moment(self.search.dataPrevista).add(1, "d");
        let resultado1 = moment(itemData).isBetween(buscaInicial, buscaFinal);

        if (resultado1 == true) {
          return true;
        } else if (buscaInicial == null || buscaInicial == "") {
          return true;
        } else {
          return false;
        }
        /*
        if (
          resultado1 == true ||
          this.search.dataInicial == "" ||
          this.search.dataInicial == null ||
          this.search.dataPrevista == "" ||
          this.search.dataPrevista == null
        ) {
          return true;
        } else {
          return false;
        }
        */
      });

      self.include.monitoramentos = response3;
      return response3;
    },
    GET_ESTOQUE() {
      return this.$store.getters["fazenda/GET_ESTOQUE"].filter(item => {
        let categoria = item.dados.categoria;
        let modelo = item.dados.modulo;

        if (categoria == this.include.categoria) {
          if (modelo == "insumos") {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
      //atualizando quando há troca - incomun.
      /*
      let categoria = this.include.insumoCategoria;
      if (categoria == "sementes") {
        return this.$store.getters["fazenda/GET_STOQUE_SEMENTES"];
      } else if (categoria == "adubos") {
        return this.$store.getters["fazenda/GET_STOQUE_ADUBOS"];
      } else if (categoria == "defensivos") {
        return this.$store.getters["fazenda/GET_STOQUE_DEFENSIVOS"];
      } else if (categoria == "fertilizantes") {
        return this.$store.getters["fazenda/GET_STOQUE_FERTILIZANTES"];
      } else {
        return false;
      }
      */
    },
    setores() {
      return this.$store.getters["fazenda/GET_SETOR"];
    },
    talhoes() {
      return this.$store.getters["fazenda/GET_TALHOES"];
    },
    producoes() {
      return this.$store.getters["fazenda/GET_PRODUCOES"].filter(item => {
        if (
          item.dados.talhao == this.include.talhao ||
          this.include.talhao == "selecione"
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    "include.categoria": function(newval, oldval) {
      if (newval !== oldval) {
        this.include.idEstoque = "selecione";
      }
    }
  },
  methods: {
    updateSEARCH(dados) {
      if (dados.type == "searchProducao") {
        this.search.idProducao = dados.value;
      }
      if (dados.type == "searchColaborador") {
        this.search.idColaborador = dados.value;
      }
      if (dados.type == "searchDataInicial") {
        this.search.dataInicial = dados.value;
      }
      if (dados.type == "searchDataFinal") {
        this.search.dataPrevista = dados.value;
      }
      if (dados.type == "searchMonitoramento") {
        this.search.monitoramento = dados.value;
      }
    },
    formVerify(contain) {
      if (!contain) return false;
      else if (contain.length < 1) return false;
      else if (contain == "selecione") return false;
      else return true;
    },
    formVerification(contain, name) {
      let resultado = this.formVerify(contain);
      let status;
      if (resultado == false) {
        window.alert(`${name} não é válido.`);
        status = false;
      } else {
        status = true;
      }
      return status;
    },
    handle(err) {
      if (err) {
        this.$store.commit("resource/SET_NOTIFY", {
          status: true,
          mensagem: `Ocorreu um erro inesperado: ${err}`,
          type: "danger"
        });
        window.console.log(err);
      } else {
        this.$store.commit("resource/SET_NOTIFY", {
          status: true,
          mensagem: "CADASTRADO COM SUCESSO",
          type: "sucess"
        });
      }
    },
    carregaComputeds() {
      let getter = this.GET_MONITORAMENTO;
      window.console.log(getter);
      this.include.monitoramento.lista = getter;
    },
    enviar() {
      //var self = this;
      let f1 = this.formVerification(this.include.idColaborador, "Colaborador");
      let f2 = this.formVerification(this.include.setor, "Setor");
      let f3 = this.formVerification(this.include.talhao, "Talhão");
      let f4 = this.formVerification(this.include.idProducao, "Produção");
      let f5 = this.formVerification(this.include.periodo, "Periodo");
      if (f1 && f2 && f3 && f4 && f5) {
        if (this.include.titulo.length < 3) {
          window.alert("O titulo está muito curto ... ");
          return false;
        }

        this.include.chave = servAplicacoes.push().key;
        this.include.searchs = this.search;
        this.include.status = String(this.include.status);
        this.include.urgente = String(this.include.urgente);
        //this.include.createdTime = new Date().getTime();

        let response = this.include;

        servAplicacoes
          .child(this.include.chave)
          .update(response, this.handle());
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/formInclude.scss";
.boxPadrao {
  margin: 10px auto;
}
.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
}
.item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border-bottom: 2px solid rgba(50, 50, 50, 0.1);
  font-size: 13px;
  letter-spacing: 1px;
  &.header {
    font-weight: 900;
  }
  & > div {
    padding: 5px;
  }
}
</style>
