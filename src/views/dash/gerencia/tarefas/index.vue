<template>
  <div>
    <div class="containTarefas">
      <div class="menu">
        <v-btn
          v-if="rota == 'include'"
          texto="VER LISTA"
          :icon="require('@/assets/icons/icones painel_branco-08.png')"
          @handleClick="entrar('lista')"
        />
        <v-btn
          v-if="rota == 'lista'"
          texto="NOVA TAREFA"
          :icon="require('@/assets/icons/ico-tarefa-branca.png')"
          @handleClick="entrar('include')"
        />
      </div>

      <v-include v-if="rota == 'include'" />
      <v-lista v-if="rota == 'lista'" />
    </div>
  </div>
</template>

<script>
import vInclude from "./include";
import vLista from "./lista";
import vBtn from "@/components/dash/btnIcon";
export default {
  components: {
    "v-include": vInclude,
    "v-lista": vLista,
    "v-btn": vBtn
  },
  data() {
    return {
      rota: "lista",
      actived: true
    };
  },
  methods: {
    entrar(name) {
      this.rota = name;
      this.actived = true;
    },
    close() {
      this.actived = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.containTarefas {
  .menu {
    text-align: center;
    padding: 10px;
  }
}
.navButtonReturn {
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  margin: 8px;
}
</style>
