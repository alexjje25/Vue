<template>
  <div>
    <h1 class="tituloContent">SEMENTES EM ESTOQUE</h1>
    <div class="lista">
      <div class="itemHeader g7">
        <div>Nome</div>
        <div>Marca</div>
        <div>Fornecedor</div>
        <div>Estoque</div>
        <div>Unidade</div>
        <div>Cultivar</div>
        <div>Nº Nota Fiscal</div>
      </div>
      <div v-for="(item, index) in lista" :key="index" class="item g7">
        <div>{{ item.dados.nome }}</div>
        <div>{{ item.dados.marca }}</div>
        <div>{{ item.dados.fornecedor }}</div>
        <div>{{ item.dados.estoque }}</div>
        <div>{{ item.dados.unidade }}</div>
        <div>{{ item.dados.cultivar }}</div>
        <div>{{ item.dados.numeroNF }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    lista() {
      return this.$store.getters["fazenda/GET_ESTOQUE"];
    },
    fornecedores() {
      return this.$store.getters["fazenda/GET_FORNECEDORES"];
    }
  }
};
</script>

<style lang="scss" scoped>
.lista {
  .itemHeader {
    font-weight: 600;
    text-transform: uppercase;
  }
  .item {
    padding: 4px;
    &:nth-child(2n) {
      background-color: rgba(70, 70, 70, 0.1);
    }
  }
  .g7 {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
}
</style>
