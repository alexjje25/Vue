<template>
  <div>
    <vNotify />
    <div class="dashboard">
      <v-header class="vheader" />
      <v-menu class="vmenu" />
      <v-content class="vcontent" />
    </div>
  </div>
</template>

<script>
import vNotify from "@/components/dash/notify.vue";
import vMenu from "./menu";
import vHeader from "./header";
import vContent from "./content";
import {
  servColors,
  servUsers,
  servUsersAngolas,
  servPragasEspecieTipo,
  servPragasEspecie,
  servPragasEstagio,
  servDaninhasTipo,
  servDaninhasEspecie,
  servDaninhasEstagio,
  servDoencasTipo,
  servDoencasEspecie,
  servDoencasEstagio,
  servArmadilhasTipo,
  servArmadilhasEspecie,
  servArmadilhasEstagio,
  servClientes,
  servClientesAngolas,
  servFazendas,
  servFazendasAngolas,
  servTalhoes,
  servPreSchool,
  servPreFranquia
} from "@/database.js";

export default {
  components: {
    "v-menu": vMenu,
    "v-header": vHeader,
    "v-content": vContent,
    vNotify
  },
  data() {
    return {
      handles: []
    };
  },
  mounted() {
    this._ONHANDLE();
  },
  destroyed() {
    this._OFFHANDLE();
    this.$store.commit("admin/SKYFALL");
    this.$store.commit("resource/SKY_FALL");
  },
  methods: {
    _CREATE_HANDLES_FIREBASE(referencia, _base) {
      let self = this;
      self.handles.push(referencia);
      referencia.on("child_added", function(snap) {
        self._SETTER(`admin/SET_${_base}`, snap);
      });
      referencia.on("child_changed", function(snap) {
        self._SETTER(`admin/UPDATE_${_base}`, snap);
      });
      referencia.on("child_removed", function(snap) {
        self._REMOVE(`admin/REMOVE_${_base}`, snap);
      });
    },
    _SETTER(commit, snap) {
      let chave = snap.key;
      let dados = snap.val();
      let response = {
        dados: dados,
        chave: chave
      };
      this.$store.commit(commit, response);
    },
    _REMOVE(commit, snap) {
      let chave = snap.key;
      this.$store.commit(commit, chave);
    },
    _ONHANDLE() {
      this._CREATE_HANDLES_FIREBASE(servColors, "COLOR");
      this._CREATE_HANDLES_FIREBASE(servUsers, "USER");
      this._CREATE_HANDLES_FIREBASE(servUsersAngolas, "USER_ANGOLAS");      
      this._CREATE_HANDLES_FIREBASE(servClientes, "CLIENTE");
      this._CREATE_HANDLES_FIREBASE(servClientesAngolas, "CLIENTE_ANGOLAS");
      this._CREATE_HANDLES_FIREBASE(servFazendas, "FAZENDA");
      this._CREATE_HANDLES_FIREBASE(servFazendasAngolas, "FAZENDA_ANGOLAS");
      this._CREATE_HANDLES_FIREBASE(servTalhoes, "TALHAO");
      this._CREATE_HANDLES_FIREBASE(servPragasEspecieTipo, "PRAGA_TIPO");
      this._CREATE_HANDLES_FIREBASE(servPragasEspecie, "PRAGA_ESPECIE");
      this._CREATE_HANDLES_FIREBASE(servPragasEstagio, "PRAGA_ESTAGIO");
      this._CREATE_HANDLES_FIREBASE(servDaninhasTipo, "DANINHA_TIPO");
      this._CREATE_HANDLES_FIREBASE(servDaninhasEspecie, "DANINHA_ESPECIE");
      this._CREATE_HANDLES_FIREBASE(servDaninhasEstagio, "DANINHA_ESTAGIO");
      this._CREATE_HANDLES_FIREBASE(servDoencasTipo, "DOENCA_TIPO");
      this._CREATE_HANDLES_FIREBASE(servDoencasEspecie, "DOENCA_ESPECIE");
      this._CREATE_HANDLES_FIREBASE(servDoencasEstagio, "DOENCA_ESTAGIO");
      this._CREATE_HANDLES_FIREBASE(servArmadilhasTipo, "ARMADILHA_TIPO");
      this._CREATE_HANDLES_FIREBASE(servArmadilhasEspecie, "ARMADILHA_ESPECIE");
      this._CREATE_HANDLES_FIREBASE(servArmadilhasEstagio, "ARMADILHA_ESTAGIO");
      this._CREATE_HANDLES_FIREBASE(servPreSchool, "LEAD_SCHOOL");
      this._CREATE_HANDLES_FIREBASE(servPreFranquia, "LEAD_FRANQUIA");

    },
    _OFFHANDLE() {
      let max = this.handles.length;
      this.handles.forEach(function(item, index) {
        item.off();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/style/dash/admin/global.scss";
</style>

<style lang="scss" scoped>
.dashboard {
  display: grid;
  grid-template-areas: "header" "menu" "content";
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  .vmenu {
    grid-area: menu;
  }
  .vcontent {
    grid-area: content;
  }
  .vheader {
    grid-area: header;
  }
}
</style>
