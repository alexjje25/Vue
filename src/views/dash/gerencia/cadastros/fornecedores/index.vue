<template>
  <div>
    <div class="menu centralizaTudo">
      <v-btn
        texto="Listar fornecedores"
        :icon="require('@/assets/icons/fornecedor-branco.png')"
        :class="{ actived: rota == 'lista' }"
        @handleClick="handle('lista')"
      />
      <v-btn
        texto="Cadastrar fornecedor"
        :icon="require('@/assets/icons/include-branco.png')"
        :class="{ actived: rota == 'include' }"
        @handleClick="handle('include')"
      />
    </div>
    <div class="content">
      <vLista v-if="rota == 'lista'" />
      <vInclude v-if="rota == 'include'" />
    </div>
  </div>
</template>

<script>
import vBtn from "@/components/dash/btnIcon";
import vLista from "./lista";
import vInclude from "./include";

export default {
  components: {
    vBtn,
    vLista,
    vInclude
  },
  data() {
    return {
      rota: "include"
    };
  },
  methods: {
    handle(val) {
      this.rota = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  display: block;
}
.btnFalse {
  padding: 10px;
  display: inline-flex;
  grid-template-columns: auto 1fr;
  background-color: red;
  border-radius: 10px;
  img {
    width: 40px;
    height: 40px;
  }
}
</style>
