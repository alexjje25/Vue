<template>
  <div class="boxPadrao">
    <div class="lista">
      <div class="itemHeader">
        <div>NOME</div>
        <div>DESCRICAO</div>
        <div>OPÇÕES</div>
      </div>
      <div v-for="(item, index) in GET_SETORES" :key="index" class="item">
        <div>{{ item.dados.titulo }}</div>
        <div>
          <span v-if="item.dados.descricao">{{ item.dados.descricao }}</span>
          <span v-else>S/ REGISTRO</span>
        </div>
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
import { servSetoresArquivo, servSetores } from "@/database.js";

export default {
  components: {
    vBtn
  },
  computed: {
    GET_SETORES() {
      return this.$store.getters["fazenda/GET_SETORES"];
    }
  },
  methods: {
    Arquivo(item) {
      let dadosParaArquivo = item.dados;
      let self = this;
      servSetoresArquivo.child(item.chave).update(dadosParaArquivo, function() {
        servSetores
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
$gridCols: repeat(3, 1fr);
$padding: 6px;
.lista {
  .itemHeader {
    font-weight: 600;
    color: rgba(170, 170, 170, 1);
    display: grid;
    grid-template-columns: $gridCols;
    padding: $padding;
  }
  .item {
    display: grid;
    padding: $padding;
    grid-template-columns: $gridCols;
  }
}
</style>
