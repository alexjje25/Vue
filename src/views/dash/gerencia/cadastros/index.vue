<template>
  <div class="mainCadastros marginPadrao">
    <div v-if="toggleMENU == false">
      <h1 class="tituloContent">SELECIONE O CADASTRAMENTO DESEJADO</h1>
      <div class="UImenu icon">
        <div class="link" @click="setComponent('colab')">
          <img src="@/assets/icons/colaborador-branco.png" />
          <div>Colaborador</div>
        </div>
        <div class="link" @click="setComponent('talhao')">
          <img src="@/assets/icons/talhao-branco.png" />
          <div>Talhão</div>
        </div>
        <div class="link" @click="setComponent('veiculo')">
          <img src="@/assets/icons/veiculo-branco.png" />
          <div>Veículo</div>
        </div>
        <div class="link" @click="setComponent('setores')">
          <img src="@/assets/icons/setor-branco.png" />
          <div>setores</div>
        </div>
        <div class="link" @click="setComponent('producao')">
          <img src="@/assets/icons/producao-branco.png" />
          <div>Produção</div>
        </div>
        <div class="link" @click="setComponent('fornecedor')">
          <img src="@/assets/icons/fornecedor-branco.png" />
          <div>Fornecedor</div>
        </div>
        <div class="link" @click="setComponent('fazenda')">
          <img src="@/assets/icons/fazenda white.png" />
          <div>Fazenda</div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="menuSpace">
        <vBtn
          name="VOLTAR"
          :icon="require('@/assets/icons/voltar.png')"
          cor-primaria="#c49e00"
          cor-secundaria="#d8d200"
          @handle="switchMenu()"
        />
      </div>
      <v-colab v-if="selected == 'colab'" />
      <v-setores v-if="selected == 'setores'" />
      <v-talhoes v-if="selected == 'talhao'" />
      <v-producao v-if="selected == 'producao'" />
      <v-fornecedor v-if="selected == 'fornecedor'" />
      <v-veiculo v-if="selected == 'veiculo'" />
      <vFazenda v-if="selected == 'fazenda'" />
    </div>
  </div>
</template>

<script>
import vColab from "./colaboradores";
import vSetores from "./setores/index";
import vTalhoes from "./talhoes/index";
import vProducao from "./producao";
import vFornecedor from "./fornecedores/index";
import vVeiculo from "./veiculos/index";
import vBtn from "@/components/dash/btnIconMini";
import vFazenda from "./fazenda/index";
export default {
  components: {
    vBtn,
    vFazenda,
    "v-colab": vColab,
    "v-setores": vSetores,
    "v-talhoes": vTalhoes,
    "v-producao": vProducao,
    "v-fornecedor": vFornecedor,
    "v-veiculo": vVeiculo
  },
  data() {
    return {
      toggleMENU: false,
      selected: ""
    };
  },
  methods: {
    setComponent(name) {
      this.selected = name;
      this.switchMenu();
    },
    switchMenu() {
      this.toggleMENU = !this.toggleMENU;
    }
  }
};
</script>

<style lang="scss" scoped>
.menuSpace {
  margin: 10px;
  margin-top: 20px;
  text-align: center;
}
.navButtonReturn {
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  margin: 8px;
}
.menu {
  padding: 10px;
  display: grid;
  max-width: 700px;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;
  .bloco {
    display: grid;
    grid-template-columns: auto 1fr;
    text-align: center;
    margin: 5px;
    padding: 10px 20px;
    background-color: white;
    box-shadow: 1px 1px 4px rgba(40, 40, 40, 0.3);
    //display: inline-block;
    background-color: rgb(57, 134, 71);
    color: white;
    font-weight: bolder;
    text-transform: uppercase;
    align-items: center;
    align-content: center;
    text-align: center;
    border-radius: 8px;
    img {
      display: inline-block;
      width: auto;
      height: 30px;
      margin: 5px;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
