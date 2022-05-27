<template>
  <div>
    <h2>Lista de Daninhas</h2>
    <div class="miniMenu"></div>
    <div class="lista">
      <div v-for="(item, index) in listaTipo" :key="index" class="item">
        <small style="font-size:10px;"
          ><code>{{ item.dados.chave }}</code></small
        >
        <div class="descricao">
          <div class="doc docTipo">tipo: {{ item.dados.name }}</div>
          <div
            v-for="(item2, index2) in listaEspecie.filter(
              bench => bench.dados.tipo == item.chave
            )"
            :key="index2"
          >
            <div class="doc docEspecie">
              Especie: <i>{{ item2.dados.name }}</i>
            </div>
            <div
              v-for="(item3, index3) in listaEstagio.filter(
                bench2 => bench2.dados.especie == item2.chave
              )"
              :key="index3"
            >
              <div class="doc docEstagio">
                Estagio - <b>{{ item3.dados.name }}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    listaTipo() {
      return this.$store.getters["admin/GET_DANINHAS_TIPO"];
    },
    listaEspecie() {
      return this.$store.getters["admin/GET_DANINHAS_ESPECIE"];
    },
    listaEstagio() {
      return this.$store.getters["admin/GET_DANINHAS_ESTAGIO"];
    }
  },
  methods: {
    removeBug() {
      const expressao = window.confirm(
        "Tem certeza que deseja remover este item?"
      );
      if (!expressao) {
        return false;
      } else {
        //servPragas.child(chave).remove();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/admin/listas.scss";
h3 {
  font-weight: lighter;
}
.lista {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  .item {
    font-weight: lighter;
    margin: 5px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0px 0px 4px rgba(62,145,23, 0.5);
    .descricao {
      p {
        margin: 0px;
        display: blcok;
        padding: 4px;
      }
      padding: 4px;
    }
    img {
      width: 150px;
      height: 100px;
    }
  }
}
</style>
