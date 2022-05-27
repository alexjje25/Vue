<template>
  <div>
    <h1>Nova Praga</h1>
    <vIncludes />
  </div>
</template>

<script>
import {
  servPragasEspecieTipo,
  servPragasEspecie,
  servPragasEstagio,
  Storage
} from "@/database";
import vIncludes from "./includes/index";

export default {
  components: {
    vIncludes
  },
  data() {
    return {
      //TIPO > ESṔECIE > ESTAGIO
      remaster: {
        selectedTipo: "selecione",
        selectedEspecie: "selecione",
        includeTipo: {
          chave: null,
          name: null
        },
        includeEspecie: {
          chave: null,
          tipo: "selecione",
          name: null,
          imagemURL: null
        },
        includeEstagio: {
          chave: null,
          cor: "selecione",
          especie: "selecione",
          name: ""
        }
      },
      selectedTipo: null,
      selectedEspecie: null,
      rota: "tipo",
      mounted: false,
      includeTipo: {
        chave: null,
        name: null
      },
      includeEspecie: {
        chave: null,
        tipo: "selecione",
        name: null,
        imagemURL: null
      },
      includeEstagio: {
        chave: null,
        cor: "selecione",
        especie: "selecione",
        name: null
      },
      progress: {
        total: null,
        quantidade: null
      },
      toUpload: {
        file: null,
        uploaded: false
      }
    };
  },
  computed: {
    buscaCor() {
      return this.$store.getters["admin/GET_COLORS"].filter(
        item => item.chave == this.includeEstagio.cor
      );
    },
    cores() {
      return this.$store.getters["admin/GET_COLORS"].filter(item => {
        if (item.dados.type == "marks") {
          return true;
        } else {
          return false;
        }
      });
    },
    GET_PRAGAS_TIPO() {
      return this.$store.getters["admin/GET_PRAGAS_TIPO"];
    },
    GET_PRAGAS_ESPECIE() {
      return this.$store.getters["admin/GET_PRAGAS_ESPECIE"].filter(
        item => item.dados.tipo == this.remaster.selectedTipo
      );
    },
    GET_PRAGAS_ESTAGIO() {
      //usado ?
      return this.$store.getters["admin/GET_PRAGAS_ESTAGIO"];
    },
    pragasTipo() {
      return this.$store.getters["admin/GET_PRAGAS_TIPO"];
    },
    pragasEspecie() {
      return this.$store.getters["admin/GET_PRAGAS_ESPECIE"];
    },
    pragasEstagio() {
      return this.$store.getters["admin/GET_PRAGAS_ESTAGIO"];
    }
  },
  methods: {
    selectCandidateImage(event) {
      window.console.log(event);
      this.toUpload.file = event.target.files[0];
    },
    sendPrioritaryImage(referenciaURL, chave) {
      servPragasEspecie.child(chave).update({ imagemURL: referenciaURL });
    },
    uploadImagem() {
      const self = this;
      const chave = this.includeEspecie.chave;
      Storage.child(`pragas/${chave}/praga.jpg`)
        .put(self.toUpload.file)
        .then(function(snapshot) {
          self.sendPrioritaryImage(snapshot.downloadURL, chave);
        });
    },
    handle(err) {
      if (err) {
        window.console.log(err);
        window.alert("ERROR!");
      } else {
        window.alert("ENVIADO COM SUCESSO");
      }
    },
    createTipo() {
      this.includeTipo.chave = servPragasEspecieTipo.push().key;
      servPragasEspecieTipo
        .child(this.includeTipo.chave)
        .update(this.includeTipo, this.handle);
    },
    createEspecie() {
      if (this.includeEspecie.tipo == "selecione") return false;
      //if (this.toUpload.uploaded) this.toUpload.uploaded = false;

      this.includeEspecie.chave = servPragasEspecie.push().key; //get key push
      //this.uploadImagem();
      servPragasEspecie
        .child(this.includeEspecie.chave)
        .update(this.includeEspecie, this.handle);
    },
    createEstagio() {
      if (this.includeEstagio.especie == "selecione") return false;
      if (this.includeEstagio.cor == "selecione") return false;
      this.includeEstagio.chave = servPragasEstagio.push().key;
      servPragasEstagio
        .child(this.includeEstagio.chave)
        .update(this.includeEstagio, this.handle);
    },
    mount(value) {
      this.mounted = true;
      this.rota = value;
    },
    menu() {
      this.mounted = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/dash/formInclude.scss";
.layout {
  display: grid;
  grid-template-columns: 2fr 1.5fr;
}

.line {
  padding: 4px;
  margin: 5px;
}
.inlineColor {
  display: inline-block;
  padding: 6px;
  color: white;
  width: 120px;
  text-align: center;
}
.inlineItem {
  display: grid;
  & > div {
    text-align: center;
    align-content: center;
    align-items: center;
    align-self: center;
  }
  &.g2 {
    grid-template-columns: 1fr 1fr;
  }
}
.scope {
  padding: 10px;
}
</style>
