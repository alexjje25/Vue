<template>
  <div class="estoqueInfo">
    <div class="operacoes">
      Operações de estoque
      <div class="lista">
        <div
          v-for="(opera, index) in operacoes"
          :key="index"
          class="item"
          :class="{
            positivo: opera.dados.tipoOperacao == 'entrada',
            negativo: opera.dados.tipoOperacao == 'saida'
          }"
        >
          <div class="g2 paddingPadrao">
            <div>
              <div class="tt">Produto</div>
              <div class="content">
                <vProduto :chave="opera.dados.idProduto" />
              </div>
            </div>
            <div>
              <div class="tt">Quantidade</div>
              <div class="content">
                {{ opera.dados.quantidade | zeroNaFrente }}
              </div>
            </div>
          </div>

          <div class="g2 paddingPadrao">
            <div>
              <div class="tt">Categoria</div>
              <div class="content">
                {{ opera.dados.categoria }}
              </div>
            </div>
            <div>
              <div class="tt">Área</div>
              <div class="content">
                {{ opera.dados.modulo }}
              </div>
            </div>
          </div>

          <div class="g2 paddingPadrao">
            <div v-if="opera.dados.tipoOperacao == 'entrada'">
              <div class="tt">Fornecedor</div>
              <div class="content">
                <vFornecedor :chave="opera.dados.fornecedor" />
              </div>
            </div>
            <div>
              <div class="tt">Colaborador</div>
              <div class="content">
                <vColaborador :chave="opera.dados.colaborador" />
              </div>
            </div>
          </div>

          <div
            v-if="opera.dados.tipoOperacao == 'entrada'"
            class="g2 paddingPadrao"
          >
            <div>
              <div class="tt">Valor Unitário</div>
              <div class="content">
                {{ opera.dados.valorUnitario | real }}
              </div>
            </div>
            <div>
              <div class="tt">Total da Compra</div>
              <div class="content">
                {{ opera.dados.valorTotal | real }}
              </div>
            </div>
          </div>
          <div class="g2 paddingPadrao">
            <div>
              <div class="tt">Data de Criação</div>
              <div class="content">
                {{ opera.dados.created | dataFormate }}
              </div>
            </div>
            <div>
              <div class="tt">Data de Entrega</div>
              <div class="content">
                {{ opera.dados.dataEntrega | dataFormate }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout2">
      <div class="indices">
        ÍNDICES:<br />
        <br />
        <div class="g2 indice centralizaTudo">
          <div>
            <div class="corPositivo"></div>
          </div>
          <div class="indice">Entrada</div>
          <div>
            <div class="corNegativo"></div>
          </div>
          <div class="indice">Saída</div>
        </div>
      </div>
      <div class="ProdutosParaReceber">
        Produtos a receber:
        <div class="lista">
          <div
            v-for="(produto, index) in produtoParaEntrega"
            :key="index"
            class="item"
          >
            <div class="dd">
              ENTREGA: {{ produto.dados.dataEntrega | dataFormate }}
            </div>
            <div class="tt">FORNECEDOR</div>
            <div class="dd">
              <vFornecedor :chave="produto.dados.fornecedor" />
            </div>
            <div class="tt">PRODUTO</div>
            <div class="dd"><vProduto :chave="produto.dados.idProduto" /></div>
            <div class="tt">Quantidade</div>
            <div class="dd">{{ produto.dados.quantidade }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { servEstoque, servEstoqueLog } from "@/database.js";
import vColaborador from "@/components/idColaboradorPorNome";
import vFornecedor from "@/components/dash/idFornecedorForName";
import vProduto from "@/components/dash/idProdutoForName";
import {
  realFilter,
  zeroNaFrente,
  dataMomentFormate
} from "@/mixins/valores.js";

export default {
  components: { vColaborador, vFornecedor, vProduto },
  filters: {
    dataReal(value) {
      return moment(value).format("DD/MM/YYYY");
    }
  },
  mixins: [realFilter, zeroNaFrente, dataMomentFormate],
  data() {
    return {
      dataAtual: "",
      dataFinal: ""
    };
  },
  computed: {
    produtoParaEntrega() {
      let self = this;
      let list = this.$store.getters["fazenda/GET_ESTOQUELOG"].filter(item => {
        let itemDate = item.dados.dataEntrega;
        let conference = moment(itemDate).isBetween(
          self.dataAtual,
          self.dataFinal
        );
        if (conference) {
          if (item.dados.tipoOperacao == "entrada") {
            return true;
          } else {
            return false;
          }
        }
      });
      return list.reverse();
    },
    operacoes() {
      let lista = this.$store.getters["fazenda/GET_ESTOQUELOG"];
      return lista.reverse();
    }
  },
  mounted() {
    this.dataAtual = moment()
      .subtract(1, "d")
      .format("YYYY/MM/DD");
    this.dataFinal = moment()
      .add(5, "d")
      .format("YYYY/MM/DD");
    window.console.log(this.dataAtual, this.dataFinal);
  }
};
</script>

<style lang="scss" scoped>
$cor-saida: #db8f1b;
$cor-entrada: #3e8c2e;
$indicePadding: 16px;
.indices {
  padding-top: 25px;
  .indice {
    font-size: 14px;
  }
}
.layout2 {
  max-width: 200px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  margin-top: 25px;
  box-shadow: 0 0 10px rgba(50, 50, 50, 0.3);
  .ProdutosParaReceber {
    .lista {
      font-size: 13px;
      display: grid;
      grid-template-columns: 1;
      .item {
        padding: 10px;
        margin: 5px;
        background-color: white;
        //box-shadow: 0 0 10px rgba(50, 50, 50, 0.2);
        border: 1px solid rgba(40, 70, 150, 1);
        border-top: 10px solid rgba(40, 70, 150, 1);
        border-radius: 10px;
      }
    }
    .tt {
      font-weight: 300;
      margin: 5px;
      margin-bottom: 0px;
    }
    .dd {
      font-weight: 600;
      margin: 5px;
      margin-top: 0px;
    }
  }
}
.corPositivo {
  padding: $indicePadding;
  background-color: $cor-entrada;
  display: inline-block;
}
.corNegativo {
  padding: $indicePadding;
  background-color: $cor-saida;
  display: inline-block;
}
.g2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  &.indice {
    grid-template-columns: auto 1fr;
    text-align: center;
  }
}
.paddingPadrao {
  padding: 10px;
}
.estoqueInfo {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 10px;
  .operacoes {
    .lista {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      /*@media screen and (max-width: 1600px) {
        grid-template-columns: 1fr 1fr;
      }*/
      @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr;
      }
      .item {
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        background-color: white;
        border-top: 20px solid white;
        box-shadow: 0px 0px 10px rgba(50, 50, 50, 0.2);
        &.positivo {
          border-top-color: $cor-entrada;
        }
        &.negativo {
          border-top-color: $cor-saida;
        }
        .tt {
          font-weight: 100;
        }
        .content {
          font-weight: 900;
        }
      }
    }
  }
}
</style>
