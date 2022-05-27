<template>
  <select v-model="valor">
    <option value="selecione">selecione</option>
    <option value="gasolina">Gasolina</option>
    <option value="etanal">Etanal</option>
    <option value="gasNatualVeicular">Gás Natural Veicular</option>
    <option value="oleoLubrificante">Óleo Lubrificante </option>
    <option value="queroseneAviao">Querosene de Aviação </option>
    <option value="gasolinaAviao">Gasolina de Aviação </option>
    <option value="etanalAviao">Etanol de Aviação </option>
    <option value="biocombustivel">Biocombustível</option>
    <option value="outros">Outros</option>
  </select>
</template>

<script>
export default {
  props: { valor: { default: undefined, type: String } }
};
</script>

<style></style>
