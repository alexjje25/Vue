<template>
  <div class="item">
    <v-imagem :imagem="item.dados.imgMonitoramento" @handle="ViewIMAGE" />
    <div class="contain">
      <div class="informacao">
        <div class="titulo">Alerta:</div>
        <div class="conteudo">{{ item.dados.nameAlerta }}</div>
      </div>
      <div class="informacao">
        <div class="titulo">Produção:</div>
        <div class="conteudo">{{ item.dados.nomeProducao }}</div>
      </div>
      <div class="informacao">
        <div class="titulo">Observação:</div>
        <div class="conteudo">
          <span
            v-if="item.dados.observacao.length > 3"
            style="color: rgb(205,100,10); font-weight: bolder"
            >{{ item.dados.observacao }}</span
          >
          <span v-else style="color: rgb(150,150,150); font-weight: bolder"
            >Não contém observação</span
          >
        </div>
      </div>
      <div class="informacao">
        <div class="titulo">Colaborador:</div>
        <div class="conteudo">
          <button
            class="refUser"
            @click="viewFuncionario(item.dados.idColaborador)"
          >
            <div
              v-for="(colab, index) in colaboradores.filter(
                core => core.chave == item.dados.idColaborador
              )"
              :key="index"
            >
              {{ colab.dados.name }}
            </div>
          </button>
        </div>
      </div>
      <div style="text-align:center;padding:4px;letter-spacing:1px;">
        <small
          ><i> ID: {{ item.dados.chave }}</i></small
        >
      </div>
    </div>
    <div v-if="GET_NIVEL == 99" class="rootSection">
      <button class="rootBtn" @click="removerDB(item.chave)">
        REMOVER
      </button>
    </div>
  </div>
</template>

<script>
import vImagem from "./imagem";
import { servAlertas } from "@/database.js";
export default {
  components: {
    "v-imagem": vImagem
  },
  props: {
    item: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    },
    server: {
      type: String,
      required: false,
      default: ""
    }
  },
  computed: {
    GET_NIVEL() {
      return this.$store.getters["auth/GET_NIVEL"];
    },
    producoes() {
      return this.$store.getters["fazenda/GET_PRODUCOES"];
    },
    colaboradores() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    }
  },
  methods: {
    removerDB(chave) {
      let confirmacao = window.confirm(
        "TEM CERTEZA QUE QUER EXCLUIR ESSE MONITORAMENTO?"
      );
      if (!confirmacao) {
        return false;
      } else {
        servAlertas.child(chave).remove();
      }
    },
    ViewIMAGE(val) {
      this.$emit("handleView", val);
    },
    viewFuncionario(param1) {
      this.$router.push("/dash/gerencia/colaboradores/view?q=" + param1);
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  width: 200px;
  font-weight: lighter;
  margin: 10px;
  border-radius: 10px;
  background-color: white;
  padding: 4px;
  box-shadow: 0px 0px 10px rgba(62,145,23, 0.5);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "vimagem" "contain";
  .contain {
    grid-area: contain;
    letter-spacing: 0px; //update 29/05
    .informacao {
      padding: 5px;
    }
    .titulo {
      text-transform: uppercase;
      font-size: 12px;
    }
    .conteudo {
      font-weight: 600;
      padding: 0px;
      font-size: 14px;
    }
  }
  .imagem {
    grid-area: vimagem;
  }
  & > div {
    padding: 5px;
  }
  .refUser {
    padding: 4px 6px;
    background-color: cadetblue;
    color: white;
    font-weight: 100;
    border: none;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
    }
  }
  .descricao {
    p {
      margin: 0px;
      display: block;
      padding: 4px;
    }
    padding: 4px;
  }
  img {
    width: 150px;
    height: 100px;
  }
}
</style>
