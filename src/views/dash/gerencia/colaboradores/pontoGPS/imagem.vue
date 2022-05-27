<template>
  <div style="text-align: center;">
    <div
      v-if="
        imagem !== null &&
          imagem !== undefined &&
          imagem !== 'none' &&
          imagem !== ''
      "
    >
      <img class="photo" :src="imagem" @click="emitHandle()" />
    </div>

    <div v-else>
      <img
        class="photo"
        :src="require('@/assets/image/sem-foto.jpg')"
        @click="emitHandle()"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: { imagem: { default: "none", type: String } },
  data() {
    return {
      imagemProcessada: "",
      imageRender: ""
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
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.photo {
  width: 120px;
  max-height: 120px;
  transition: 0.5s opacity;
  border-radius: 4px;
  margin: 10px;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
}
</style>
