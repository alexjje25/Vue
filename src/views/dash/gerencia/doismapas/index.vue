<template>
  <div class="reports">
    <div class="UIrota">
      <div class="menu">
        <router-link to="/dash/gerencia/mapas/pragas">
          <img src="@/assets/icons/rurall-51.png" />
          <div>Pragas</div>
        </router-link>
        <router-link to="/dash/gerencia/mapas/doencas">
          <img src="@/assets/icons/rurall-52.png" />
          <div>Doenças</div>
        </router-link>
        <router-link to="/dash/gerencia/mapas/daninhas">
          <img src="@/assets/icons/rurall-53.png" />
          <div>Daninhas
          </div>
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

export default {
  name: "index",
  components: {
    
  },
  props: {
    lista: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    GET_LISTA() {
      return this.lista;
    },
    LISTA_ESTAGIO_1() {
      let lista = this.lista.filter(
        item => item.dados.estagio.idColor == "-M0ywDC3Z-N0lzov-Hv3"
      );
      return lista;
    },
    LISTA_ESTAGIO_2() {
      let lista = this.lista.filter(
        item => item.dados.estagio.idColor == "-M0ywJPvIIG9z15CdJ9c"
      );
      return lista;
    },
    LISTA_ESTAGIO_3() {
      let lista = this.lista.filter(
        item => item.dados.estagio.idColor == "-M0ywUCZgfTSvbQyATlu"
      );
      return lista;
    },
    LISTA_ESTAGIO_4() {
      let lista = this.lista.filter(
        item => item.dados.estagio.idColor == "-M0ywYNuar3FQhjVJee7"
      );
      return lista;
    }
  }
};
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
      background-color: rgb(30, 81, 0);
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
        background-color: #102d03;
      }
    }
  }
}
.monitorGeral {
  display: grid;
  grid-gap: 1px;
  .titulo {
    color: rgb(50, 50, 50);
    font-size: 10px;
    letter-spacing: 5px;
  }
}
</style>
