<template>
  <div class="menu">
    <div class="icon">
      <router-link to="/dash/gerencia/mapas">
        <img src="@/assets/icons/fazendas.png" class="icone" />
        <br />MAPAS
      </router-link>
    </div>

    <div class="icon">
      <router-link to="/dash/gerencia/reports">
        <img src="@/assets/icons/monitorar.png" class="icone" />
        <br />Monitorar
      </router-link>
    </div>

    <div class="icon">
      <router-link to="/dash/gerencia/heatmap">
        <img src="@/assets/icons/mapa-calor.png" class="icone" />
        <br />Mapa de Calor
      </router-link>
    </div>

    <div class="icon">
      <router-link to="/dash/gerencia/armadilhas">
        <img src="@/assets/icons/armadilhas.png" class="icone" />
        <br />Armadilhas
      </router-link>
    </div>
    <div class="icon">
      <router-link to="/dash/gerencia/alertas">
        <img :src="require('@/assets/icons/menu-alerta.png')" class="icone" />
        <br />Alertas
      </router-link>
    </div>

    <div class="icon" v-if="PROCESSENV == 'development'">
      <router-link to="/dash/gerencia/rota-colaborador">
        <img :src="require('@/assets/icons/menu-alerta.png')" class="icone" />
        <br />Rota
      </router-link>
    </div>

    <div class="icon">
      <router-link to="/dash/gerencia/tarefas">
        <img src="@/assets/icons/menu_tarefas.png" class="icone" />
        <br />TAREFAS
      </router-link>
    </div>

    <div class="icon">
      <router-link to="/dash/gerencia/aplicacoes">
        <img src="@/assets/icons/aplicacoes.png" class="icone" />
        <br />APLICAÇÕES
      </router-link>
    </div>

    <div class="icon">
      <router-link to="/dash/gerencia/producoes">
        <img src="@/assets/icons/producoes.png" class="icone" />
        <br />PRODUÇÕES
      </router-link>
    </div>

    <div class="icon">
      <router-link to="/dash/gerencia/cadastros">
        <img src="@/assets/icons/cadastros.png" class="icone" />
        <br />CADASTROS
      </router-link>
    </div>

    <div class="icon">
      <router-link to="/dash/gerencia/colaboradores">
        <img src="@/assets/icons/colaborador-green.png" class="icone" />
        <br />colaboradores
      </router-link>
    </div>

    <div class="icon">
      <router-link to="/dash/gerencia/estoque">
        <img src="@/assets/icons/estoque.png" class="icone" />
        <br />ESTOQUE
      </router-link>
    </div>

 
  </div>
</template>

<script>
export default {
  mounted() {
    window.console.log(process.env.NODE_ENV);
  },
  computed: {
    PROCESSENV() {
      return process.env.NODE_ENV;
    }
  }
};
</script>

<style lang="scss" scoped>
$sizeMenu: repeat(12, 1fr);
.menu {
  padding: 0px;
  text-align: center;
  font-size: 14px;
  display: grid;
  grid-template-columns: $sizeMenu;
  background-color: #031900;
  @media screen and (max-width: 900px) {
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
    &.danger {
      background-color: rgb(208, 0, 31);
      &:hover {
        background-color: rgb(238, 0, 61);
      }
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      cursor: pointer;
    }
    &.router-link-active {
      background-color: white;
      color: black;
      //border-top-left-radius: 6px;
      //border-top-right-radius: 6px;
    }
  }
}
</style>
