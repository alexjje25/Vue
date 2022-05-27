<template>
  <div>
    <v-notify />
    <v-recursos />
    <transition name="fadeDash">
      <div v-show="carregamentoSistema" class="dashboard">
        <v-header class="vheader" />
        <v-menu class="vmenu" />
        <v-content class="vcontent" />
      </div>
    </transition>
    <transition name="fade">
      <vLoading v-show="carregamentoSistema === false"></vLoading>
    </transition>
  </div>
</template>

<script>
import vMenu from "./menu";
import vHeader from "./header/index";
import vContent from "./content";
import vRecursos from "./recursosNecessarios";
import vNotify from "@/components/dash/notify.vue";
import vLoading from "./loading";
import {
  Estoque,
  EstoqueLog,
  servRotaGPS,
  servPontoGPS,
  servAlertaCategorias,
  servAlertas,
  servAplicacoes,
  servArmadilhasEspecie,
  servArmadilhasEstagio,
  servArmadilhasTipo,
  servColaboradores,
  servColors,
  servCultivar,
  servDaninhasEspecie,
  servDaninhasEstagio,
  servDaninhasTipo,
  servDoencasEspecie,
  servDoencasEstagio,
  servDoencasTipo,
  servFazendas,
  servFornecedores,
  servMonitorArmadilhas,
  servMonitorDaninhas,
  servMonitorDoencas,
  servMonitorPragas,
  servPragasEspecie,
  servPragasEspecieTipo,
  servPragasEstagio,
  servProducoes,
  servReviewArmadilhas,
  servSetores,
  servTalhoes,
  servTarefas,
  servVeiculos
} from "@/database.js";

export default {
  components: {
    vNotify,
    "v-menu": vMenu,
    "v-header": vHeader,
    "v-content": vContent,
    vRecursos,
    vLoading
  },
  data() {
    return {
      fazendaID: null,
      idProprietario: null,
      handles: [],
      base_local: "fazenda"
    };
  },
  computed: {
    carregamentoSistema() {
      return this.$store.getters["fazenda/GET_PAYLOAD"];
    }
  },
  mounted() {
    this.connectALL();
  },
  destroyed() {
    this.$store.dispatch("fazenda/CLEAR");
    servVeiculos.off();
    servPragasEspecieTipo.off();
    servPragasEspecie.off();
    servPragasEstagio.off();
    servProducoes.off();
    servColaboradores.off();
    servMonitorPragas.off();
    servMonitorDoencas.off();
    servMonitorArmadilhas.off();
    servReviewArmadilhas.off();
    servTalhoes.off();
    servFazendas.off();
    servTarefas.off();
    servSetores.off();
    servFornecedores.off();
    servCultivar.off();
    servMonitorDaninhas.off();
    servDaninhasTipo.off();
    servDaninhasEspecie.off();
    servDaninhasEstagio.off();
    servColors.off();
    servDoencasTipo.off();
    servDoencasEstagio.off();
    servDoencasEspecie.off();
    servArmadilhasTipo.off();
    servArmadilhasEspecie.off();
    servArmadilhasEstagio.off();
    Estoque.off();
    EstoqueLog.off();
    servAplicacoes.off();
    servAlertas.off();
    servAlertaCategorias.off();
    servPontoGPS.off();
    servRotaGPS.off();
  },
  methods: {
    _CREATE_HANDLES_FIREBASE(_ref, _base, parametro) {
      let self = this;
      var referencia;
      if (parametro == true || parametro == "idFazenda") {
        referencia = _ref
          .orderByChild("idFazenda")
          .equalTo(`${self.fazendaID}`);
      } else if (parametro == "objeto") {
        if (_base == "MINHAFAZENDA") {
          referencia = _ref.child(self.fazendaID);
        } else {
          referencia = _ref;
        }
      } else {
        referencia = _ref;
      }
      self.handles.push(referencia);
      //OBJETO(VALUE) OU LISTA(CHILD_)
      if (parametro == "objeto") {
        referencia.on("value", function(snap) {
          self._SETTER(`${self.base_local}/SET_${_base}`, snap, "objeto");
        });
      } else {
        referencia.on("child_added", function(snap) {
          self._SETTER(`${self.base_local}/SET_${_base}`, snap);
        });
        referencia.on("child_changed", function(snap) {
          self._SETTER(`${self.base_local}/UPDATE_${_base}`, snap);
        });
        referencia.on("child_removed", function(snap) {
          self._REMOVE(`${self.base_local}/REMOVE_${_base}`, snap);
        });
      }
    },
    _SETTER(commit, snap, type) {
      let chave = snap.key;
      let dados = snap.val();
      let response;
      if (type == "objeto") {
        response = dados;
      } else {
        response = {
          dados: dados,
          chave: chave
        };
      }
      this.$store.commit(commit, response);
    },
    _REMOVE(commit, snap) {
      let chave = snap.key;
      this.$store.commit(commit, chave);
    },
    _ONHANDLE() {
      //prioridades
      let self = this;
      servFazendas
        .child(self.fazendaID)
        .once("value")
        .then(function(snapshot) {
          let rest = snapshot.val();
          self.$store.commit("fazenda/SET_MINHAFAZENDA", rest);
        });

      this._CREATE_HANDLES_FIREBASE(servColors, "COLORS");
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
      this._CREATE_HANDLES_FIREBASE(servAlertaCategorias, "ALERTA_CATEGORIA");

      //filtrados por idFazenda CONTEM "TRUE"
      this._CREATE_HANDLES_FIREBASE(Estoque, "ESTOQUE", true);
      this._CREATE_HANDLES_FIREBASE(EstoqueLog, "ESTOQUELOG", true);
      this._CREATE_HANDLES_FIREBASE(servAplicacoes, "APLICACAO", true);
      this._CREATE_HANDLES_FIREBASE(servColaboradores, "COLABORADOR", true);
      this._CREATE_HANDLES_FIREBASE(servTarefas, "TAREFA", true);
      this._CREATE_HANDLES_FIREBASE(servTalhoes, "TALHAO", true);
      this._CREATE_HANDLES_FIREBASE(servProducoes, "PRODUCAO", true);
      this._CREATE_HANDLES_FIREBASE(servVeiculos, "VEICULO", true);
      this._CREATE_HANDLES_FIREBASE(servAlertas, "ALERTA", true);
      this._CREATE_HANDLES_FIREBASE(servPontoGPS, "PONTOGPS", true); // ponto digital
      this._CREATE_HANDLES_FIREBASE(servRotaGPS, "ROTAGPS", true); // rota diaria do colaborador
      this._CREATE_HANDLES_FIREBASE(servReviewArmadilhas, "REVIEW_TRAPS", true);
      setTimeout(() => {
        this.$store.commit("fazenda/UPDATE_PAYLOAD", true);
      }, 10000);
    },
    _OFFHANDLE() {
      //let max = this.handles.length;
      this.handles.forEach(function(item) {
        item.off();
      });
    },
    connectALL() {
      if ("geolocation" in navigator) {
        //nada
      } else {
        window.alert(
          "Seu navegador nao suporta GEOLOCALIZACAO, atualize-o para poder desfrutar da plataforma perfeitamente."
        );
        return false;
      }
      this.fazendaID = this.$store.getters["auth/GET_FAZENDA"];
      if (this.fazendaID !== null) {
        this._ONHANDLE();
        this.carregaPragas();
        this.carregaDoencas();
        this.carregaTraps();
        this.carregaSetores();
        this.carregaFornecedores();
        this.carregarCultivar();
        this.carregaDaninhas();
      } else {
        setTimeout(() => {
          this.connectALL();
        }, 2000);
      }
    },
    carregaDaninhas() {
      const self = this;
      let chave = this.fazendaID;
      let refMPragas = servMonitorDaninhas
        .orderByChild("idFazenda")
        .equalTo(`${chave}`);
      refMPragas.on("child_added", snaps => {
        self._SETTER("fazenda/SET_DANINHA", snaps);
      });
      refMPragas.on("child_changed", snaps => {
        self._SETTER("fazenda/UPDATE_DANINHA", snaps);
      });
      refMPragas.on("child_removed", snaps => {
        self._REMOVE("fazenda/REMOVE_DANINHA", snaps);
      });
    },
    carregaPragas() {
      const self = this;
      let chave = this.fazendaID;
      let referencia = servMonitorPragas
        .orderByChild("idFazenda")
        .equalTo(`${chave}`);

      referencia.on("child_added", snaps => {
        self._SETTER("fazenda/SET_PRAGA", snaps);
      });
      referencia.on("child_changed", snaps => {
        self._SETTER("fazenda/UPDATE_PRAGA", snaps);
      });
      referencia.on("child_removed", snaps => {
        self._REMOVE("fazenda/REMOVE_PRAGA", snaps);
      });
    },
    carregaDoencas() {
      const self = this;
      let chave = this.fazendaID;
      let refMDoencas = servMonitorDoencas
        .orderByChild("idFazenda")
        .equalTo(`${chave}`);
      refMDoencas.on("child_added", snaps => {
        let chave = snaps.key;
        let dados = snaps.val();
        let response = {
          dados: dados,
          chave: chave
        };
        self.$store.commit("fazenda/SET_DOENCA", response);
      });
      refMDoencas.on("child_changed", snaps => {
        let chave = snaps.key;
        let dados = snaps.val();
        let response = {
          dados: dados,
          chave: chave
        };
        self.$store.commit("fazenda/UPDATE_DOENCA", response);
      });
      refMDoencas.on("child_removed", snaps => {
        let chave = snaps.key;
        self.$store.commit("fazenda/REMOVE_DOENCA", chave);
      });
    },
    carregaTraps() {
      const self = this;
      let chave = this.fazendaID;
      let refMTraps = servMonitorArmadilhas
        .orderByChild("idFazenda")
        .equalTo(`${chave}`);
      refMTraps.on("child_added", snaps => {
        let chave = snaps.key;
        let dados = snaps.val();
        let response = {
          dados: dados,
          chave: chave
        };
        self.$store.commit("fazenda/SET_TRAP", response);
      });
      refMTraps.on("child_changed", snaps => {
        let chave = snaps.key;
        let dados = snaps.val();
        let response = {
          dados: dados,
          chave: chave
        };
        self.$store.commit("fazenda/UPDATE_TRAP", response);
      });
      refMTraps.on("child_removed", snaps => {
        let chave = snaps.key;
        self.$store.commit("fazenda/REMOVE_TRAP", chave);
      });
    },
    carregaSetores() {
      const self = this;
      let chave = this.fazendaID;
      let refSetores = servSetores
        .orderByChild("idFazenda")
        .equalTo(`${chave}`);
      refSetores.on("child_added", snaps => {
        let chave = snaps.key;
        let dados = snaps.val();
        let response = {
          dados: dados,
          chave: chave
        };
        self.$store.commit("fazenda/SET_SETOR", response);
      });
      refSetores.on("child_changed", snaps => {
        let chave = snaps.key;
        let dados = snaps.val();
        let response = {
          dados: dados,
          chave: chave
        };
        self.$store.commit("fazenda/UPDATE_SETOR", response);
      });
      refSetores.on("child_removed", snaps => {
        let chave = snaps.key;
        self.$store.commit("fazenda/REMOVE_SETOR", chave);
      });
    },
    carregaFornecedores() {
      const self = this;
      let chave = this.fazendaID;
      let refFornecedores = servFornecedores
        .orderByChild("idFazenda")
        .equalTo(`${chave}`);
      refFornecedores.on("child_added", snaps => {
        let chave = snaps.key;
        let dados = snaps.val();
        let response = {
          dados: dados,
          chave: chave
        };
        self.$store.commit("fazenda/SET_FORNECEDOR", response);
      });
      refFornecedores.on("child_changed", snaps => {
        let chave = snaps.key;
        let dados = snaps.val();
        let response = {
          dados: dados,
          chave: chave
        };
        self.$store.commit("fazenda/UPDATE_FORNECEDOR", response);
      });
      refFornecedores.on("child_removed", snaps => {
        let chave = snaps.key;
        self.$store.commit("fazenda/REMOVE_FORNECEDOR", chave);
      });
    },
    carregarCultivar() {
      const self = this;
      let refCultivar = servCultivar;
      refCultivar.on("child_added", snaps => {
        let chave = snaps.key;
        let dados = snaps.val();
        let response = {
          dados: dados,
          chave: chave
        };
        self.$store.commit("fazenda/SET_CULTIVAR", response);
      });
      refCultivar.on("child_changed", snaps => {
        let chave = snaps.key;
        let dados = snaps.val();
        let response = {
          dados: dados,
          chave: chave
        };
        self.$store.commit("fazenda/UPDATE_CULTIVAR", response);
      });
      refCultivar.on("child_removed", snaps => {
        let chave = snaps.key;
        self.$store.commit("fazenda/REMOVE_CULTIVAR", chave);
      });
    }
  }
};
</script>
<style lang="scss">
@import "@/style/dash/gerencia/global.scss";
</style>
<style lang="scss" scoped>
@import "@/style/dash/gerencia/global.scss";
//dash
.fadeDash-enter-active,
.fadeDash-leave-active {
  opacity: 1;
  transition: opacity 0.2s;
}
.fadeDash-enter, .fadeDash-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
//payload
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
.dashboard {
  display: grid;
  grid-template-areas: "header" "menu" "content";
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  height: 100vh;
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
