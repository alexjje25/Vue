<template>
  <div class="vheader">
    <div>Bem vindo(a) {{ info.name.toUpperCase() }}</div>
    <div>DASHBOARD</div>
    <div><button class="btn logoff" @click="sair()">SAIR</button></div>
  </div>
</template>

<script>
export default {
  computed: {
    info() {
      return this.$store.getters["auth/GET_INFO"];
    }
  },
  methods: {
    sair() {
      this.$store.dispatch("admin/CLEAR");
      this.$store.dispatch("auth/CLEAR");
    }
  }
};
</script>

<style lang="scss" scoped>
.vheader {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: rgba(22, 160, 133, 1);
  color: rgba(236, 240, 241, 1);
  color: white;
  align-content: center;
  align-items: center;
  font-weight: bolder;
  & > div {
    padding: 10px;
    &:nth-child(1) {
      text-align: left;
    }
    &:nth-child(2) {
      text-align: center;
    }
    &:nth-child(3) {
      text-align: right;
    }
  }
  .logoff {
    padding: 10px 20px;
    background-color: rgba(50, 50, 50, 0.4);
    color: rgba(236, 240, 241, 1);
    font-weight: bolder;
    border: none;
    cursor: pointer;
  }
}
</style>
