<template>
  <div>
    <div>
      Nome:
      <nome-produto :chave="prod.dados.idProduto" class="bolder" />
    </div>
    <div>
      Categoria: <span class="bolder">{{ prod.dados.categoria }}</span>
    </div>
    <div>
      Quantidade: <span class="bolder">{{ prod.dados.quantidade }}</span>
    </div>
    <div v-if="prod.dados.tipoOperacao == 'entrada'">
      Valor Unitário:
      <span class="bolder">{{ prod.dados.valorUnitario | real }}</span>
    </div>
    <div v-if="prod.dados.tipoOperacao == 'entrada'">
      Valor total:
      <span class="bolder">{{ prod.dados.valorTotal | real }}</span>
    </div>
    <div>
      Colaborador:
      <nomeColaborador :chave="prod.dados.colaborador" class="bolder" />
    </div>
    <div v-if="prod.dados.tipoOperacao == 'entrada'">
      Data de Entrega:
      <span class="bolder">{{ item.dataEntrega | dataFormate }}</span>
    </div>
    <div v-if="item.tipoOperacao == 'entrada'" class="scopeDownload">
      <img
        class="iconDownload"
        src="@/assets/icons/download.png"
        @click="sendDownload(prod.dados.anexos)"
      />
    </div>
    <div v-if="prod.dados.tipoOperacao == 'entrada'"></div>
    <div v-if="prod.dados.tipoOperacao == 'entrada'"></div>
    <div v-if="prod.dados.tipoOperacao == 'entrada'"></div>
    <!--<div>{{ prod }}</div>-->
  </div>
</template>

<script>
import nomeProduto from "@/components/itemEstoqueName.vue";
import { realFilter, dataMomentFormate } from "@/mixins/valores.js";
import nomeColaborador from "@/components/idColaboradorPorNome";
import { Storage } from "@/database.js";

export default {
  components: {
    nomeProduto,
    nomeColaborador
  },
  mixins: [realFilter, dataMomentFormate],
  props: {
    prod: {
      default: Object,
      type: Object
    }
  },
  computed: {
    item() {
      return this.prod.dados;
    }
  },
  methods: {
    download(url, filename) {
      fetch(url).then(function(t) {
        return t.blob().then(b => {
          let a = document.createElement("a");
          a.href = URL.createObjectURL(b);
          a.setAttribute("download", filename);
          a.click();
        });
      });
    },
    sendDownload(referencia) {
      let self = this;
      Storage.child(referencia)
        .getDownloadURL()
        .then(function(url) {
          var xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = function(event) {
            var blob = xhr.response;
          };
          xhr.open("GET", url);
          xhr.send();

          let mat = Math.round(Math.random() * 548849954);
          window.console.log(mat);
          window.open(url, "notafiscal" + mat);
        })
        .catch(function(error) {
          // Handle any errors
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.scopeDownload {
  text-align: right;
}
.iconDownload {
  width: 40px;
  position: absolute;
  margin-top: -28px;
  margin-left: -15px;
  background-color: #1fa34f;
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0px 0px 3px rgba(50, 50, 50, 0.7);
}
.bolder {
  font-weight: 900;
}
</style>
