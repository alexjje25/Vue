<template>
  <div>
    {{ renderME }}
  </div>
</template>

<script>
import { sendError, send } from "@/service/sentry";
export default {
  props: {
    chave: {
      default: undefined,
      type: String,
      required: true
    },
    referencia: {
      default: "",
      type: String,
      required: true
    }
  },
  computed: {
    renderME() {
      let refGetter = this.referencia.toUpperCase();

      if (
        refGetter !== "PRAGAS" &&
        refGetter !== "DANINHAS" &&
        refGetter !== "DOENCAS" &&
        refGetter !== "ARMADILHAS"
      ) {
        sendError(`ERRO DE REFERENCIA `);
        return "ERRO DE REFERENCIA";
      } else {
        //send("OK!");
        window.console.log("OK!");
        let acoragem = "fazenda/GET_GLOBAL_" + refGetter + "_ESPECIE";

        let resultado = this.$store.getters[acoragem].find(item => {
          if (item.chave == this.chave) {
            return true;
          } else {
            return false;
          }
        });

        if (!resultado || resultado.lenght < 1 || resultado == undefined) {
          return "NÃO ENCONTRADO";
        } else {
          return resultado.dados.name;
        }
      }
    }
  }
};
</script>
