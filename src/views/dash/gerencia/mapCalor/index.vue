<template>
  <div class="reports">
    <div class="UIrota">
      <div class="menu">
        <router-link to="/dash/gerencia/heatmap/pragas">
          <img src="@/assets/icons/rurall-51.png" />
          <div>Pragas</div>
        </router-link>
        <router-link to="/dash/gerencia/heatmap/doencas">
          <img src="@/assets/icons/rurall-52.png" />
          <div>Doenças</div>
        </router-link>
        <router-link to="/dash/gerencia/heatmap/daninhas">
          <img src="@/assets/icons/rurall-53.png" />
          <div>Daninhas</div>
        </router-link>
        <a v-if="false">
          <img src="@/assets/icons/rurall-54.png" />
          <div>Alerta</div>
        </a>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {};
</script>

<style lang="scss" scoped>
.reports {
  height: 100vh;
  .UIrota {
    .menu {
      text-align: center;
      padding: 10px;
      background-color: white;
    }
    a {
      margin: 5px;
      background-color: rgb(57, 134, 71);
      color: white;
      text-decoration: none;
      font-weight: 900;
      display: inline-block;
      border-radius: 5px;
      text-align: center;
      align-content: center;
      align-items: center;
      align-self: center;
      display: inline-grid;
      grid-template-columns: auto 1fr;
      padding: 10px;
      & > div {
        padding: 10px;
      }
      img {
        width: auto;
        height: 35px;
        display: inline-block;
      }
      &.router-link-active {
        background-color: #031900;
      }
    }
  }
}
</style>
