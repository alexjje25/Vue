<template>
  <div>
    <h1>Clientes</h1>
    <div class="clientes">
      <div
        v-for="(item, index) in GET_CLIENTES_ANGOLA"
        :key="index"
        class="boxPadrao item"
      >
        <div v-if="caseUnlock !== item.chave">
          <button @click="caseUnlock = item.chave">VER ACESSO</button>
        </div>
        <div v-if="caseUnlock == item.chave" class="exposed">
          <button @click="caseUnlock = ''">ESCONDER ACESSO</button>
          <div>EMAIL: {{ item.dados.acesso.email }}</div>
          <div>SENHA: {{ item.dados.acesso.senha }}</div>
        </div>
        <div class="clienteName">{{ item.dados.nome }}</div>
        <div class="clienteName">{{ item.dados.sobrenome }}</div>        
        <div class="g2">
          <div>Pacote: {{ item.dados.pacote }}</div>
          <div>
            <div v-if="item.dados.docType == 'cnpj'">
              CNPJ: {{ item.dados.documentoCNPJ }}
            </div>
            <div v-if="item.dados.docType == 'nif'">
              NIF: {{ item.dados.documentoNIF }}
            </div>
          </div>
          <div>Telefone 1: {{ item.dados.telefone1 | filtroExiste }}</div>
          <div>Telefone 2: {{ item.dados.telefone2 | filtroExiste }}</div>
        </div>
        <div class="clienteEndereco g2">
          <div>
            PROVINCIA: <br />
            <b>{{ item.dados.endereco.provincia }}</b>
          </div>
          <div>
            MUNICIPIO: <br />
            <b>{{ item.dados.endereco.municipio }}</b>
          </div>
          <div>
            BAIRRO: <br />
            <b>{{ item.dados.endereco.bairro }}</b>
          </div>
          <div>
            RUA: <br />
            <b>{{ item.dados.endereco.rua }}</b>
          </div>
        </div>
        <div class="fazendas">
          <vFazendas :cliente="item.chave" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vFazendas from "./FazendaDoClienteAngolas";
export default {
  components: {
    vFazendas
  },
  filters: {
    filtroExiste: function(val) {
      if (val) {
        if (val == "") {
          return "S/ REGISTRO";
        } else if (val.lenght < 6) {
          return "INCONSISTENTE: " + val;
        } else {
          return val;
        }
      } else {
        return "S/ REGISTRO";
      }
    }
  },
  data() {
    return {
      caseUnlock: false
    };
  },
  computed: {
    GET_CLIENTES_ANGOLA() {
      return this.$store.getters["admin/GET_CLIENTES_ANGOLAS"];
    }
  }
};
</script>

<style lang="scss" scoped>
.clienteName {
  font-size: 130%;
}
button {
  border: none;
  background-color: black;
  color: white;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-block;
  margin: 4px;
}
.exposed {
  background-color: rgba(255, 255, 230, 1);
  box-shadow: 0px 0px 6px rgba(50, 50, 50, 0.5);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 4px;
  position: absolute;
  div {
    margin: 5px;
  }
}
.clientes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  .item {
    max-width: 400px;
    margin: 10px;
    padding: 18px;
    .g2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .clienteEndereco {
      background-color: rgba(0, 70, 00, 0.1);
      padding: 16px;
      border-radius: 5px;
    }
  }
}
</style>
