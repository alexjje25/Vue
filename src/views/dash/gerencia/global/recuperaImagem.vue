<template>
  <div>
    {{ error }}
    <img :src="imagemSRC" />
  </div>
</template>

<script>
import { Storage } from "@/database.js";

export default {
  props: ["imagem"],
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
    requestImagem() {
      var chainLink = this.imagem;
      var self = this;
      Storage.child(chainLink)
        .getDownloadURL()
        .then(function(url) {
          self.imagemSRC = url;
        })
        .catch(function(error) {
          window.console.log(error);
          self.error = error;
        });
    }
  }
};
</script>
