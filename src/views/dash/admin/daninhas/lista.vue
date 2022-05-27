<template>
  <div>
    <h1>Lista de Daninhas</h1>
    <div class="miniMenu"></div>
    <div class="lista">
      <div
        v-for="(item, index) in listaTipo"
        :key="index"
        class="item"
        @click="selectThisItem(item.chave)"
      >
        <!-- HEADER -->
        <div class="header" :title="item.dados.chave">
          <div class="titulo">Tipo de Espécie:</div>
          <div class="conteudo">{{ item.dados.name }}</div>
        </div>
        <!-- v-for ESPECIES -->
        <div v-if="selectedItem == item.chave" class="descricao">
          <div
            v-for="(item2, index2) in listaEspecie.filter(
              bench => bench.dados.tipo == item.chave
            )"
            :key="index2"
          >
            <!-- ESPECIE -->
            <div class="sub sub2">
              <div class="titulo">ESPÉCIE:</div>
              <div class="conteudo">ESPÉCIE: {{ item2.dados.name }}</div>
            </div>
            <!-- V-FOR ESTÁGIOS -->
            <div class="sub sub3">
              <div class="titulo">ESTÁGIO</div>
            </div>

            <div class="g2">
              <div
                v-for="(item3, index3) in listaEstagio.filter(
                  bench2 => bench2.dados.especie == item2.chave
                )"
                :key="index3"
                class="sub sub3"
              >
                <!-- ITEM ESTÁGIO -->
                <div class="conteudo">{{ item3.dados.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  servDaninhasTipo,
  servDaninhasEspecie,
  servDaninhasEstagio
} from "@/database";

export default {
  data() {
    return {
      selectedItem: ""
    };
  },
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
    selectThisItem(chave) {
      this.selectedItem = chave;
    },
    removeBug(chave, db) {
      const expressao = window.confirm(
        "Tem certeza que deseja remover este item?"
      );
      if (!expressao) {
        return false;
      } else {
        if (db == "tipo") {
          servDaninhasTipo.child(chave).remove();
        }
        if (db == "especie") servDaninhasEspecie.child(chave).remove();
      }
      if (db == "estagio") {
        servDaninhasEstagio.child(chave).remove();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
//@import "@/style/dash/admin/listas.scss";
@import "./theme";
h3 {
  font-weight: lighter;
}
.lista {
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
