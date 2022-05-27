<template>
  <div>
    <div style="padding:10px;">
      <div v-for="(fazenda, index) in GET_FAZENDAS_ANGOLA" :key="index">
        <div>Nome da Fazenda: {{ fazenda.dados.nomeFazenda }}</div>
        <div>Hectares: {{ fazenda.dados.hectares }}</div>
        <div>
          <div>Latitude: {{ fazenda.dados.coord.x }}</div>
          <div>Longitude: {{ fazenda.dados.coord.y }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cliente: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      quantidade: 0
    };
  },
  computed: {
    GET_FAZENDAS_ANGOLA() {
      let uid = this.cliente;
      let response = this.$store.getters["admin/GET_FAZENDAS_ANGOLAS"].filter(item => {
        if (item.dados.idProprietario == this.cliente) {
          window.console.log("item: " + item);
          return true;
        } else {
          return false;
        }
      });
      this.mono(response.length);
      return response;
    }
  },
  methods: {
    mono(qtd) {
      this.quantidade = qtd;
    }
  }
  /*GET_FAZENDA() {
      return this.$store.getters["admin/GET_FAZENDAS"].filter(item => {
        if (item.dados.idProprietario == this.cliente) {
          window.console.log("item: " + item);
          return true;
        }
      });
    }
  }*/
};
</script>

<style lang="scss" scoped>
.small {
  font-size: 75%;
}
</style>
