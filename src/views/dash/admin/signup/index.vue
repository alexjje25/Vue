<template>
  <div>
    <div class="menu">
      <button @click="paper('cadastro-cliente')">Cadastro de Cliente</button>
      <button @click="paper('cadastro-fazenda')">Cadastro de Fazenda</button>
      <button @click="paper('')">....</button>
    </div>
    <div class="conteudo">
      <v-cadastro-cliente v-if="folha == 'cadastro-cliente'" />
      <v-cadastro-fazenda v-if="folha == 'cadastro-fazenda'" />
    </div>
  </div>
</template>

<script>
import vCliente from "./cliente";
import vFazenda from "./fazenda";

export default {
  components: {
    "v-cadastro-cliente": vCliente,
    "v-cadastro-fazenda": vFazenda
  },
  data() {
    return {
      folha: ""
    };
  },
  methods: {
    paper(mtd) {
      this.folha = mtd;
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  padding: 2px;
  background-color: rgba(40, 80, 50, 0.5);
  button {
    padding: 10px;
    background-color: rgba(40, 80, 50, 0.5);
    margin: 2px;
    color: white;
    border: none;
  }
}
</style>
