<template>
  <div>
    <black-box v-if="mount.active == true"></black-box>
    <div class="tituloContent">LISTA DE APLICAÇÕES E INSUMOS</div>
    <div class="boxPadrao centralizaTudo">
      <div class="buscador g4">
        <div>
          <select v-model="search.estado">
            <option value="">Estado</option>
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
        <div>
          <input v-model="search.dataInicial" type="date" />
        </div>
      </div>
    </div>

    <box-popup
      v-if="mount.active == true"
      :item="mount.item"
      @CLOSE_ME="clearMount()"
    />

    <div class="lista">
      <div
        v-for="(item, index) in aplicacoes"
        :key="index"
        class="item boxPadrao"
        :class="{
          is0: item.dados.status == 0,
          is1: item.dados.status == 1,
          is2: item.dados.status == 2,
          is3: item.dados.status == 3
        }"
      >
        <div v-if="GET_NIVEL == 99" class="rootSect">
          <button class="rootBtn " @click="removeDB(item.chave)">
            <img src="@/assets/icons/sinais/multiplicar-white.png" />
          </button>
        </div>
        <div class="smallDate">
          <div class="tt">Criado:</div>
          <div class="dd">
            {{ item.dados.createdTimestamp | formatTimeStamp }}
          </div>
        </div>
        <div>
          <div class="tt">Aplicação</div>
          <div class="dd">{{ item.dados.titulo }}</div>
        </div>
        <div>
          <div class="tt">Produto</div>
          <div class="dd"><vProduto :chave="item.dados.idProduto" /></div>
        </div>
        <div>
          <div class="tt">Produção</div>
          <div class="dd"><producao-for-id :id="item.dados.idProducao" /></div>
        </div>
        <div>
          <div class="tt">Data p/ aplicação</div>
          <div class="dd">{{ item.dados.dataAplicacao | dataPadrao }}</div>
        </div>
        <div>
          <div class="tt">STATUS</div>
          <div class="dd">
            {{ item.dados.status | statusName }}
          </div>
        </div>
        <div style="text-align:center">
          <br />
          <vBtn name="DETALHES" @handle="ABRIR_ITEM(item)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { servAplicacoes } from "@/database.js";
import producaoForId from "../global/producaoForID";
import vProduto from "@/components/dash/idProdutoForName";
import moment from "moment";
import boxPopup from "./boxPopup.vue";
import blackBox from "@/components/blackboxZ30";
import vBtn from "@/components/dash/btnIconMini";
import { GET_NIVEL } from "@/mixins/global.js";

export default {
  components: {
    producaoForId,
    boxPopup,
    blackBox,
    vBtn,
    vProduto
  },
  filters: {
    dataPadrao: function(novo) {
      return moment(novo).format("DD/MM/YYYY");
    },
    formatTimeStamp: function(valor) {
      let resp = Number(valor);
      return moment(resp).format("DD/MM/YYYY");
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
  mixins: [GET_NIVEL],
  data() {
    return {
      mount: {
        active: false,
        item: "",
        monitoramento: []
      },
      search: {
        setor: "",
        colaborador: "",
        producao: "",
        estado: ""
      }
    };
  },
  computed: {
    setores() {
      return this.$store.getters["fazenda/GET_SETORES"];
    },
    aplicacoes() {
      let lista = this.$store.getters["fazenda/GET_APLICACOES"].filter(item => {
        let colab1 = String(this.search.colaborador);
        let colab2 = String(item.dados.idColaborador);

        let setor1 = String(this.search.setor.toUpperCase());
        let setor2 = String(item.dados.setor.toUpperCase());

        let producao1 = String(this.search.producao);
        let producao2 = String(item.dados.idProducao);

        let status = String(this.search.estado);
        let status2 = String(item.dados.status);
        return (
          colab2.match(colab1) &&
          setor2.match(setor1) &&
          producao2.match(producao1) &&
          status2.match(status)
        );
      });
      /*if(this.search.order == 'crescente'){

      } else {

      }*/
      return lista.reverse();
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
    clearMount() {
      this.mount.active = false;
      this.mount.item = "";
    },
    ABRIR_ITEM(item) {
      this.mount.item = item;
      this.mount.active = true;
    },
    removeDB(chave) {
      var confirma = window.confirm("Excluir essa aplicação? ");
      if (confirma == true) {
        servAplicacoes.child(chave).remove();
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.rootSect {
  position: absolute;
  img {
    width: 30px;
    height: 30px;
  }
  .rootBtn {
    opacity: 1;
    padding: 2px;
    padding-bottom: 3px;
    border-radius: 100px;
    display: inline-grid;
    margin-top: -75px;
    margin-left: -35px;
    .hidden {
      display: none;
    }
    &:hover {
      display: inline-grid;
      grid-template-columns: 1fr 1fr;
      .hidden {
        display: inline-grid;
      }
    }
  }
}
.smallDate {
  color: rgba(120, 120, 120, 1);
  font-size: 12px;
  padding: 10px;
}
.elipsetxt {
  text-overflow: ellipsis;
  max-height: 160px;
  white-space: wrap;
  overflow: auto;
}
$tabela: 1fr 1fr 1fr 1fr;
$status0: #878787;
$status1: #f39200;
$status2: #008d36;
$status3: #be1622;
$sim: #e94e1b;
$nao: #95c11f;
.lista {
  display: flex;
  //grid-template-columns: $tabela;
  flex-wrap: wrap;
  .item {
    width: 200px;
    margin: 5px;
    border-radius: 5px;
    padding: 20px;
    font-weight: 100;
    text-align: left;
    color: black;
    &.is0 {
      border-top: 12px solid $status0;
    }
    &.is1 {
      border-top: 12px solid $status1;
    }
    &.is2 {
      border-top: 12px solid $status2;
    }
    &.is3 {
      border-top: 12px solid $status3;
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
