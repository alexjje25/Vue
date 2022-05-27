<template>
  <div class="menu">
    <router-link to="/dash/admin/home">Home</router-link>
    <router-link to="/dash/admin/mapsite">Acesso Rápido</router-link>
    <!--
    <div class="icon"><icone :icon="['fas', 'users']" /> TOOLS</div>
    <router-link to="/dash/admin/signup">SIGNUP'S</router-link>
    <router-link to="/dash/admin/colors">CORES</router-link>
    <router-link to="/dash/admin/talhoes">Talhões</router-link>
    <div class="icon"><icone :icon="['fas', 'users']" /> Users</div>
    <router-link to="/dash/admin/users/lista">Lista</router-link>
    <router-link to="/dash/admin/users/include">Novo</router-link>
    <div class="icon"><icone :icon="['fas', 'bug']" /> Armadilhas</div>
    <router-link to="/dash/admin/armadilhas/lista">Lista</router-link>
    <router-link to="/dash/admin/armadilhas/include">Nova</router-link>
    <div class="icon"><icone :icon="['fas', 'bug']" /> Pragas</div>
    <router-link to="/dash/admin/pragas/lista">Lista</router-link>
    <router-link to="/dash/admin/pragas/include">Nova</router-link>
    <div class="icon"><icone :icon="['fas', 'bug']" /> Daninhas</div>
    <router-link to="/dash/admin/daninhas/lista">Lista</router-link>
    <router-link to="/dash/admin/daninhas/include">Nova</router-link>
    <div class="icon"><icone :icon="['fas', 'bug']" /> Doenças</div>
    <router-link to="/dash/admin/doencas/lista">Lista</router-link>
    <router-link to="/dash/admin/doencas/include">Nova</router-link>
    -->
  </div>
</template>

<style lang="scss" scoped>
.menu {
  padding: 0px;
  text-align: center;
  font-size: 14px;
  background-color: rgba(55, 55, 55, 1);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  a {
    margin-top: 4px;
    margin-left: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    display: block;
    text-decoration: none;
    background-color: rgba(95, 95, 95, 0.5);
    color: rgba(255, 255, 255, 1);
    padding: 12px;
    transition: 0.4s all;
    font-weight: 600;
    &:hover {
      background-color: rgba(155, 155, 155, 1);
      color: rgba(55, 55, 55, 1);
    }
    &.router-link-active {
      background-color: rgba(255, 255, 255, 1);
      color: rgba(55, 55, 205, 1);
    }
  }
}
</style>
