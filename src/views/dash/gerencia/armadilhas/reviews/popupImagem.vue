<template>
  <div class="boxpopup">
    <div class="popup">
      <button @click="close()">FECHAR</button><br />
      <img
        v-if="
          imagem !== null &&
            imagem !== undefined &&
            imagem != 'none' &&
            imagem != ''
        "
        class="photo"
        :src="imagem"
      />

      <img v-else class="photo" :src="imagemStatic" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imagem: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      imagemStatic: require("@/assets/image/monitor-guest.jpg")
    };
  },
  methods: {
    close() {
      this.$emit("closepopup", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.boxpopup {
  position: fixed;
  top: 0px;
  left: 0px;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  background-color: rgba(51, 101, 53, 0.93);
  z-index: 99;
  .popup {
    text-align: center;
    padding: 20px;
    color: white;
    button {
      padding: 14px 20px;
      background-color: rgba(163, 189, 49, 1);
      box-shadow: 4px -4px 10px rgba(1, 51, 1, 0.5);
      color: white;
      font-weight: 900;
      border: none;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    img {
      width: auto;
      height: auto;
      min-width: 300px;
      max-height: 650px;
      box-shadow: 0px 0px 35px rgba(1, 51, 1, 0.5);
      border: 4px solid rgba(163, 189, 49, 1);
    }
  }
}
</style>
