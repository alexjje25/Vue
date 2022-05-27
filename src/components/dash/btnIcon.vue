<template>
  <div class="btnPadrao" @click="click()">
    <img :src="iconRender" :alt="texto" />
    <div>{{ texto }}</div>
  </div>
</template>

<script>
export default {
  props: {
    texto: {
      default: "",
      type: String,
      required: true
    },
    icon: {
      default: "",
      type: String
    },
    valor: {
      default: "",
      type: String
    }
  },
  computed: {
    iconRender() {
      let localIcon = require("@/assets/icons/menu.png");
      let quantidade = this.icon.length;
      let result = quantidade > 3 ? this.icon : localIcon;
      return result;
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
  padding: 10px 10px;
  background-color: white;
  box-shadow: 1px 1px 4px rgba(40, 40, 40, 0.3);
  background-color: rgba(57, 134, 71, 1);
  color: white;
  font-weight: bolder;
  text-transform: uppercase;
  align-items: center;
  align-content: center;
  text-align: center;
  display: inline-grid;
  grid-template-columns: auto 1fr;
  border-radius: 8px;
  text-align: center;
  transition: 0.4s all;
  img {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin: 0px;
    margin-right: 6px;
  }
  &:hover {
    cursor: pointer;
    background-color: rgba(62, 145, 23, 1);
  }
  &.actived {
    //background-color: #031900;
    background-color: silver;
    color: white;
    box-shadow: 1px 1px 4px inset rgba(40, 40, 40, 0.3);
  }
}
</style>
