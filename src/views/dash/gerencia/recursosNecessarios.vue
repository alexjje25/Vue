<template>
  <span></span>
</template>

<script>
import { Estoque } from "@/database.js";

export default {
  data() {
    return {
      idFazenda: this.$store.getters["auth/GET_FAZENDA_ID"]
    };
  },
  mounted() {
    setTimeout(() => {
      this.verificaCombustivel();
    }, 3000);
  },
  methods: {
    preCombustivel(nome) {
      let chave = Estoque.push().key;
      let payload = {
        idProduto: chave,
        nome: nome,
        modulo: "combustivel",
        fornecedor: "",
        quantidade: 0,
        idFazenda: this.idFazenda
      };
      return payload;
    },
    criarProdutoCombustivel() {
      //pre
      let payload01 = this.preCombustivel("Etanol");
      let payload02 = this.preCombustivel("Gasolina");
      let payload03 = this.preCombustivel("Gás Natural Veicular");
      let payload04 = this.preCombustivel("Óleo Lubrificante");
      let payload05 = this.preCombustivel("Querosene de Aviação");
      let payload06 = this.preCombustivel("Gasolina de Aviação");
      let payload07 = this.preCombustivel("Etanol de Aviação");
      let payload08 = this.preCombustivel("Biocombustível");
      let payload09 = this.preCombustivel("Diesel");
      // Send
      Estoque.child(payload01.idProduto).update(payload01);
      Estoque.child(payload02.idProduto).update(payload02);
      Estoque.child(payload03.idProduto).update(payload03);
      Estoque.child(payload04.idProduto).update(payload04);
      Estoque.child(payload05.idProduto).update(payload05);
      Estoque.child(payload06.idProduto).update(payload06);
      Estoque.child(payload07.idProduto).update(payload07);
      Estoque.child(payload08.idProduto).update(payload08);
      Estoque.child(payload09.idProduto).update(payload09);
    },
    verificaCombustivel() {
      let list = this.$store.getters["fazenda/GET_ESTOQUE"].filter(
        item => item.dados.modulo == "combustivel"
      );
      if (list.length < 1) {
        this.criarProdutoCombustivel();
      }
    }
  }
};
</script>
