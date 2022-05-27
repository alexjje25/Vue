<template>
  <div class="menu">
    <div class="icon">
      <router-link to="/representante">
        <img
          src="@/assets/icons/monitorar.png"
          class="icone"
        /><br />Clientes</router-link
      >
    </div>
    <div class="icon">
      <router-link to="/representante">
        <img
          src="@/assets/icons/armadilhas.png"
          class="icone"
        /><br />Suporte</router-link
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.menu {
  padding: 0px;
  text-align: center;
  font-size: 14px;
  min-width: 100px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  //background-color: rgba(28, 56, 21, 1);
  background-color: #031900;
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(5, 1fr);
  }
  img {
    width: 40px;
    height: 40px;
  }
  div.icon {
    font-size: 12px;
    color: white;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .brand {
    font-weight: 900;
    color: rgba(255, 255, 255, 1);
    font-size: 12px;
    padding: 10px;
  }
  a {
    display: block;
    text-decoration: none;
    //background-color: rgba(28, 56, 21, 0.5);
    color: white;
    padding: 8px 10px;
    transition: 0.2s all;
    border-bottom: 2px solid rgba(255, 255, 255, 0);
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      cursor: pointer;
    }
    &.router-link-active {
      background-color: white;
      color: black;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
  }
}
</style>
