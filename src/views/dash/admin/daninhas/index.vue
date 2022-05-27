<template>
  <div>
    <div class="submenu">
      <div class="icon"><icone :icon="['fas', 'bug']" /> Daninhas</div>
      <div class="links">
        <router-link to="/dash/admin/daninhas/lista">Lista</router-link>
        <router-link to="/dash/admin/daninhas/include">Nova</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.submenu {
  background-color: rgba(35, 35, 35, 1);
  color: white;
  padding: 5px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  .icon {
    color: white;
    padding: 10px;
  }
  .links {
    padding: 10px;
    a {
      margin: 2px;
      color: white;
      background-color: rgba(35, 35, 35, 1);
      padding: 8px 20px;
      border-radius: 20px;
      text-decoration: none;
      &.router-link-active {
        color: rgba(35, 35, 35, 1);
        background-color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
