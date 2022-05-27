<template>
  <div>
    <h1>Mapa Admin</h1>
    <div class="mapLinks">
      <div class="sect">
        <div class="icon"><icone :icon="['fas', 'users']" /> TOOLS</div>
        <router-link to="/dash/admin/signup">SIGNUP'S</router-link>
        <router-link to="/dash/admin/colors">CORES</router-link>
        <router-link to="/dash/admin/talhoes">Talhões</router-link>
        <router-link to="/dash/admin/clientes"> Clientes Brasil </router-link>
         <router-link to="/dash/admin/clientesAngolas"> Clientes Angolas </router-link>
      </div>
      <div class="sect">
        <div class="icon"><icone :icon="['fas', 'users']" /> SCHOOL</div>
        <router-link to="/dash/admin/school">GERAL</router-link>
      </div>
         <div class="sect">
        <div class="icon"><icone :icon="['fas', 'users']" /> FRANQUIA</div>
        <router-link to="/dash/admin/franquia">GERAL</router-link>
      </div>
      <div class="sect">
        <div class="icon"><icone :icon="['fas', 'users']" /> Users</div>
        <router-link to="/dash/admin/users/lista">Lista</router-link>
        <router-link to="/dash/admin/users/include">Novo</router-link>
      </div>
      <div class="sect">
        <div class="icon"><icone :icon="['fas', 'bug']" /> Armadilhas</div>
        <router-link to="/dash/admin/armadilhas/lista">Lista</router-link>
        <router-link to="/dash/admin/armadilhas/include">Nova</router-link>
      </div>
      <div class="sect">
        <router-link to="/dash/admin/pragas">
          <icone :icon="['fas', 'bug']" /> Gerenciar Pragas
        </router-link>
      </div>
      <div class="sect">
        <router-link to="/dash/admin/daninhas">
          <icone :icon="['fas', 'bug']" /> Gerenciar Daninhas
        </router-link>
      </div>
      <div class="sect">
        <router-link to="/dash/admin/doencas">
          <icone :icon="['fas', 'bug']" /> Gerenciar Doenças
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    testeSend() {
      this.$store.commit("resource/SET_NOTIFY", {
        status: true,
        mensagem: "Ok. Testado!",
        type: "sucess"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mapLinks {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  div.sect {
    text-align: center;
    padding: 20px;
    margin: 4px;
    box-shadow: 0px 0px 2px rgba(40, 40, 40, 0.5);
    display: inline-block;
    .icon {
      display: block;
    }
    a {
      display: block;
    }
  }
}
a {
  padding: 10px;
  margin: 4px;
  background-color: rgb(30, 50, 115);
  color: white;
  display: inline-block;
  text-decoration: none;
  &:hover {
    background-color: rgb(30, 60, 145);
  }
}
</style>
