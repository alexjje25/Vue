<template>
  <div>
    <v-btn
      v-if="rota == 'lista'"
      texto="Cadastrar Insumo"
      @handleClick="folha('include')"
    />
    <v-btn
      v-if="rota == 'include'"
      texto="Insumos cadastrados"
      @handleClick="folha('lista')"
    />
    <div class="contain">
      <v-lista v-if="rota == 'lista'" />
      <v-include v-if="rota == 'include'" />
    </div>
  </div>
</template>

<script>
import vbtn from "@/components/dash/btn";
import vLista from "./lista";
import vInclude from "./include";

export default {
  components: {
    "v-btn": vbtn,
    "v-include": vInclude,
    "v-lista": vLista
  },
  data() {
    return {
      rota: "lista"
    };
  },
  methods: {
    folha(mtd) {
      this.rota = mtd;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/formInclude.scss";
</style>
