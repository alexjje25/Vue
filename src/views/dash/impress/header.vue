<template>
  <div class="header">
    <div class="left">
      <img class="logo" src="@/assets/icons/logo.png" />
    </div>
    <div class="right">
      <div>FAZENDA: <br />{{ FAZENDA_NAME }}</div>
      <br />
      <div>
        LOCALIZAÇÃO EM GPS:<br />
        {{ FAZENDA_GPS.x }}, {{ FAZENDA_GPS.y }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    FAZENDA_NAME() {
      return this.$store.state.fazenda.minhaFazenda.nome;
    },
    FAZENDA_PROPRIETARIO() {
      return this.$store.state.fazenda.minhaFazenda.idProprietario; //rever
    },
    FAZENDA_GPS() {
      return this.$store.state.fazenda.minhaFazenda.coord;
    },
    FAZENDA_HECTARES() {
      return this.$store.state.fazenda.minhaFazenda.hectares;
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  margin-bottom: 5px;
  .right {
    font-size: 12px;
    text-align: left;
    align-content: center;
    align-items: center;
    align-self: center;
    font-weight: 600;
    letter-spacing: 1px;
  }
  .left {
    .logo {
      width: 200px;
    }
  }
}
</style>
