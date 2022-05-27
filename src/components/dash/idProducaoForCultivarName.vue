<template>
  <div>
    {{ renderME.dados.cultivar }}
  </div>
</template>

<script>
//import vCultivar from "@/components/dash/idCultivarForName"; não necessario cultivar já é pelo nome
export default {
  props: { chave: { default: undefined, type: String } },
  computed: {
    renderME() {
      return this.$store.getters["fazenda/GET_PRODUCOES"].find(
        item => item.chave == this.chave
      );
    }
  }
};
</script>
