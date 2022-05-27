<template>
  <div class="marginPadrao">
    <div class="menu">
      <v-btn
        :icon="require('@/assets/icons/ico-relatorio-w.png')"
        texto="RELATÓRIO"
        valor="relatorio"
        :class="{ actived: rota == 'relatorio' }"
        @handleClick="handle"
      />
      <v-btn
        texto="ESTOQUE"
        valor="estoque"
        @
        :icon="require('@/assets/icons/ico-estoque.png')"
        :class="{ actived: rota == 'estoque' }"
        @handleClick="handle"
      />
      <v-btn
        :icon="require('@/assets/icons/ico-produto-w.png')"
        texto="NOVO PRODUTO"
        valor="novo-produto"
        :class="{ actived: rota == 'novo-produto' }"
        @handleClick="handle"
      />
      <v-btn
        texto="NOVA OPERAÇÃO"
        valor="operacoes"
        :icon="require('@/assets/icons/ico-operacao.png')"
        :class="{ actived: rota == 'operacoes' }"
        @handleClick="handle"
      />
    </div>
    <div>
      <vRelatorios v-if="rota == 'relatorio'" />
      <lista-produtos v-if="rota == 'estoque'" />
      <novo-produto v-if="rota == 'novo-produto'" />
      <v-operacoes v-if="rota == 'operacoes'" />
    </div>
  </div>
</template>

<script>
import vBtn from "@/components/dash/btnIcon";
import novoProduto from "./novoProduto/index";
import listaProdutos from "./listaEstoque";
import vOperacoes from "./operacoes";
import vRelatorios from "./relatorio/index";

export default {
  name: "Estoque",
  components: {
    vBtn,
    novoProduto,
    listaProdutos,
    vOperacoes,
    vRelatorios
    //vSaida
  },
  data() {
    return {
      rota: ""
    };
  },
  mounted() {
    this.rota = "relatorio";
  },
  methods: {
    handle(recebido) {
      this.rota = recebido;
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  margin-top: 10px;
  text-align: center;
}
</style>
