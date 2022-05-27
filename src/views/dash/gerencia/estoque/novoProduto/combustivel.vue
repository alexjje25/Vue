<template>
  <div>
    <div class="boxPadrao">
      <div class="form">
        <div class="tituloContent">Cadastro de Combustível</div>
        <div>
          <div class="scopo g2">
            <div class="titulo">Nome do combustivel</div>
            <div class="include">
              <input v-model="include.nome" type="text" />
            </div>
          </div>
        </div>
        <div>
          <v-btn texto="ENVIAR" @handleClick="enviar()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Estoque } from "@/database.js";
//import { timelocal } from "@/service/time.js";
import vbtn from "@/components/dash/btn";
export default {
  components: {
    "v-btn": vbtn
  },
  data() {
    return {
      chavePush: null,
      include: {
        nome: "",
        idProduto: "",
        modulo: "combustivel",
        fornecedor: "",
        quantidade: 0,
        idFazenda: this.$store.getters["auth/GET_FAZENDA"]
      }
    };
  },
  methods: {
    handle(error) {
      if (error) {
        window.console.log(error);
        return false;
      } else {
        this.$store.commit("resource/SET_NOTIFY", {
          mensagem: "CADASTRADO COM SUCESSO!",
          type: "sucess",
          status: true
        });
        setTimeout(() => {
          this.clear();
        }, 1000);
      }
    },
    clear() {
      this.include.nome = "";
      this.include.quantidade = 0;
      this.include.idProduto = "";
    },
    enviar() {
      let self = this;
      if (self.include.nome.length < 3) {
        this.$store.commit("resource/SET_NOTIFY", {
          type: "danger",
          mensagem: "Nome incorreto",
          status: true
        });
        return false;
      }
      this.include.idProduto = Estoque.push().key;
      let response = this.include;
      Estoque.child(response.idProduto).update(response, self.handle());
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/formInclude.scss";
</style>
