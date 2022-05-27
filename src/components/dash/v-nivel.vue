<template>
  <div class="nivel">
    <div class="escopo" :class="nivel">
      <img :src="require(`@/assets/${nivel}.png`)" />
      <div class="text">{{ nivel }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nivel: {
      default: "undefined",
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
.nivel {
  display: inline-block;
  .escopo {
    display: grid;
    grid-template-columns: auto 150px;
    grid-gap: 5px;
    padding: 0px;
    align-content: center;
    align-items: center;
    text-align: center;
    border-radius: 10px;
    /*&::after {
      content: "NIVEL";
      position: absolute;
      margin-top: -18px;
      margin-left: 150px;
      color: black;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 50px;
      padding: 5px 10px;
      text-align: center;
      align-items: center;
      align-content: center;
      font-weight: lighter;
      font-size: 12px;
      box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.8);
    }*/
    &.CRITICO {
      background-color: rgb(175, 2, 39);
    }
    &.PREOCUPANTE {
      background-color: rgb(232, 141, 53);
    }
    &.LEVE {
      background-color: rgb(0, 171, 71);
    }
    &.MODERADO {
      background-color: rgb(42, 101, 61);
    }

    img {
      width: 50px;
    }
    .text {
      font-weight: 600;
      color: white;
      padding: 0px 20px;
    }
  }
}
</style>
