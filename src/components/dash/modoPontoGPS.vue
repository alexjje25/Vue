<template>
  <div>
    <span v-if="modo == '1'">
      ENTRADA
    </span>
    <span v-if="modo == '2'">
      INÍCIO DO DESCANSO
    </span>
    <span v-if="modo == '3'">
      FIM DO DESCANSO
    </span>
    <span v-if="modo == '4'">
      SAÍDA
    </span>
    <span v-if="modo !== '1' && modo !== '2' && modo !== '3' && modo !== '4'">
      FORA DO PADRÃO
    </span>
  </div>
</template>

<script>
export default {
  props: ["modo"]
};
</script>

<style></style>
