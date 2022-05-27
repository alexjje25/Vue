<template>
  <div>
    <h2>Usuarios</h2>
    <div class="miniMenu">
      <select v-model="filtro" class="select">
        <option value="fazenda">Fazendas</option>
        <option value="admin">Admins/Staff</option>
        <option value="funcionario">Funcionários</option>
      </select>
    </div>
    <div class="lista">
      <div v-for="(item, index) in users" :key="index" class="item">
        <div class="titulo">
          <div class="icone">
            <icone :icon="['fas', 'address-card']" />
          </div>
          {{ item.dados.name }}
        </div>
        <div>Email: {{ item.dados.email }}</div>
        <div>Nivel de Acesso: {{ item.dados.nivel }}</div>
        <div>Telefone: {{ item.dados.telefone }}</div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filtro: "funcionario"
    };
  },
  computed: {
    users() {
      let option = this.filtro;
      return this.$store.getters["admin/filterUsersType"](option);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/minimenu.scss";
.lista {
  .item {
    padding: 10px;
    letter-spacing: 1px;
    .titulo {
      font-weight: 900;
    }
    &:nth-child(2n) {
      background-color: rgba(200, 200, 200, 0.3);
    }
  }
  .icone {
    display: inline-block;
  }
}
</style>
