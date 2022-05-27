<template>
  <div class="layout">
    <div class="formulario">
      <h3>Incluir nova Daninha</h3>
      <div><input v-model="include.name" type="text" /></div>
      <br />
      <div><button class="btn" @click="POST()">Cadastrar</button></div>
    </div>

    <div class="lista">
      <h3>
        <v-badge color="green" :content="GET_PRAGAS_TIPO.length"
          >Lista de Daninhas Cadastradas</v-badge
        >
      </h3>
      <div class="item" :key="index" v-for="(praga, index) in GET_PRAGAS_TIPO">
        {{ praga.dados.name }}
        <button class="btn danger small" @click="REMOVE(praga.chave)">
          REMOVER
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { servDaninhasTipo } from "@/database";
export default {
  data() {
    return {
      include: {
        name: "",
        chave: ""
      }
    };
  },
  methods: {
    REMOVE(chave) {
      let decisao = window.confirm("Tem certeza que deseja excluir este item?");
      if (decisao) {
        servDaninhasTipo.child(chave).remove();
        window.alert("Removido com sucesso");
      } else {
        window.alert("Cancelado com sucesso");
      }
      /*
      let lista = this.$store.getters["admin/GET_PRAGAS_ESPECIE"];
      let arrayFiltered = lista.filter(item => item.dados.tipo == chave);
      this.diag = true;
      if (arrayFiltered.length > 0) {
        let decisao = window.confirm(
          "Existe " +
            arrayFiltered.length +
            " item(s),tem certaza que deseja apagar esse elemento?"
        );
        if (decisao) {
          servDaninhasTipo.child(chave).remove();
        } else {
        }
      } else {
        servDaninhasTipo.child(chave).remove();
      }
      */
    },
    POST() {
      let POST_KEY = servDaninhasTipo.push().key;
      let self = this;
      this.include.chave = POST_KEY;
      servDaninhasTipo
        .child(self.include.chave)
        .update(self.include, function(error) {
          if (error) {
            self.$store.commit("resource/SET_NOTIFY", {
              status: true,
              mensagem: "Erro " + error.code,
              type: "danger"
            });
          } else {
            self.$store.commit("resource/SET_NOTIFY", {
              status: true,
              mensagem: "Enviado com sucesso ",
              type: "sucess"
            });
          }
        });
    }
  },
  computed: {
    GET_PRAGAS_TIPO() {
      return this.$store.getters["admin/GET_DANINHAS_TIPO"];
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-columns: 2fr 1.5fr;
  padding: 10px;
}
.lista {
  .item {
    padding: 4px;
  }
}
</style>
