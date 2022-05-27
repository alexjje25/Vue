<template>
  <div class="boxPadrao">
    <div class="tituloContent">CADASTRO DE PRODUÇÃO</div>
    <div class="form">
      <div class="grid g2">
        <div class="scopo">
          <div class="titulo">Nome</div>
          <div class="include">
            <input v-model="include.name" type="text" placeholder="Nome" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">
            RESPONSÁVEL
          </div>
          <div class="include">
            <select v-model="include.colaborador">
              <option value="selecione">Selecione</option>
              <option
                v-for="(item, index) in colaboradores"
                :key="index"
                :value="item.chave"
              >
                {{ item.dados.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">
            DATA INICIAL
          </div>
          <div class="include">
            <input v-model="include.dataInicial" type="date" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">
            PREVISÃO DE COLHEITA
          </div>
          <div class="include">
            <input v-model="include.prevista" type="date" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">Talhão</div>
          <div class="include">
            <select v-model="include.talhao">
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
          <div class="titulo">
            CULTIVAR
          </div>
          <div class="include">
            <!-- select  -->
            <select v-model="include.cultivar">
              <option value="selecione">Selecione</option>
              <option
                v-for="(item, index) in cultivares"
                :key="index"
                :value="item.chave"
              >
                {{ item.dados.nome }}
              </option>
            </select>
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">
            TAMANHO DE HECTARE
          </div>
          <div class="include">
            <!-- select  -->
            <input v-model="include.size" type="number" />
          </div>
        </div>
        <div class="scopo">
          <div class="titulo">
            SEMENTE
          </div>
          <div class="include">
            <!-- select  -->
            <select v-model="include.semente">
              <option value="selecione">Selecione</option>
              <option
                v-for="(item, index) in SEMENTES"
                :key="index"
                :value="item.chave"
              >
                {{ item.dados.nome }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <p>
        <vBtn
          :icon="require('@/assets/icons/sinais/adicionar-white.png')"
          texto="CADASTRAR"
          @handleClick="enviar()"
        />
      </p>
    </div>
  </div>
</template>

<script>
import { servProducoes, timeServer } from "@/database.js";
import vBtn from "@/components/dash/btnIcon";

export default {
  components: {
    vBtn
  },
  data() {
    return {
      include: {
        idFazenda: this.$store.getters["auth/GET_FAZENDA_ID"],
        name: null,
        size: 0,
        chave: null,
        prevista: null,
        dataInicial: null,
        cultivar: "selecione",
        semente: "selecione",
        talhao: "selecione",
        colaborador: "selecione"
      }
    };
  },
  computed: {
    SEMENTES() {
      return this.$store.getters["fazenda/GET_ESTOQUE"].filter(item => {
        if (
          item.dados.categoria == "sementes" &&
          item.dados.modulo == "insumos"
        ) {
          return true;
        }
      });
    },
    cultivares() {
      return this.$store.getters["fazenda/GET_CULTIVARES"];
    },
    colaboradores() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    },
    talhoes() {
      return this.$store.getters["fazenda/GET_TALHOES"];
    }
  },
  mounted() {},
  methods: {
    myTime() {
      const talk = timeServer();
      this.include.created = talk;
    },
    cleanForm() {
      this.include.name = "";
      this.include.size = 1;
      this.include.chave = "";
      this.include.cultivar = "selecione";
      this.include.dataInicial = null;
      this.include.previsao = null;
      this.include.semente = "selecione";
      this.include.talhao = "selecione";
      this.include.previstaTIME = null;
      this.include.dataInicialTIME = null;
      this.include.colaborador = "selecione";
    },
    process(err) {
      if (err) {
        window.alert(err);
        window.console.log(err);
      } else {
        window.alert("sucess!");
      }
    },
    handleError(ms) {
      //payload: { status, mensagem, type }
      let payload = { status: true, mensagem: ms, type: "danger" };
      this.$store.commit("resource/SET_NOTIFY", payload);
    },
    enviar() {
      if (this.include.cultivar == "selecione") {
        this.handleError("Falta selecionar o cultivar");
        return false;
      }
      if (this.include.semente == "selecione") {
        this.handleError("Falta selecionar a semente");
        return false;
      }
      if (this.include.talhao == "selecione") {
        this.handleError("Falta selecionar o talhão");
        return false;
      }
      if (this.include.colaborador == "selecione") {
        this.handleError("Falta selecionar o colaborador");
        return false;
      }
      if (this.include.size < 1) {
        this.handleError(
          "o tamanho da produção não pode ser menor que 1 HECTARE"
        );
        return false;
      }
      this.include.previstaTIME = new Date(this.include.prevista).getTime();
      this.include.dataInicialTIME = new Date(
        this.include.dataInicial
      ).getTime();
      this.include.chave = servProducoes.push().key;
      this.include.size = Number(this.include.size);
      const response = this.include;
      servProducoes.child(this.include.chave).update(response, this.process());
      this.cleanForm();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/formInclude.scss";
</style>
