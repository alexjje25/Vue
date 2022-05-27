<template>
  <div class="btnPadrao" @click="click()">
    <div>
      {{ texto }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    texto: {
      default: "",
      type: String
    },
    valor: {
      default: "",
      type: String
    }
  },
  methods: {
    click() {
      this.$emit("handleClick", this.valor);
    }
  }
};
</script>

<style lang="scss" scoped>
.btnPadrao {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
  margin: 5px;
  padding: 10px 20px;
  background-color: white;
  box-shadow: 1px 1px 4px rgba(40, 40, 40, 0.3);
  display: inline-block;
  background-color: rgba(57, 134, 71, 1);
  color: white;
  font-weight: bolder;
  text-transform: uppercase;
  align-items: center;
  align-content: center;
  text-align: center;
  border-radius: 8px;
  transition: 0.4s all;
  &.icon {
    display: inline-grid;
    grid-template-columns: auto 1fr;
  }
  img {
    display: inline-block;
    width: auto;
    height: 30px;
    margin: 5px;
  }
  &:hover {
    cursor: pointer;
    background-color: rgba(62, 145, 23, 1);
  }
}
</style>
