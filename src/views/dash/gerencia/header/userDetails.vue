<template>
  <div>
    <transition name="fade">
      <div v-show="render == true">
        <div>
          <b>{{ nomeFazenda }}</b>
        </div>
        <div>{{ hectares }} Hectares</div>
        <div>LAT.: {{ coord.x }} LONG.: {{ coord.y }}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      render: false,
      nomeFazenda: "",
      hectares: "",
      coord: {
        x: "",
        y: ""
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.nomeFazenda = this.$store.getters[
        "fazenda/GET_MINHAFAZENDA"
      ].nomeFazenda;
      this.hectares = this.$store.getters["fazenda/GET_MINHAFAZENDA"].hectares;
      this.coord.x = this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.x;
      this.coord.y = this.$store.getters["fazenda/GET_MINHAFAZENDA"].coord.y;
      this.render = true;
    }, 2000);
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
</style>
