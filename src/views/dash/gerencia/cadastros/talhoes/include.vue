<template>
  <div>
    <div class="boxPadrao">
      <div class="grid g2">
        <div class="scopo">
          <div>Nome do Talhão</div>
          <div>
            <input v-model="include.name" type="text" placeholder="Nome" />
          </div>
        </div>
        <div class="scopo">
          <div>TAMANHO (HECTARES)</div>
          <div>
            <input v-model="include.size" type="number" />
          </div>
        </div>
      </div>
      <p>
        <vBtn
          :icon="require('@/assets/icons/sinais/adicionar-white.png')"
          name="CADASTRAR"
          @handle="enviar()"
        />
      </p>
    </div>
  </div>
</template>

<script>
import { servTalhoes } from "@/database.js";
import vBtn from "@/components/dash/btnIconMini";

export default {
  components: {
    vBtn
  },
  data() {
    return {
      include: {
        idFazenda: this.$store.getters["auth/GET_FAZENDA"],
        name: null,
        size: 0,
        chave: null,
        areaActived: false
      }
    };
  },
  methods: {
    cleanForm() {
      this.$store.commit("resource/SET_NOTIFY", {
        status: true,
        mensagem: "Talhão registrado com sucesso",
        type: "sucess"
      });
      this.include.name = "";
      this.include.size = "";
      this.include.chave = "";
    },
    enviar() {
      let chave = servTalhoes.push().key;
      let resize = this.include.size;
      this.include.size = Number(resize);
      this.include.chave = chave;
      const response = this.include;
      servTalhoes.child(chave).update(response);
      this.cleanForm();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style.scss";
</style>
