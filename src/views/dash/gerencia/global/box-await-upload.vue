<template>
  <div class="boxblack">
    <h3>Carregando imagem, não saia da pagina, aguarde...</h3>
    <div>{{ porcente }}</div>
    <progress :value="atual" :max="total"></progress>
  </div>
</template>

<script>
export default {
  props: ["total", "atual", "porcente"]
};
</script>

<style lang="scss" scoped>
.boxblack {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  background-color: rgba(255, 255, 255, 1);
}
</style>
