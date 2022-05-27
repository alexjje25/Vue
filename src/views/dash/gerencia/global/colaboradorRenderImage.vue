<template>
  <div>
    <img v-if="imagemSRC !== null || imagemSRC == ''" :src="imagemSRC" />
    <img v-else src="../../../../assets/icons/perfil-guest.png" />
  </div>
</template>

<script>
import { Storage } from "@/database.js";
import tratamentoError from "@/service/ErrorGlobal.js";
export default {
  props: { imagemURL: { default: "none", type: String } },
  data() {
    return {
      imagemSRC: null,
      error: null
    };
  },
  mounted() {
    this.requestImagem();
  },
  methods: {
    handleReturn(resposta) {
      if (resposta == false) {
        //nada a se preocupar
      } else {
        window.alert(resposta);
      }
    },
    requestImagem() {
      var self = this;
      Storage.child(self.imagemURL)
        .getDownloadURL()
        .then(function(url) {
          self.imagemSRC = url;
        })
        .catch(function(error) {
          tratamentoError(error, self.handleReturn);
          self.imagemSRC = null;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100px;
  height: 100px;
  background-color: rgba(210, 210, 210, 1);
  border-radius: 100px;
  margin: 10px;
  border: 1px solid rgba(215, 215, 215, 1);
}
</style>
