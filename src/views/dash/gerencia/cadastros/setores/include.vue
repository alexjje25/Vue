<template>
  <div class="boxPadrao">
    <div class="tituloContent">CADASTRO DE SETORES</div>
    <div class="form">
      <div class="grid g2">
        <div class="scopo">
          <div>Titulo</div>
          <div>
            <input
              v-model="include.titulo"
              type="text"
              placeholder="Nome do Setor"
            />
          </div>
        </div>
        <div class="scopo">
          <div>Resumo do que o setor</div>
          <div>
            <input v-model="include.descricao" type="text" />
          </div>
        </div>
      </div>
      <p>
        <vBtn
          :icon="require('@/assets/icons/sinais/adicionar-white.png')"
          texto="CADASTRAR"
          @handleClick="enviar()"
        />
      </p>
    </div>
  </div>
</template>

<script>
import { servSetores } from "@/database.js";
import vBtn from "@/components/dash/btnIcon";

export default {
  components: {
    vBtn
  },
  data() {
    return {
      include: {
        idFazenda: this.$store.getters["auth/GET_FAZENDA"],
        titulo: "",
        descricao: "",
        chave: null
      }
    };
  },
  methods: {
    cleanForm() {
      this.include.titulo = "";
      this.include.descricao = "";
    },
    handle() {
      this.cleanForm();
      window.alert("Enviado com sucesso!");
    },
    enviar() {
      let chave = servSetores.push().key;
      let self = this;
      this.include.chave = chave;
      this.include.idFazenda = String(this.include.idFazenda);
      this.include.titulo = this.include.titulo.toUpperCase();
      const response = this.include;
      servSetores.child(chave).update(response, self.handle);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style.scss";
</style>
