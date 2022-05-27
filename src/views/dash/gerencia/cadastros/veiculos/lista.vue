<template>
  <div class="boxPadrao">
    <div class="lista">
      <div class="itemHeader">
        <div>IDENTIFICADOR</div>
        <div>MODELO</div>
        <div>PLACA</div>
        <div>SETOR</div>
        <div>COMBUSTIVEL</div>
        <div>OPÇÕES</div>
      </div>
      <div v-for="(item, index) in GET_VEICULOS" :key="index" class="item">
        <div>{{ item.dados.nome }}</div>
        <div>{{ item.dados.modelo }}</div>
        <div>{{ item.dados.placa }}</div>
        <div>
          <vSetor :chave="item.dados.setor" />
        </div>
        <div>
          <vCombustivel :chave="item.dados.combustivel" />
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
import vSetor from "@/components/dash/idSetorForName";
import vBtn from "@/components/dash/btnIconMini";
import { servVeiculosArquivo, servVeiculos } from "@/database.js";
import vCombustivel from "@/components/dash/idCombustivelForName";

export default {
  components: {
    vSetor,
    vBtn,
    vCombustivel
  },
  computed: {
    GET_VEICULOS() {
      return this.$store.getters["fazenda/GET_VEICULOS"];
    }
  },
  methods: {
    Arquivo(item) {
      let dadosParaArquivo = item.dados;
      let self = this;
      servVeiculosArquivo
        .child(item.chave)
        .update(dadosParaArquivo, function() {
          servVeiculos
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
$gridCols: repeat(6, 1fr);
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
