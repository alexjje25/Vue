<template>
  <div>
    <div>
      <h1 class="tituloContent">SELECIONE O ESTOQUE</h1>
      <div class="painelSelect">
        <select v-model="modulo" class="selectModule">
          <option value="insumos" selected>Insumos</option>
          <option value="pecas">Peças</option>
          <option value="combustivel">combustivel</option>
        </select>
      </div>
      <div class="modules">
        <v-insumos v-if="modulo == 'insumos'" class="module" />
        <v-pecas v-if="modulo == 'pecas'" class="module" />
        <vComb v-if="modulo == 'combustivel'" class="module" />
      </div>
    </div>
  </div>
</template>

<script>
import vInsumos from "./insumos";
import vPecas from "./pecas";
import vComb from "./combustivel";

export default {
  components: {
    vInsumos,
    vPecas,
    vComb
  },
  data() {
    return {
      rota: "menu",
      modulo: "insumos"
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../template.scss";
</style>
