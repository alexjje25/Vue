<template>
  <div>
    <div v-show="toggleRegList == false" class="uiSearch centralizaTudo">
      <div class="bolder">
        Pesquisa
      </div>
      <input
        v-model="search.nome"
        type="text"
        placeholder="Nome ou Código"
        class="centralizaTudo"
      />
    </div>

    <v-registros
      v-show="toggleRegList == true"
      :registro="registroSelecionado"
      class="registros"
      @handle="toggleRegList = false"
    />

    <!--
    <div v-show="toggleRegList == true" class="registros">
      <div class="subpainel">
        <button @click="toggleRegList = false">fechar</button>
      </div>
      <div></div>
      <v-registros :lista="GET_ESTOQUELOG" />
    </div>-->

    <div v-show="toggleRegList == false" class="lista boxPadrao">
      <div
        class="item itemHeader centralizaTudo"
        :class="{ hasRoot: GET_PERMISSAO == 99 }"
      >
        <div>Ações</div>
        <div>Produto</div>
        <div>Categoria</div>
        <div>Código</div>
        <div>Ult. Fornec.</div>
        <div>Ult. Valor Unt.</div>
        <div>MARCA</div>
        <div>QUANTIDADE</div>
        <div v-if="GET_PERMISSAO == 99">ROOT</div>
      </div>
      <div
        v-for="(item, index) in GET_ESTOQUE"
        :key="index"
        class="item centralizaTudo"
        :class="{ hasRoot: GET_PERMISSAO == 99 }"
      >
        <div>
          <btnMini
            name="REGISTROS"
            :icon="require('@/assets/icons/estoque/ico_lista.png')"
            :valor="item.chave"
            style="max-width: 150px;"
            @handle="handleBtn"
          ></btnMini>
        </div>
        <div>{{ item.dados.nome }}</div>
        <div>{{ item.dados.categoria }}</div>
        <div>{{ item.dados.codigo }}</div>
        <div>
          <div v-if="item.dados.fornecedor == ''">
            S/ Registro
          </div>
          <div v-else>
            <idFornecedorPorNome :chave="item.dados.fornecedor" />
          </div>
        </div>
        <div>{{ item.dados.valorUnitario | real }}</div>
        <div>{{ item.dados.marca }}</div>
        <div>{{ item.dados.quantidade }}</div>
        <div v-if="GET_PERMISSAO == 99">
          <button class="rootRemove" @click="removeThis(item.chave)">
            REMOVER
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Estoque, EstoqueLog } from "@/database.js";
import idFornecedorPorNome from "@/components/dash/idFornecedorForName";
import btnMini from "@/components/dash/btnIconMini";
//import vRegistros from "./registros/lista"; // down
import vRegistros from "./registros/index";

export default {
  components: {
    idFornecedorPorNome,
    vRegistros,
    btnMini
  },
  filters: {
    real: function(val) {
      let variv = Number(val).toFixed(2);
      if (val == 0) {
        return "S/ REGISTRO";
      }
      return variv;
    }
  },
  data() {
    return {
      toggleRegList: false,
      registroSelecionado: "",
      search: {
        nome: ""
      }
    };
  },
  computed: {
    GET_PERMISSAO() {
      return this.$store.getters["auth/GET_NIVEL_AUTH"];
    },
    GET_ESTOQUE() {
      let lista = this.$store.getters["fazenda/GET_ESTOQUE"].filter(item => {
        let nameItem = item.dados.nome.toUpperCase();
        let nameSearch = this.search.nome.toUpperCase();
        let codeItem = String(item.dados.codigo);
        return nameItem.match(nameSearch) || codeItem.match(nameSearch);
      });
      return lista.reverse();
    },
    GET_FORNECEDORES() {
      return this.$store.getters["fazenda/GET_FORNECEDORES"];
    }
  },
  methods: {
    handleBtn(val) {
      window.console.log(val);
      this.openRegistros(val);
    },
    openRegistros(chave) {
      window.console.log(chave);
      this.toggleRegList = true;
      this.registroSelecionado = chave;
    },
    closeReg() {
      this.toggleRegList = false;
    },
    removeThis(chave) {
      let confirme = window.confirm(
        "Tem certeza que quer apagar ? apagará tanto o produto quanto o log do produto"
      );
      if (!confirme) {
        return false;
      }
      Estoque.child(chave).remove();
      this.$store.getters["fazenda/GET_ESTOQUELOG"].filter(item => {
        if (item.dados.idProduto == chave) {
          EstoqueLog.child(item.chave).remove();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$colItem: 8;
.boxPadrao {
  max-width: 90%;
}
.uiSearch {
  .bolder {
    font-weight: 900;
    padding: 5px;
  }
  padding: 10px;
}
.lista {
  display: grid;
  grid-template-columns: 1fr;
  .item {
    display: grid;
    grid-template-columns: repeat($colItem, 1fr);
    padding: 4px;
    text-align: center;
    &.hasRoot {
      grid-template-columns: repeat($colItem + 1, 1fr);
    }
    &.itemHeader {
      text-transform: uppercase;
      font-weight: 900;
      cursor: unset;
    }
    button {
      vertical-align: middle;
      &.hasIcon {
        display: grid;
        grid-template-columns: auto auto;
      }
      padding: 10px 16px;
      border-radius: 10px;
      .icon {
        width: 50px;
      }
    }
  }
}
.registros {
  .item {
    display: grid;
  }
}
</style>
