<template>
  <div style="text-align: center;">
    <img
      v-if="
        imagem !== null &&
          imagem !== undefined &&
          imagem != 'none' &&
          imagem != ''
      "
      class="photo"
      :src="imagem"
      @click="emitHandle()"
    />
    <img v-else class="photo" :src="imagemStatic" @click="emitHandle()" />
  </div>
</template>

<script>
export default {
  props: { imagem: { default: "none", type: String } },
  data() {
    return {
      imagemProcessada: "",
      imagemStatic: require("@/assets/image/monitor-guest.jpg")
    };
  },
  methods: {
    emitHandle() {
      var payload;
      if (this.imagem == null || this.imagem == undefined) {
        payload = false;
      } else {
        payload = this.imagem;
      }
      this.$emit("handle", payload);
    }
  }
};
</script>

<style lang="scss" scoped>
.photo {
  width: 80px;
  height: 80px;
  transition: 0.5s opacity;
  border-radius: 4px;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
}
</style>
