<template>
  <div>
    <h1>Franquia Rurall</h1>
    <div>cadastros: {{ leads.length }}</div>
    <div class="lista">
      <div class="item header">
        <div>Nome</div>
        <div>whatsapp</div>
        <div>email</div>
        <div>empresa</div>
        <div>cargo</div>
        <div>cidade</div>
        <div>Criado em</div>
      </div>
      <div v-for="(lead, index) in leads" :key="index" class="item">
        <div>{{ lead.dados.nome }}</div>
        <div>{{ lead.dados.whatsapp }}</div>
        <div>{{ lead.dados.email }}</div>
        <div>{{ lead.dados.empresa }}</div>
        <div>{{ lead.dados.cargo }}</div>
        <div>{{ lead.dados.cidade }}</div>
        <div>{{ lead.dados.created | momentFilter }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  filters: {
    momentFilter: function(val) {
      return moment(val).format("DD/MM/YYYY");
    }
  },
  computed: {
    leads() {
      return this.$store.getters["admin/GET_LEADS_FRANQUIA"];
    }
  }
};
</script>

<style lang="scss" scoped>
.lista {
  .item {
    &.header {
      font-weight: 900;
      text-transform: uppercase;
    }
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 5px;
    &:nth-child(2n) {
      background-color: rgba(50, 50, 50, 0.2);
    }
  }
}
</style>
