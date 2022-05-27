<template>
  <div>
    <h2>Lista de Armadilhas</h2>
    <div class="miniMenu"></div>
    <div class="lista">
      <div v-for="(item, index) in listaTipo" :key="index" class="item">
        <small style="font-size:10px;">{{ item.dados.chave }}</small>
        <div class="descricao">
          <div class="doc docTipo">
            tipo: {{ item.dados.name }}
            <button class="btnRemove" @click="exclude_db(item.chave, 'tipo')">
              REMOVE
            </button>
          </div>
          <div
            v-for="(item2, index2) in listaEspecie.filter(
              bench => bench.dados.tipo == item.chave
            )"
            :key="index2"
          >
            <div class="doc docEspecie">
              Especie: <i>{{ item2.dados.name }}</i>
              <button
                class="btnRemove"
                @click="exclude_db(item2.chave, 'especie')"
              >
                REMOVE
              </button>
            </div>
            <div
              v-for="(item3, index3) in listaEstagio.filter(
                bench2 => bench2.dados.especie == item2.chave
              )"
              :key="index3"
            >
              <div class="doc docEstagio">
                <div>
                  Estagio - <b>{{ item3.dados.name }}</b>

                  <button
                    class="btnRemove"
                    @click="exclude_db(item3.chave, 'estagio')"
                  >
                    REMOVE
                  </button>
                </div>
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
  servArmadilhasTipo,
  servArmadilhasEspecie,
  servArmadilhasEstagio
} from "@/database";

export default {
  computed: {
    listaTipo() {
      return this.$store.getters["admin/GET_ARMADILHAS_TIPO"];
    },
    listaEspecie() {
      return this.$store.getters["admin/GET_ARMADILHAS_ESPECIE"];
    },
    listaEstagio() {
      return this.$store.getters["admin/GET_ARMADILHAS_ESTAGIO"];
    }
  },
  methods: {
    exclude_db(chave, operacao) {
      const expressao = window.confirm(
        "Tem certeza que deseja remover este item?"
      );
      if (!expressao) {
        return false;
      } else {
        if (operacao == "tipo") {
          servArmadilhasTipo.child(chave).remove();
        }
        if (operacao == "especie") servArmadilhasEspecie.child(chave).remove();
      }
      if (operacao == "estagio") {
        servArmadilhasEstagio.child(chave).remove();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/admin/listas.scss";
.btnRemove {
  padding: 10px;
  border: none;
  color: white;
  background-color: red;
}
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
