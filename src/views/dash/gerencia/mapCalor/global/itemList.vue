<template>
  <div class="item">
    <v-imagem :imagem="item.dados.imgMonitoramento" @handle="ViewIMAGE" />
    <div class="contain">
      <div class="informacao">
        <div class="titulo">Produção:</div>
        <div class="conteudo">{{ item.dados.nomeProducao }}</div>
      </div>
      <div class="informacao">
        <div class="titulo">Praga:</div>
        <div class="conteudo">{{ item.dados.especie }}</div>
      </div>
      <div class="informacao">
        <div class="titulo">Estágio:</div>
        <div class="conteudo">{{ item.dados.estagio.nome }}</div>
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
            <vColaborador :chave="item.dados.idColaborador" />
          </button>
        </div>
      </div>
      <div class="informacao">
        <div class="conteudo gps">
          <div>LAT.{{ item.dados.coord.lat }}</div>
          <div>LONG. {{ item.dados.coord.long }}</div>
        </div>
      </div>
      <div style="text-align:center;padding:4px;letter-spacing:1px;">
        <small
          ><i> ID: {{ item.dados.chave }}</i>
        </small>
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
import vColaborador from "@/components/idColaboradorPorNome";
import {
  servMonitorPragas,
  servMonitorDoencas,
  servMonitorDaninhas
} from "@/database.js";
export default {
  name: "itemList",
  components: {
    "v-imagem": vImagem,
    vColaborador
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
      }
      if (this.server == "pragas") {
        servMonitorPragas.child(chave).remove();
      } else if (this.server == "doencas") {
        servMonitorDoencas.child(chave).remove();
      } else if (this.server == "daninhas") {
        servMonitorDaninhas.child(chave).remove();
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
@import "./style/item.scss";
</style>
