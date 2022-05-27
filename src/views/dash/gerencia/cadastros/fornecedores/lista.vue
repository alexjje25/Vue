<template>
  <div class="boxPadrao">
    <div class="lista">
      <div class="itemHeader">
        <div>NOME</div>
        <div>RAZÃO SOCIAL</div>
        <div>CELULAR</div>
        <div>TELEFONE</div>
        <div>EMAIL</div>
        <div>CNPJ</div>
        <div>INSC. EST.</div>
        <div>ENDEREÇO</div>
        <div>
          OPÇÕES
        </div>
      </div>
      <div v-for="(item, index) in GET_FORNECEDORES" :key="index" class="item">
        <div>{{ item.dados.nome }}</div>
        <div>
          {{ item.dados.razaoSocial }}
        </div>
        <div>{{ item.dados.celular }}</div>
        <div>{{ item.dados.telefone }}</div>
        <div>{{ item.dados.email }}</div>
        <div>{{ item.dados.cnpj }}</div>
        <div>{{ item.dados.inscEstadual }}</div>
        <div>{{ item.dados.endereco }}</div>
        <div>
          <vBtn
            cor-primaria="#db8f1b"
            cor-secundaria="#fb9f2b"
            type="danger"
            name="ARQUIVAR"
            @handle="Arquivo(item)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vBtn from "@/components/dash/btnIconMini";
import { servFornecedoresArquivo, servFornecedores } from "@/database.js";

export default {
  components: {
    vBtn
  },
  computed: {
    GET_FORNECEDORES() {
      return this.$store.getters["fazenda/GET_FORNECEDORES"];
    }
  },
  methods: {
    Arquivo(item) {
      let dadosParaArquivo = item.dados;
      let self = this;
      servFornecedoresArquivo
        .child(item.chave)
        .update(dadosParaArquivo, function() {
          servFornecedores
            .child(item.chave)
            .remove()
            .then(() => {
              self.$store.commit("resource/SET_NOTIFY", {
                status: true,
                mensagem: "ARQUIVADO COM SUCESSO",
                type: "sucess"
              });
            })
            .catch(error => {
              self.$store.commit("resource/SET_NOTIFY", {
                status: true,
                mensagem: `ERRO: ${error}`,
                type: "danger"
              });
            });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
$gridCols: repeat(8, 1fr) 100px;
$padding: 6px;
.boxPadrao {
  max-width: 90%;
}
.lista {
  .itemHeader {
    font-weight: 600;
    color: rgba(170, 170, 170, 1);
    display: grid;
    grid-template-columns: $gridCols;
    padding: $padding;
    text-align: center;
  }
  .item {
    display: grid;
    padding: $padding;
    grid-template-columns: $gridCols;
    text-align: center;
  }
}
</style>
