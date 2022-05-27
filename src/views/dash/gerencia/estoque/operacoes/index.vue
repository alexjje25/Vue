<template>
  <div>
    <div>
      <h1 class="tituloContent">NOVA OPERAÇÃO DE ENTRADA/SAÍDA</h1>
      <div class="painelSelect">
        <select v-model="modulo" class="selectModule">
          <option value="insumos">Insumos</option>
          <option value="pecas">Peças</option>
          <option value="combustivel">Combustivel</option>
        </select>
      </div>
      <div class="modules">
        <v-insumos v-if="modulo == 'insumos'" class="module" />
        <v-pecas v-if="modulo == 'pecas'" class="module" />
        <v-combustivel v-if="modulo == 'combustivel'" class="modulo" />
      </div>
    </div>
  </div>
</template>

<script>
import vInsumos from "./insumos";
import vPecas from "./pecas";
import vCombustivel from "./combustivel";

export default {
  components: {
    vInsumos,
    vPecas,
    vCombustivel
  },
  data() {
    return {
      rota: "menu",
      modulo: "insumos"
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../template";
</style>
