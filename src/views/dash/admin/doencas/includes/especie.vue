<template>
  <div class="layout">
    <div class="formulario">
      <h3>
        Incluir Espécie
      </h3>
      <div>Nome: <input v-model="include.name" type="text" /></div>
      <br />
      <div>
        Tipo:
        <select v-model="include.tipo">
          <option
            :key="index"
            :value="item.chave"
            v-for="(item, index) in GET_DOENCAS_TIPO"
            >{{ item.dados.name }}</option
          >
        </select>
      </div>
      <br />
      <div><button class="btn" @click="POST()">Cadastrar</button></div>
    </div>

    <div class="lista">
      <h3>
        <v-badge color="green" :content="GET_DOENCAS_ESPECIE.length"
          >Lista de Pragas/Especies Cadastradas</v-badge
        >
      </h3>
      <div
        class="item"
        :key="index"
        v-for="(praga, index) in GET_DOENCAS_ESPECIE"
      >
        {{ praga.dados.name }}
        <button class="btn danger small" @click="REMOVE(praga.chave)">
          REMOVER
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { servDoencasEspecie } from "@/database";
export default {
  data() {
    return {
      include: {
        name: "",
        chave: "",
        tipo: ""
      }
    };
  },
  methods: {
    REMOVE(chave) {
      let decisao = window.confirm("Tem certeza que deseja excluir este item?");
      if (decisao) {
        servDoencasEspecie.child(chave).remove();
        window.alert("Removido com sucesso");
      } else {
        window.alert("Cancelado com sucesso");
      }
      //let lista = this.$store.getters["admin/GET_DOENCAS_ESPECIE"];
      //let arrayFiltered = lista.filter(item => item.dados.tipo == chave);
      /*if (arrayFiltered.length > 0) {
        let decisao = window.confirm(
          "Existe " +
            arrayFiltered.length +
            " item(s),tem certaza que deseja apagar esse elemento?"
        );
        if (decisao) {
          servDoencasEspecie.child(chave).remove();
        } else {
        }
      } else {
        servDoencasEspecie.child(chave).remove();
      }*/
    },
    POST() {
      let POST_KEY = servDoencasEspecie.push().key;
      let self = this;
      this.include.chave = POST_KEY;
      servDoencasEspecie
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
    GET_DOENCAS_ESPECIE() {
      return this.$store.getters["admin/GET_DOENCAS_ESPECIE"].filter(
        item => item.dados.tipo == this.include.tipo
      );
    },
    GET_DOENCAS_TIPO() {
      return this.$store.getters["admin/GET_DOENCAS_TIPO"];
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
