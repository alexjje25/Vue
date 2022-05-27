<template>
  <div class="vheader">
    <div class="logomarca">
      <img src="@/assets/icons/logo-white.png" />
    </div>
    <vUserDetails class="description" />
    <div class="logoff" @click="sair()"></div>
  </div>
</template>

<script>
import vUserDetails from "./userDetails";
export default {
  components: {
    vUserDetails
  },
  methods: {
    sair() {
      this.$store.dispatch("fazenda/CLEAR");
      this.$store.dispatch("auth/CLEAR");
    }
  }
};
</script>

<style lang="scss" scoped>
.vheader {
  display: grid;
  grid-template-columns: auto 1fr 100px;
  background-color: #123301;
  color: white;
  align-content: center;
  align-items: center;
  font-weight: bolder;
  & > div {
    padding: 10px;
    text-transform: uppercase;
    &.logomarca {
      text-align: left;
    }
    &.logoff {
      text-align: right;
    }
    &.description {
      text-align: center;
      font-weight: 500;
      font-size: 12px;
    }
  }
  .logomarca {
    text-align: left;
    img {
      width: 120px;
    }
  }
  .logoff {
    text-align: right;
    background-image: url("../../../../assets/icons/off.png");
    background-size: auto 30px;
    background-repeat: no-repeat;
    background-position: center;
    height: 80px;
    padding: 0px;
    border-radius: 0px;
    color: white;
    font-weight: bolder;
    border: none;
    //background-color: rgba(170, 20, 20, 0.2);
    cursor: pointer;
    text-align: center;
    align-content: center;
    align-items: center;
    &:hover {
      background-image: url("../../../../assets/icons/off-hover.png");
    }
  }
}
</style>
