<template>
  <div class="detalhesColab">
    <div class="tituloContent centralizaTudo">
      {{ colaborador.dados.name }} - Matrícula {{ colaborador.chave }}
    </div>
    <div class="dashmenu centralizaTudo">
      <v-btn texto="FECHAR" valor="CLOSE" @handleClick="close()" />
      <v-btn
        texto="INFORMAÇÕES GERAIS"
        valor="moreinfo"
        @handleClick="ATIVA_ROTA"
      />
      <v-btn texto="Tarefas" valor="tarefas" @handleClick="ATIVA_ROTA" />
      <v-btn texto="Ponto GPS" valor="pontoGPS" @handleClick="ATIVA_ROTA" />
      <v-btn texto="Relatório" valor="relatorio" @handleClick="ATIVA_ROTA" />
    </div>
    <div class="listas">
      <div v-if="selected == 'moreinfo'" class="moreinfo">
        <h1>{{ colaborador.dados.name }}</h1>
        <div class="g2">
          <div>
            Card Rurall <b>{{ colaborador.dados.codigo }}</b>
          </div>
          <div>
            CPF: <b>{{ colaborador.dados.cpf }}</b>
          </div>
        </div>
        <div class="g2">
          <div>
            Setor: <b>{{ colaborador.dados.setor }}</b>
          </div>
          <div>
            RG: <b>{{ colaborador.dados.rg }}</b>
          </div>
        </div>
        <div class="g2">
          <div>
            Entrada: <b>{{ colaborador.dados.dataEntrada }}</b>
          </div>
          <div>
            EMAIL: <b>{{ colaborador.dados.email }}</b>
          </div>
        </div>
        <div>
          Permissões:<br />
          <div class="permissoes">
            <div
              v-for="(perm, index) in colaborador.dados.permissoes"
              :key="index"
            >
              {{ perm }}
            </div>
          </div>
        </div>
        <code
          v-if="nivel >= 99"
          style="background-color: rgba(10,50,150,0.5);"
          >{{ colaborador.dados }}</code
        >
      </div>
      <div v-if="selected == 'tarefas'" class="lista">
        <div v-for="(item, index) in tarefas" :key="index" class="item">
          <div class="status">
            <div class="design">{{ item.dados.status | filtraStatus }}</div>
          </div>
          <div class="titulo">{{ item.dados.titulo }}</div>
          <div class="descricao">{{ item.dados.descricao }}</div>
        </div>
      </div>
      <pontoGPS :colaborador="idColaborador" v-if="selected == 'pontoGPS'" />
      <vRelatorio :colaborador="idColaborador" v-if="selected == 'relatorio'" />
    </div>
  </div>
</template>

<script>
import vBtn from "@/components/dash/btn";
import pontoGPS from "./pontoGPS/index";
import vRelatorio from "./relatorio/index";

export default {
  components: {
    vBtn,
    pontoGPS,
    vRelatorio
  },
  filters: {
    filtraStatus: function(snap) {
      if (snap == "0") {
        return "Aguardando";
      }
      if (snap == "1") {
        return "Em execução";
      }
      if (snap == "2") {
        return "Finalizado";
      }
      if (snap == "3") {
        return "Não finalizado";
      }
    }
  },
  props: {
    idColaborador: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      selected: "moreinfo"
    };
  },
  computed: {
    nivel() {
      return this.$store.getters["auth/GET_NIVEL_AUTH"];
    },
    tarefas() {
      return this.$store.getters["fazenda/GET_TAREFAS"].filter(item => {
        if (item.dados.idColaborador == this.idColaborador) {
          return true;
        }
      });
    },
    colaborador() {
      return this.$store.getters["fazenda/GET_COLABORADORES"].find(
        item => item.chave == this.idColaborador
      );
    }
  },
  methods: {
    ATIVA_ROTA(valor) {
      window.console.log(valor);
      this.selected = valor;
    },
    close() {
      this.$emit("close", "");
    }
  }
};
</script>

<style lang="scss" scoped>
.g2 {
  display: grid;
  max-width: 500px;
  grid-template-columns: 1fr 1fr;
  & > div {
    padding: 10px;
    letter-spacing: 1px;
    font-family: sans-serif; // temp tester
  }
}
.detalhesColab {
  font-size: 14px;
}
.moreinfo {
  & > div {
    padding: 4px;
    margin-left: 10px;
  }
  h1 {
    margin: 0px;
    padding: 10px;
    font-weight: 100;
  }
}
.lista {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  .item {
    padding: 5px;
    display: grid;
    grid-template-columns: 150px 1fr 1fr;
    grid-gap: 4px;
    &:nth-child(2n) {
      background-color: rgba(170, 170, 170, 0.1);
    }
    .status {
      .design {
        padding: 8px;
        background-color: rgb(20, 90, 50);
        font-weight: 100;
        text-transform: uppercase;
        color: white;
        text-align: center;
        border-radius: 2px;
      }
    }
    .titulo {
      font-weight: 900;
    }
  }
}
</style>
