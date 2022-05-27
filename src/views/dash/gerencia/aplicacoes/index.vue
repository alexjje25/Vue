<template>
  <div class="marginPadrao">
    <div class="containTarefas">
      <div class="menu">
        <v-btn
          v-if="rota == 'include'"
          texto="LISTA DE APLICAÇÕES"
          :icon="require('@/assets/icons/icones painel_branco-08.png')"
          @handleClick="entrar('lista')"
        />
        <v-btn
          v-if="rota == 'lista'"
          texto="NOVA APLICAÇÃO"
          :icon="require('@/assets/icons/ico-tarefa-branca.png')"
          @handleClick="entrar('include')"
        />
      </div>

      <v-include v-if="rota == 'include'" />
      <v-lista v-if="rota == 'lista'" />

      <div
        style="padding:20px; text-align:center; color: rgba(70,70,70,0.8); width: 80%; margin:0 auto; font-size:10px; display:grid; grid-template-columns: 1fr 1fr;"
      >
        <div>{{ termo }}</div>
        <div>
          Preencha apenas os campos necessários correspondendo os equipamentos e
          veículos utilizados. (não será feito nenhum calculo nas informações
          repassadas). Cálculos e informações finais por responsabilidade do
          usuário.
        </div>
      </div>
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
      actived: true,
      termo:
        "Esse cadastro não é válido como Receituário Agronômico, apenas para controle organizacional interno e controle de estoque. Para aplicações necessita de uma ordem assinada e nos padrões dos órgãos reguladores."
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
