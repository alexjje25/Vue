<template>
  <div class="item">
    <div class="expo">
      <div class="imagemTrap">
        <img src="@/assets/icons/armadilhas-branco.png" alt="armadilhas" />
      </div>
      <div class="titulo">
        {{ item.dados.nomeArmadilha.toUpperCase() }}
      </div>
    </div>
    <div class="contain">
      <div class="informacao">
        <div class="titulo">Produção:</div>
        <div class="conteudo">
          <div
            v-for="(item2, index) in producoes.filter(
              it => it.chave == item.dados.idProducao
            )"
            :key="index"
          >
            {{ item2.dados.name.toUpperCase() }}
          </div>
        </div>
      </div>
      <div class="informacao">
        <div class="titulo">Colaborador:</div>
        <div class="conteudo center">
          <div
            style="cursor: pointer"
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
          </div>
        </div>
      </div>
      <div class="informacao">
        <div class="titulo">
          GPS - LAT / LONG
        </div>
        <div class="conteudo center">
          {{ item.dados.coord.long }}, {{ item.dados.coord.lat }}
        </div>
      </div>
      <div class="informacao center">
        <button class="btnMonitor" @click="ViewProd(item.chave)">
          MONITORAMENTOS
        </button>
      </div>
      <div style="text-align:center;padding:4px;letter-spacing:1px;">
        <small
          ><i> ID: {{ item.dados.chave }}</i>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
// especifico para TRAPS - NÃO REPLICAR!!!!
//import vImagem from "./imagem";

export default {
  components: {
    //"v-imagem": vImagem
  },
  props: ["item"],
  computed: {
    producoes() {
      return this.$store.getters["fazenda/GET_PRODUCOES"];
    },
    colaboradores() {
      return this.$store.getters["fazenda/GET_COLABORADORES"];
    },
    GET_REVIEWS() {
      return this.$store.getters[""];
    }
  },
  methods: {
    ViewProd(chave) {
      this.$emit("handleReviews", chave);
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
