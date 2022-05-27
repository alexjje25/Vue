<template>
  <div class="designDualList">
    <div class="entradas">
      <div class="head right">
        <img src="@/assets/icons/estoque/entrada.png" alt="entrada" />
      </div>
      <div class="flex-container listaEntradas">
        <item-registro
          v-for="(list, index) in lista.filter(
            item => item.dados.tipoOperacao == 'entrada'
          )"
          :key="index"
          :prod="list"
          class="item flex-item"
        />
      </div>
    </div>
    <div class="saidas">
      <div class="head left">
        <img src="@/assets/icons/estoque/saida.png" alt="saida" />
      </div>
      <div class="flex-container listaSaidas">
        <item-registro
          v-for="(saida, index) in lista.filter(
            item => item.dados.tipoOperacao == 'saida'
          )"
          :key="index"
          :prod="saida"
          class=" item flex-item"
        />
      </div>
    </div>
    <div v-if="false" class="lista">
      <div
        v-for="(list, index) in lista.filter(
          item => item.dados.tipoOperacao == 'entrada'
        )"
        :key="index"
        class="item"
      >
        <div>
          <nome-colaborador :chave="list.dados.colaborador" />
        </div>
        <div>
          <nome-fornecedor :chave="list.dados.fornecedor" />
        </div>
        <div>Quantidade: {{ list.dados.quantidade }}</div>
        <div>Valor Unitário: {{ list.dados.valorUnitario }}</div>
        <div>{{ list }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import nomeColaborador from "@/components/idColaboradorPorNome";
import nomeFornecedor from "@/components/dash/idFornecedorForName";
import itemRegistro from "./item";

export default {
  components: {
    nomeColaborador,
    nomeFornecedor,
    itemRegistro
  },
  props: {
    lista: {
      default() {
        return [];
      },
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped>
$cor-base-entrada: #3e8c2e;
$cor-base-saida: #db8f1b;

.flex-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  padding: 0;
  margin: 0;
  list-style: none;
}

.flex-item {
  background: tomato;
  padding: 5px;
  margin: 5px;
  width: 200px;
  height: auto;
  margin-top: 10px;
  font-size: 15px;
  color: white;
}

.titleAndImage {
  vertical-align: middle;
  div {
    display: inline;
    align-content: center;
    align-items: center;
    align-self: center;
    text-align: center;
    font-size: 30px;
    vertical-align: middle;
  }
  img {
    vertical-align: middle;
    width: 120px;
  }
}
.designDualList {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  .head {
    img {
      width: 200px;
    }
    &.left {
      text-align: left;
    }
    &.right {
      text-align: right;
    }
  }
  h1 {
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 500;
    text-align: center;
  }
  .item {
    margin: 10px;
    padding: 15px;
    color: white;
    border-radius: 6px;
    padding-left: 30px;
    letter-spacing: 1px;
  }
  .saidas {
    h1 {
      color: $cor-base-saida;
    }
    .listaSaidas {
      .item {
        background-color: $cor-base-saida;
      }
    }
  }
  .entradas {
    h1 {
      color: $cor-base-entrada;
    }
    .listaEntradas {
      .item {
        background-color: $cor-base-entrada;
      }
    }
  }
}
.listaBase {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}
</style>
